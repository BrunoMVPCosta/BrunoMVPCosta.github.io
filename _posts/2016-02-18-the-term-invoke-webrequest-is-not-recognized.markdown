---
layout: post
title: "The term ‘Invoke-WebRequest’ is not recognized"
date: "2016-02-18"
permalink: /2016-02-18-the-term-invoke-webrequest-is-not-recognized.html
description: Fixing "The term ‘Invoke-WebRequest’ is not recognized" error
comments: true
share: true
---

I've decided to check out the code from [Orchard2][1] to learn more about it and the new ASP.NET Core 1.0. Following the <i>Getting Started</i> points from their github's page the third bullet point is to run the <i>build.cmd</i>. I did and the output was the following

![The term ‘Invoke-WebRequest’ is not recognized]({{ site.url }}/assets/img/posts/2016.02.18/invoke_webrequest_error.jpg)

So, I did what every engineer does when he has a problem that doesn't know how to solve... I googled it. It didn't help much, so I went to the [technet website][2] to see that the cmdlet has been introduced in Windows PowerShell 3.0.

![CmdLet other versions]({{ site.url }}/assets/img/posts/2016.02.18/invoke_webrequest_version.jpg)

Next, I wondered what powershell version I had on the computer.

![Powershell version]({{ site.url }}/assets/img/posts/2016.02.18/ps_version.jpg)

Ops, problem found. Now, to solve it, I went to [http://social.technet.microsoft.com/wiki/contents/articles/21016.how-to-install-windows-powershell-4-0.aspx][3] and installed the PowerShell 4.0.

![Finally, it worked.]({{ site.url }}/assets/img/posts/2016.02.18/it_worked_sucess_kid.jpg)

[1]:https://github.com/OrchardCMS/Orchard2
[2]:http://technet.microsoft.com/en-us/library/hh849901.aspx
[3]:http://social.technet.microsoft.com/wiki/contents/articles/21016.how-to-install-windows-powershell-4-0.aspx
