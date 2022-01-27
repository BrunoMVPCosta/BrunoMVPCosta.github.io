---
title: SRE, SRE everywhere
layout: post
date: '2021-08-01 12:00:00 +0000'
tags: SRE
permalink: "sre-sre-everywhere"
description: Companies are adopting SRE, the challenge is understanding what part of SRE they are doing - or if it is SRE at all for the purists
comments: true
share: true
---
Every once in a while, a new concept appears in the software industry. People start talking about it, making presentations, writing books and even consulting. Everyone seems to be doing the new fancy thing. But even if everyone is talking about it and doing it, are they talking about the same and doing the same?

Today, I will be writing about SRE. It is not a new topic, but it is one that is starting to be adopted more and more across our industry. SRE stands for **Site Reliability Engineering** and aims to improve reliability of software and it was originally created at Google. Ever since Google started to share it externally, other companies started to adopt the concept and doing SRE.

The challenge is understanding what part of SRE they are doing - or if it is SRE at all for the purists. Let’s explore some of the examples of teams that people associate with SRE.

## Infrastructure automation

Some companies started doing SRE by calling their team responsible for infrastructure automation provision and so on, SRE. Some might argue it is not SRE, but the reality is that predictable and deterministic infrastructure is essential for the reliability of any system. And it might be considered toil, because the alternative would probably be tickets to fix stuff manually.

## CI/CD and tooling for software engineers

One thing that I noticed as well is that some companies are using the term SRE in the teams that are working on CI/CD pipelines, frameworks or other tooling for the software engineering teams. Again, some might argue that it is not SRE, but I can easily accept that a reliable and good CI/CD and tooling for the engineering teams increases reliability of the software. There are so many use cases we can add to the deployment pipeline to increase reliability and reduce the MTTR that I can easily accept it as a form of SRE (Very important note: rollback is not just putting back the previous binary).

## Team responsible for keeping the service running reliably

That is probably the most accepted definition of SRE. The team might be accountable or it might have a shared responsibility with the product development team. The goal is to make sure a set of principles and practices are in place across the organization that enable reliable and scalable software to run in production. It will handle incident management, identify risks and motivations, leverage SLI/SLO to continuously measure the quality of the service, policies and playbooks to handle urgent issues with a strategy and so much more.

## Support team

It would be just a matter of time to see traditional approaches to software development saying they “do” SRE. This is the case where we take a traditional approach, like having a central team responsible and accountable for the service availability, and trying to apply some of the SRE practices (note that I didn’t say principles). This team will define SLI/SLO for the services they are managing, install a process for incident management and problem management and take advantage of automation to reduce toil. The set of practices are there, but the principles are not always there, so it will be very hard to argue whether or not this “is” SRE.

## Monitoring team

Without the right tooling in place to understand and measure the production system, it will be impossible to have a reliable system. The need is so great that it is easy to assume it as part of SRE. That is why some companies end up doing SRE this way.

## Conclusion

As any new concept, some boundaries might be blurred and it is hard to define a pure form of implementing it. The culture, skills and management still will greatly define what type of SRE will be running in a given company. It is very important to know that SRE has many meanings and flourishes differently in each company, only by accepting it can we ask the questions to understand what type of SRE a company is selling you. It can even be a mix of different types.
