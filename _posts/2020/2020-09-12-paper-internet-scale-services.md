---
title: Opinion on the paper On Designing and Deploying Internet-Scale Services
layout: post
date: '2020-09-12 12:00:00 +0000'
tags: scale
permalink: "paper-internet-scale-services"
description: When thinking of internet scale services we normally think of Google, Facebook and some other companies, but rarely about Microsoft.
comments: true
share: true
---

When thinking of internet scale services we normally think of Google, Facebook and some other companies, but rarely about Microsoft.  This [paper](https://www.usenix.org/legacy/events/lisa07/tech/full_papers/hamilton/hamilton.pdf) from 2007 (!!!) from James Hamilton is a tremendous source of information on how to run internet scale services.

This is 13 years old and content like “Expect failures”, “Keep things simple” and “automate everything”. It also points out that application design and development are normally the origin of issues in production or are best solved there, so separating development, testing and operation isn’t the most effective approach in the services world.

It talks about testing and release cycles. The challenge of having a fully trusted production like environment, that quality assurance in a large-scale system is a data-mining and visualisation problem and not a testing problem and so on. Talks about the investment on engineering that needs to be made to avoid problems in the future.

One of the topics I have some mixed feelings about is the `Single-server deployment`, mainly because I don’t totally understand what the author is suggesting here. I’m confused if he is recommending having all the components (500+ programs) in a single machine, or if he is recommending to have the "feature route” (customer functionality) on a single machine, or just a single program and emulated dependencies. Translating to microservices approach, having multiple services and frontend or just the service and datasources and emulate all the other dependencies. I would love to hear from the author, not sure if the https://twitter.com/jrhatmvdirona is actually the author or not.

Trying not to extend this too much, but the paper is really worth reading. Go and read it, you won't regret it.