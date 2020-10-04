---
title: Continuous integration - If you don’t know what you’re doing, don’t do it
layout: post
date: '2020-10-04 12:00:00 +0000'
tags: [CI]
categories: CI/CD
permalink: "/cicd/2020/10/04/continuous-integration-if-dont-know-dont-do.html"
description: By [Ricardo Felgueiras](https://twitter.com/RicFelgueiras)

Continuous integration is a software practice adopted widely across the company, but sometimes it is adopted and implemented without truly understand the advantanges of it and how to prevent common pitfalls. This article goes though some of those pitfalls so we can prevent doing it next time you adopt Continuous Integration
comments: true
share: true
---

_Continuous Integration is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly._ by Martin Fowler [here](https://martinfowler.com/articles/continuousIntegration.html).

We all agree with the definition of Continuous Integration from the well-known Martin Fowler. Also, we all agree with the main advantages: 1) reduce time to integrate code; 2) increase software development speed.

So, if we are all able to identify the advantages of this specific practice, why shouldn’t we implement it if we don’t know what we’re doing?

Next, I will explain why you should resist the urge to implement continuous integration before you understand what you’re doing. The key takeaway is that you should first understand how this works, understand the problems you’ll find, and then invest your time implementing it. Below you can find some of the major challenges of implementing continuous integration and a few typical problems faced by all the teams who try to implement it.

## Pipelines take too long on each source code integration

The main goal of a continuous integration pipeline is to have constant (and fast) feedback about the code you add to the source code mainline. Therefore, there is nothing more frustrating than a pipeline taking too long to run the validations.
Once you set up a CI pipeline, it’s important to constantly monitor the time to run. A rule of thumb you can adopt is to set an objective of 10 minutes to run.
This way, we avoid 1) frustrated engineers; 2) features development speed slow down and 3) a decrease in the number of merges to your source code mainline.
This last problem is particularly important to have in mind because if there are fewer merges to the mainline, there will be more problems during the merges with bigger and bigger batch sizes. This specifically could lead to outages and live problems.

## Lack of testing strategy

Let me share with you one of the greatest articles about testing strategies in a microservice architecture (by Martin Fowler).
Once you start defining your testing strategy, you should answer the following questions:
 - Which tests will be implemented (unit tests, component tests, integration tests, etc)?
 - In your continuous integration pipeline, when will each type of test be running?
 - Which tests are running over real data (and other dependent services)?
 - Which tests are running over stubbed data and mocked calls to dependent services?

While answering the questions above, you should have in mind that every single decision will affect the time your pipeline will take to run and therefore impact the development team’s process and speed.

## Incorrect test implementation (related to the previous topic)

What I mean by “incorrect implementation” is to have tests implemented not considering the testing strategy in place.
Let’s say that one of your guidelines in your testing strategy is after the source code compilation and run unit tests, the next test to be run should (only) use database stubs. Once there is a test that’s violating this rule, you could observe an increase in this rule violation, and this way, you’ll end up with an increase of the time to run the continuous integration pipeline.
Code review is one of the most powerful tools you could use to assure the testing strategy and the corresponding guidelines are being used. By reviewing the code between the team members and more senior elements, you could take part in numerous advantages: knowledge sharing and strengthening guidelines.

## Integration environments unstable and lack of automation

The main goal of testing is to find problems in your code before they hit the production environment. Therefore, you can’t afford to be constantly distracted with false positives in your pipeline. These false positives can be caused by your integration environments instability (software and/or hardware problems).
This way, you should treat this environment as a production environment. Availability, stability, and assuring that just the most recent versions of each component are installed in this environment is a set of guidelines I advise you to follow since the beginning.

To conclude, one important aspect is to keep these environments equal to production. Meaning, these environments should be a clone of the production environment. You must be able to mimic each use case as you were in production. Only this way you can effectively test every single scenario and this way have confidence in the new code added to the source code mainline.

Technical debt, team members' frustration and demotivation are problems that could emerge when facing the problems described above.

That said, my advice to you is to follow these steps:

 - Focus on the testing strategy. Which tests and when each type of tests should be implemented. Here you’ll find a great presentation to guide you;
 - Analyze all the existing tools in the market and choose the ones that better adapt to your current needs - mainly costs ($$);
 - Focus on automating the creation of your Integration environment, assuring that there isn’t any manual work in this specific step;
 - (Team) communication;
 - Guidelines and code reviews are one of the best communication tools you could use in a software development team.

Before you start implementing continuous integration, it isn’t mandatory to have all the answers to the mentioned challenges. Mainly, because these challenges need a lot of time and effort to implement.
The most important is to start small. Start with a proof of concept and then try to implement it in a feature of your product and/or in a specific component. And then, continue to iterate over what you build and continuously improve your continuous integration pipeline.

You should have in mind that every single decision will affect the development process speed, team members and their motivation. And in fact, this should be your main focus.

--------

# About the author

[Ricardo Felgueiras](https://twitter.com/RicFelgueiras) is an engineering manager with more than 12 years of experience in developing (mostly) web applications. He has worked in several areas, particularly in education, banking and e-commerce area.

In the last years, he has been focused mainly on managing teams by acting as a mentor and a coach.

The recipe for a great team is composed of 3 different ingredients with equal parts:
- Motivated people - core ingredient to success;
- Get things done - push things live as in it’s better live than perfect;
- Great technical knowledge - pretty much self-explanatory.