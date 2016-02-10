---
layout: post
title: "Consumer-driven contracts with Pact"
date: "2016-02-09"
---

Quando usamos microservices, obtemos uma maior flexibilidade de deployment, contudo a nossa capacidade de lançar serviços individualmente é limitada pelas dependências entre os serviços. Para microservices funcionar com o mínimo atrito para a organização, precisamos de fazer continuous delivery, podendo assim lançar as aplicações de forma independente. Isto é importante por vários motivos, entre os quais:

- Confiar mais nas releases, como estamos a reduzir o tamanho da release, o risco associado diminui. Como os scripts de deployment têm de ser testados várias vezes durante o processo antes do código entrar em produção, a maior parte dos erros no processo e no script são detectados antes do código entrar em produção.
- Como confiamos mais nas releases, podemos lançar mais vezes e mais cedo, isto irá permitir um time to market mais rápido e obter o feedback do utilizador mais cedo para melhorar o produto o mais cedo possível
- Ao melhorar o nosso produto mais cedo, com base no feedback do utilizador, atingimos uma melhor satisfação do cliente.

Por exemplo, vamos imaginar que temos um Catalog Service e um Inventory Service. Neste exemplo, o Inventory Service funciona como provider e envia ao Catalog Service o nível de stock de um determinado produto.
![My helpful screenshot]({{ site.url }}/images/cdc1.jpg)

Mais tarde, surge um novo requisito no serviço de encomendas para obter qual a localização do stock. A alteração exige mudar a API do Inventory Service para adicionar a localização do warehouse.

![My helpful screenshot]({{ site.url }}/images/cdc2.jpg)

<i>
TODO: Rever isto
Without the necessary precautions, there are a lot of ways these interactions can be broken by changes made in the different services. The most common one would be that the Provider would change its interface in such a way that the Consumer can no longer interact with it.

Examples:

Change of the endpoint URL (e.g. GET /stockLevels renamed to GET /stockLevel)
Change in the expected parameters (e.g. GET /stockLevels expecting a new mandatory “category” field)
Change in the response payload (returns an array, instead of having an array wrapped in an object)</i>

Esta alteração, dependendo da forma como estamos a expor e a consumir os dados, não deverá quebrar o Catalog Service. Mas como em qualquer alteração, precisamos de garantir que o nosso sistema não é quebrado por essa alteração e, na realidade, depois de atualizar o Catalog Service passamos a conhecer o nosso sistema da seguinte forma.

![My helpful screenshot]({{ site.url }}/images/cdc3.jpg)

As técnicas normalmente utilizadas para garantir que não estamos a partir o sistema são,

- Coupled releases, ou seja, lançar para produção OMS, Catalog Service e Inventory Service em simultâneo, sempre que existe alteração da API de Inventory, por causa das suas dependências, assim evitamos que existam breaking changes não identificadas.
- End-to-end testing. Provavelmente a segunda técnica a aplicar pela maior parte das organizações e uma das técnicas que QA prefere, porque lhes dá uma maior garantia que irá funcionar no futuro. Apesar de parecer uma solução bastante sensata, transforma-se rapidamente num pesadelo. Os custos de desenvolvimento e de manutençaõ destes testes são enormes. Os testes podem falhar por vários motivos, o que faz com que as equipas começem a duvidar dos testes e, quando a equipa começa a duvidar dos testes, normalmente os testes deixam de ser mantidos e deixamos rapidamente de ter testes.

Visto que ambas as soluções nos dificultam as releases independentes e aumentam o custo de alterações, precisamos de uma forma mais flexível para evoluir a API do Inventory e garantir que uma nova versão da API inventory não é prejudicial para uma versão não alterada do OMS ou Catalog Service. E aqui entra o padrão Consumer-Driven Contracts

<h3>Consumer-Driven contracts</h3>

Consumer-Driven contracts is a pattern that allows the consumer to define an expected behavior from a service (provider). Then, both the consumer and the provider agrees on the contract. Finally, the provider can get that specification and validate that it does indeed meet the expectations of his consumers.

That said, it's easy to see the advantages of such approach in a microservices architecture, but how should we do the validation and how does the consumer defines an expected behavior... this is where Pact come in!

<h3>What is pact? </h3>

Pact is a library that enables Consumer-Driven Contract testing.

Pact will be present both on the consumer and on the provider, because we are replacing a synchronous communication with an mediator named Pact. The mediator will receive from the consumer the HTTP request it will make to the provider and the HTTP response it is expecting from it. As a good mediator that pact are, it will use these expectations and create a mock service to simulate the provider service. It will record all the interactions between the consumer and the mock service to a json file that, will be used by the provider. So, the consumer sends the information to the mediator that he will need from the provider. Later, the mediator will give the json file to the provider showing him the expectations from the consumer. To validate that the provider does actually provide the response the consumer is expecting, the mediator will replay the interactions with the consumer he recorded.

<h3>Overview</h3>

Using the same example as before, we can remove the need of the Inventory Service and replace it using Pact.

So, the first step should be communication between you and someone of the provider service so you can both agree on a contract based on your needs and what the provider is already exposing or not.

The second step is to define consumer expectations on the Catalog Service. It may feel weird for you to create the code you are expecting from the provider and not use the provider instead, but doing so has some advantages that will talk in a bit.

![Step 2 - Define consumer expectations]({{ site.url }}/images/cdc4.jpg)

After that, you're done and now it's responsibility of the provider to ensure that these contracts are met and never broken.
So, the third step is validate if the contracts between the consumer and the provider is valid.

![Step 3 - Verify expectations on provider]({{ site.url }}/images/cdc5.jpg)

<h3>Isn't it the same as end-to-end testing?</h3>

Short answer, no.

<b>We don't need all the system to be running</b>

With this we are validating that there is no API breaking changes and the dependencies between the services are working as it should, without needing multiple services running at the same time. Starting multiple services and managing dependencies while deployment is a non-trivial thing to do and takes time. We can verify the same thing without all of this overhead.

<b>Change is inevitable.</b>

Our experience tell us that change is inevitable and all the APIs will change. If we don't know who is using our service and how is it using, we don't feel good about change, because we will be afraid of break something. With pact, the provider will know how others services are using his API and he will be more comfortable to change things, because the interactions between consumers and providers will always be validated.

<i>Change is inevitable. Change is constant.</i> - Benjamin Disraeli

<b>Fast feedback is everything</b>

The execution of the tests is faster. And we all know our lifes are a loop of edit-compile-test... <a href="http://www.joelonsoftware.com/articles/fog0000000023.html">as Joel Spolsky said</a>: <i>...the faster the Edit-Compile-Test loop, the more productive you will be...</i>

<h3>In Conclusion</h3>

Consumer-driven contract is amazing to improve your organization productivity. Being able to verify contracts at build time without the need of start up a bunch of services and their dependencies, saves you money, time and helps you to stay sane. With the confidence it gives you on the deployment process, your organization will release more often, sooner and improve your users experience sooner.

Remember... fast feedback is everything. You are just enabling it. For you, for your organization and your business.
