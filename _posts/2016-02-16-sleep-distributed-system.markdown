---
layout: post
title: "Prepare your distributed system, so you don't lose money, when it fails"
date: "2016-02-16"
tags: [design-patterns]
permalink: /2016/02/16/prepare-your-distributed-system.html
description: If you are running a larger software system, sooner or later, it will fail. So prepare your system for failure, while you're still making money.
comments: true
share: true
---

The first thing you need to learn when you release a distributed system into production is this: it'll eventually fail! You don't believe me, huh? Well, I don't blame you.

We usually forget that we are trusting on the network, the number one reason for serious system failure, because we don't know or we don't remember [the eight fallacies of distributed computing][1]:

- The network is reliable
- Latency is zero
- Bandwidth is infinite
- The network is secure
- Topology doesn't change
- There is one administrator
- Transport cost is zero
- The network is homogeneous

Lets say that you are running an e-commerce business, it's the most important Friday of the year. Yep, that's it, Black Friday. You have 20.000 users on your website. Your system allows the user to add to cart the items and it will validate the stock later on the checkout process. You have 300 users on the checkout process and you know that a slow experience on the checkout process can have a huge impact on the conversion rate. Your Inventory Service is having 30.000 requests per minute and it is slowing down your checkout process. You have an average order value of $400, so you can lose up to $120.000 if you lose the users that are at the checkout process.

How can you prevent from losing the users if the Inventory Service goes down? <b>Timeouts</b> and <b>Circuit break</b> are useful techniques in this situation. Just remember that is not just a technical decision and you should ask the business what should happens in this situation. Should we prevent users from ordering an item without validating the item's availability or should we allow them and check the availability later in the process?  

Repeat with me, <b>it-will-fail</b>. And Murphy will make sure it happens in the most inappropriate moment. The best thing is to prepare yourself for when it fails.

[1]:https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing
