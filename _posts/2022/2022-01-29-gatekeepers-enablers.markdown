---
layout: post
title: "From Gatekeepers to Enablers"
date: "2022-01-29 11:00:00"
tags: [company-tale]
permalink: gatekeepers-enablers
description: From Gatekeepers to Enablers. The story of a fictional company’s SRE journey towards engineering autonomy, more productivity, better compliance and, happiness!
comments: true
share: true
---

Linkedin [described five stages of SRE](https://www.usenix.org/system/files/login/articles/login_winter18_02_purgason.pdf) , the second one being the **gatekeeper**.

> As we grow past the first generation of firefighters, we achieve a basic level of operational integrity. The active operational fires are put out, and we have an increasing amount of time available for forward-looking tasks. So where do we go from here? The natural instinct is a protective one. We just spent years digging ourselves out of a major operational hole and the last thing we want to do is immediately fall back into it. Usually, this translates into a set of behaviors that amount to building a wall around “our” production with a few locked doors and keeping the keys with SRE. **That way, “those” pesky developers will have to go through “us” before “their” change can impact “our” prod.**

Gatekeeper is a stage where some companies stay for ages. It is the natural tendency to protect the production system instead of enabling the speed of innovation.

To tell you the difference between Gatekeepers and Enablers, I’ll tell you a story about Enzo and his journey on a fictional company. Chances are, this company is not very different from the company you are working for or have worked for in your career. Let’s call it thrownewexception.com.

Enzo was asked to be CTO of the mentioned startup company.  During the company’s initial years, a team called Ops was created and was responsible for maintaining servers, deploying applications, managing databases, and performance-related topics. The model “[you build it, ops runs it](https://www.stevesmith.tech/blog/you-build-it-ops-runs-it/)” was adopted to operate the production environment. Every time a team created a new application, a ticket was opened for the ops team to provision a new set of servers for the application, and a binary was shared with the ops team to install it. It was a small company with around 20 engineers, and Enzo was happy with this solution. Still, the business was growing, and new features had been requested by customers, and investment had been made to grow the company and, therefore, the technology department. The CTO was facing new challenges. How to cope with this growth and improve his team’s efficiency?

### A new archicture

After some external advice and internal discussions, the CTO decided to go with a microservice architecture to enable the teams to work autonomously in small components. As microservices started to be adopted, the model “[you build it, ops runs it](https://www.stevesmith.tech/blog/you-build-it-ops-runs-it/)” started to put a lot of stress on the Ops team. The engineers were creating a new application every week, requesting new servers, databases, etc., to that team. The tickets appeared at the end of the project, putting even more pressure on the ops team, as they were delaying the delivery of critical projects. To improve it, Ops started a more formal release management process, where teams needed to submit the change request to a group to be analyzed and approved **at the beginning** of each project. This way, the ops team was able to plan the provisioning of those needs, plan the service's deployment, and coordinate the release with the business.

Some conflicts between ops and the software engineers started coming up. The process was slow, and it was demotivating the software engineers. But it was helping ops to be more predictable, so all in all, management was happy. 

However, two new patterns slowly started to arise, leading to new challenges. The number of incidents started to increase, which increased the scrutiny of the Ops team during the formal release management process and consequently increased the impact on the projects. Alongside this, most of the time, when the on-call ops engineer was called on, they would lack the internal understanding of the system, and they would need to escalate the issue to the delivery team. 

### You build it you...

Enzo and their team discussed this issue and started to find some explanations for this. Although the “[you build it, ops runs it](https://www.stevesmith.tech/blog/you-build-it-ops-runs-it/)” lowered the on-call costs, it had some drawbacks. The incentives for the engineers to be concerned about reliability were minimal since they were not the ones on-call. And the speed of innovation made it almost impossible to share knowledge with the ops teams to properly support the system. The conclusion was clear: the more time they were on this model, the worse it would become until ops would be nothing more than a reverse proxy for the delivery team. To incentivize the delivery team to be concerned about reliability, the CTO decided that the delivery team should be exposed to the production issues more often. A new model was adopted, the “[you build it, you run it](https://www.stevesmith.tech/blog/you-build-it-you-run-it/)” model, where teams would be responsible for their services in production.

By making this change, the CTO expected to improve the relationship between the ops and delivery teams, reducing the MTTR and making the delivery team aware of the operational issues. But, looking into the data, the MTTR metric didn’t decrease as they predicted, it was relatively the same, sometimes even higher. 

Samuel, one of the VPs of technology, wanted to understand why this was happening, and he was eager for the next incident. Unfortunately, incidents were quite frequent, so he didn’t have to wait much. The last time Samuel joined a war room was when one of their biggest clients complained directly to the CEO because of a bug affecting them. It was not normal for him to be directly involved, so people became really concerned about the incident. “Samuel is here; the impact must be tremendous.” Samuel’s experience helped him understand that people were surprised to see him there, so he told them that he was there to better understand the process and help if needed.

The symptom was that no comms were being sent to the customers. It was important to fix, and the impact would be small if mitigated within the next half hour. The engineer on-call was updating the service desk member about the status so they could communicate with the business. After just 15 minutes, she understood that all the apps had terminated, and she wanted to restart them to mitigate the issue. 

“That would be quick, right?” - asked Samuel. Mary was confused with the question but replied. “We are not sure; we must escalate it to the team responsible for the platform. They will need to restart the application on every server.” 

Samuel was intrigued. So the person on-call was not able to mitigate the issue. They needed to escalate the problem to a different team to mitigate it. He then tried to understand if it was common for the on-call engineer to escalate the issue to another team. 
  
“Almost always. We don’t have access to restart the app, or to scale out or up, or to move traffic, for example. Most of the time, we need the ops team to help us mitigate the problem”.

The delivery team were expected to run the service in production, but the company didn’t set them up for success. More often than not, they lacked the tools to mitigate the issues and they would need to escalate the issue to the ops department for mitigation. So, the escalation process was still there, just reversed now.

### You can't make an omelet without breaking a few eggs

After sharing his experience with Enzo and his peers, they concluded more change was needed to achieve this goal. Not only should the delivery team be responsible for the application end-to-end, but it should also have the right tools for the job. The ops team started to provide some tools for the delivery team to help them deploy and monitor their apps. 

That started to reduce the MTTR because they could follow one of the [generic mitigations strategies](https://www.oreilly.com/content/generic-mitigations/), like rollback, and mitigate the issue when it was related to a code change. But the delivery team was still stressed about the time it took them to deliver a new app and the lack of tools to scale up or scale out without ops approval. 

The ops team was accountable for the reliability of the production system and the costs. In their minds, they could not guarantee production stability and low costs with this kind of freedom for the delivery team. Even with these changes, the gatekeeping culture still existed.

Enzo decided then to challenge the ops team on how to move away from gatekeeping to an enabling mentality. Instead of thinking about “how can I control this?”, they should start thinking about “how can I enable the teams to do their job safely?”.  

This brings us to today’s reality of this fictional company. A place where the delivery team - now called engineering - has access to the tools they need in a self-service manner, provided by domain experts. A place where the team owns the entire component’s lifecycle and has the autonomy to improve their day-to-day and their product. A place where autonomy meets productivity by removing cognitive load by providing a great engineering experience for those teams that don’t need to go deep in the stack. A place where engineers work to have quality and reliability from the start. A place where technology fully enables business agility and compliance needs.
