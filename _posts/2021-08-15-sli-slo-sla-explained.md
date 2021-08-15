---
title: SLI, SLO, SLA explained in a way your kids will understand... maybe
layout: post
date: '2021-08-15 12:00:00 +0000'
categories: Opinions
tags: SRE
permalink: "/sre/2021/08/01/sli-slo-sla-explained.html"
description: Imagine you are in a remote meeting using terms like SLI, SLO, or SLA, and your kid asks you what it means? How would you explain it to them? Or maybe you need to explain it to your boss or a colleague. In this article, I will try to put SLI, SLO, and SLA in a way even your kids would understand... maybe.
comments: true
share: true
---

If you are reading this, you probably have been in a situation where you had to explain these terms to people that are not familiar with them. But if you haven't, I can guarantee that you will. These terms are really simple but at the same time very easy to misunderstand.

I will try to explain the terms first and then use an analogy with football - the real one - that you can use or even help you to find a better analogy to use with the people you interact with.

SLI stands for Service Level Indicator. You can think of it as an indicator you probably already have in the business, a KPI. It is just that, an indicator of something that matters.

SLO stands for Service Level Objective. What is the target of good service you want to provide to your customers? That's the goal. It is what you define as good service.

SLA stands for Service Level Agreement. This one is where you agree with someone that your service will not be below that level, or else there will be consequences or penalties. You'll probably need to provide some kind of restitution for being below that target.

You don't want to define an aggressive target for the SLA, you want something that you feel comfortable enough achieving 100% of the time to reduce the number of restitutions you need to give to the customer. The SLA is normally defined by the business, together with legal. SLOs can provide some support to both business and legal to understand how hard, or easy, it will be to achieve the target.

## Football to the rescue

I will use the football I'm used to, I don't know the rules for American football. In European football, there are some stats you can see for each player, one is the `complete pass %`. This indicator is the number of passes that the player did successfully, meaning it went from him to another colleague. As an example, you can see [Cristiano Ronaldo's stats](https://www.infogol.net/en/player/cristiano-ronaldo/1892).

### The SLI: Complete pass %

This is the indicator. The number of passes that Ronaldo did successfully to a colleague.

### The SLO

Now, imagine you are Ronaldo's coach and during your one-on-one, with Ronaldo, you both define the objectives for the next season. During the conversation, you went to the SLI `complete pass %` as a way to define the performance level Ronaldo should give to the team. You both align that the `complete pass %` should be above 85% for 90% of the matches in the last 30 days. Notice that you define a target, 90% of the times above 85%, and a time window, last 30 days.

### The SLA

Let's imagine that, when Juventus negotiated the contract with Ronaldo, they both agreed that if `complete pass %` was below 85% for 80% of the matches during the previous month, Ronaldo would have to pay a fine of 100.000€.

---

I hope with this you find a good analogy to explain SLI, SLO, and SLAs and if you want to provide feedback and suggest a change on the calculations I did, please leave a comment or DM me on Twitter! Thanks!