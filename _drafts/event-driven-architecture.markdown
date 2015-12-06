---
layout: post
title: "Event driven architecture"
date: "2015-07-06"
---

When I first hear about event driven architecture (EDA) was while I starting to apply SOA to my current company was read Udi Dahan's blog and investigating NServiceBus. I was fascinated about how does it simplify the scalability of the system. I do know that it adds some complexity but the things we win with it are much more important than the things we lose.

This pattern promotes the production, detection and consumption of events as the way the system interacts with the world to notify or react to any change.

As an example, I will start with an ecommerce application. The application uses a relational database to save the products and to show it to the users. With the success of the application people are starting complaining about the search... We know a relational database is not the best fit for the search funcionality. The first thing we think is... lets save it to Solr/Elasticsearch and to our relational database with two phase commit. And it will eventually work. But can we make it simple? Yes.

Goods
 - loose coupling system (time and physical)
