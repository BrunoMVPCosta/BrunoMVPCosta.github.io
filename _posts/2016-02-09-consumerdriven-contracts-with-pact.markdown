---
layout: post
title: "Consumer-driven contracts with Pact"
date: "2016-02-09"
tags: [consumer-driven-design, pact, continuous delivery]
permalink: /2016/02/09/consumerdriven-contracts-with-pact.html
description: Learn how Consumer-driven contracts with Pact can help you with dependencies between services when using microservices architecture.
comments: true
share: true
---

Microservices are here to stay. When using a microservices architecture, theory says, we get a more flexible system. It's easier to deploy, because instead of releasing the entire system, as in a monolithic application, we can release small parts of the system independently. We get hardware flexibility, because we may need different hardware specifications for different parts of the system. We get programming flexibility, because we can have a service using C# with WebAPI and another one using Node.js. The flexibility is wonderful and it all sounds great however, our ability to release the services independently is more often than not restricted by the dependencies between services.
To evolve to microservices architecture smoothly, we need continuous delivery. This is very important for several reasons, for example:

- <b>Reliable releases</b>, considering that we are reducing the size of what we are releasing, the risk associated with the release is lower than in a monolithic application. Since the deployment's scripts need to run and be tested several times before the code goes into production, most of the issues with the process of deployment are detected in this phase. In the end, we will get an automated process that we can trust.
- With reliable releases, we can <b>release more often</b>. The sooner we go to the market the sooner we get customer feedback to improve our product.
- <b>Improving our product sooner</b>, based on customer's feedback, will increase customer satisfaction.

And... all of that will give us more money. We hope...

But, lets talk about microservices and dependencies again. As example, imagine we're creating an ecommerce using microservices architecture and we have the Catalog Service and the Inventory Service. They communicate using REST.

![My helpful screenshot]({{ site.url }}/images/cdc1.jpg)

Later, we got a new requirement from the order management system, saying that they need to have the warehouse location of the stock. We will need to change our API as follows.

![My helpful screenshot]({{ site.url }}/images/cdc2.jpg)

Now, we have two consumers depending on the Inventory Service. If we are not wise, there are lots of ways for the Catalog Service or Order Management System (OMS) to be broken by changes made on the Inventory Service. For example, we may need to replace the warehouse property and return an object instead of string.

There are techniques to prevent all these situations:

- <b>Coupled releases</b>: We can release OMS, Catalog Service and Inventory Service simultaneously. This way we are sure we will not break the interactions between those services, because they'll all be updated at the same time. But with the system growth and the number of dependencies growing too, it is easy to understand it will be very hard to maintain.
- <b>End-to-end testing</b>: I believe this is one of most used solutions for this problem and mainly because it is such a QA-friendly solution. Even if it sounds as a decent idea, it quickly becomes a nightmare. The development and maintainability costs associated with these tests are huge. To make things worse, with all of the dependencies, a test can fail for a lot of different reasons, which leads to mistrust of the team in the tests. When the team distrusts the tests, usually, it doesn't take long for the team to stop maintaining and doing tests.

Considering the pros and cons of the techniques above, we need a better, more flexible solution to evolve the Inventory Service API and make sure that a change on the API is not harmful to an unmodified version of the OMS or Catalog Service. And here comes the Customer-Driven Contracts pattern.

<h3>Consumer-Driven Contracts</h3>

Consumer-Driven Contracts is a pattern that allows the consumer to define an expected behavior of a service (provider). Then, both the consumer and the provider agree on the contract. Finally, the provider can get that specification and validate that it does indeed meet the expectations of his consumers.

That said, it's easy to see the advantages of such approach in a microservices architecture, but how should we do the validation and how does the consumer define an expected behavior? This is where Pact comes in!

<h3>What is pact? </h3>

Pact is a library that enables Consumer-Driven Contract testing.

Pact will be present both on the consumer and on the provider, because we are replacing a communication with a mediator named Pact. The mediator will receive from the consumer the HTTP request it would make to the provider and the HTTP response it is expecting from it. As a good mediator that pact is, it will use these expectations and create a mock service to simulate the provider service. It will record all the interactions between the consumer and the mock service to a json file that will be used by the provider. So, the consumer sends the information to the mediator that he will need from the provider. Later, the mediator will give the json file to the provider showing him the consumer's expectations. To validate that the provider does actually provide the response the consumer is expecting, the mediator will replay the interactions with the consumer he recorded.

<h3>Overview</h3>

Using the previous example, we can remove the need of the Inventory Service and replace it using Pact.

So, the first step should be communication between us and someone responsible for the provider service so we can both agree on a contract based on our needs and what the provider is already exposing or not.

The second step is to define consumer expectations on the Catalog Service. It may feel weird to create the code we are expecting from the provider and not use the provider instead, but doing so has some advantages that we will check later in this article.

![Step 2 - Define consumer expectations]({{ site.url }}/images/cdc4.jpg)

After that, we did all we had to do. It's the responsibility of the provider to ensure that these contracts are met and never broken.
So, the third step is to validate that the contracts between the consumer and the provider are valid.

![Step 3 - Verify expectations on provider]({{ site.url }}/images/cdc5.jpg)

<h3>Isn't it the same as end-to-end testing?</h3>

Short answer, no.

<b>We don't need all the system to be running</b>

With this solution, we are validating that there is no API breaking changes and the dependencies between the services are working as they should, without the need of multiple services running at the same time. Starting multiple services and managing dependencies on the deployment it's a non-trivial thing to do and takes time. We can verify the same thing without all of this overhead.

<b>Change is inevitable</b>

Our experience tells us that change is inevitable and all the APIs will change. If we don't know who is using our service and how, we don't feel good about change, because we will be afraid of breaking something. With pact, the provider will know how the other services are using his API and he will be more comfortable to change things, because the interactions between consumers and providers will always be validated.

<i>Change is inevitable. Change is constant.</i> - Benjamin Disraeli

<b>Fast feedback is everything</b>

The execution of the tests is faster than in a traditional end-to-end testing. And we all know our lives are a loop of edit-compile-test... <a href="http://www.joelonsoftware.com/articles/fog0000000023.html">as Joel Spolsky said</a>: <i>...the faster the Edit-Compile-Test loop, the more productive you will be...</i>

<h3>In Conclusion</h3>

Consumer-Driven Contract pattern is amazing to improve our organization productivity. Being able to verify contracts at build time without the need of starting up a bunch of services and their dependencies, saves us money, time and helps us to stay sane. With the confidence it gives us on the deployment process, our organization will release more often, sooner and improve our users' experience sooner.

Remember... fast feedback is everything. We are just enabling it. For us, for our organization and our business.
