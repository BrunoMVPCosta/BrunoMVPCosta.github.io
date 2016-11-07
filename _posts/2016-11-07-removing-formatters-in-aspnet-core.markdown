---
layout: post
title:  "Removing formatters in ASP.NET Core"
date:   2016-11-07 18:30:00
tags: [aspnetcore]
categories: aspnetcore
permalink: /aspnetcore/2016/11/03/removing-formatters-in-aspnet-core.html
description: removing formatters asp.net core
comments: true
share: true
---

Before ASP.NET Core release, if you needed to remove a formatter, we would have to use all of this code:

```
services.Configure<MvcOptions>(options =>
        options.OutputFormatters.RemoveAll(formatter =>
        formatter.Instance is XmlDataContractSerializerOutputFormatter));
```

Fortunately, people behind this project are concerned about making our life better, so they try to change it to have one easier and more friendly way to remove it.

```
services.Configure<MvcOptions>(option =>
{
    option.OutputFormatters.RemoveType<XmlDataContractSerializerOutputFormatter>();
});
```

To do this, please include the following dependency in your 'project.json' to be able to reference  `using Microsoft.AspNet.Mvc.Formatters; `

```
"Microsoft.AspNet.Mvc.Formatters.Xml": "6.0.0-rc1-final"
```

You can see the discussion on github about this change in [here](https://github.com/aspnet/Mvc/issues/2945).
