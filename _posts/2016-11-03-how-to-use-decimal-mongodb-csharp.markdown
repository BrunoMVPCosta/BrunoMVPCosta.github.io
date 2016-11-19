---
layout: post
title:  "How to use decimal with mongodb and .NET C#"
date:   2016-11-03 00:00:00
tags: [clean-code]
categories: coding
permalink: /coding/2016/11/03/how-to-use-decimal-mongodb-csharp.html
description: Using decimal with MongoDB and .net csharp
comments: true
share: true
---

When working with money we need to be concerned with the accuracy of the data as well as the calculations we do.
Imagine that you have an ecommerce website with a feature that allows  users to have a credit balance on their accounts. One user has 86.25€ and had just spend 86.24€. We expect him to be left with 0.01. But is he?

It will depend on the data type we are using to store the money. To give you an example, I have prepared a small piece of code.

```csharp
using System;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            double a = 86.25;
            double c = 86.24;
            Console.WriteLine(a - c);
        }
    }
}

```

The output of this code will be:

```
0.0100000000000051
```

Surprised? I hope not.

So, to deal with money in .NET we should use decimal or apply the [money pattern](http://martinfowler.com/eaaCatalog/money.html). 

So far so good. 

I have recently started a personal project and I chose to give MongoDB a try. In this project I will work with money and naturally I started using `decimal` for it. Unfortunally, when I started implementing the data access layer I realized MongoDB didn't support `decimal`. It does support `double`, however it will not have the expected behaviour as we saw previous in this post.

To solve this, first, I changed all my code to use `Int64` instead of `decimal`. I thought it would work just fine and it did work, but the quality of the code wasn't the best... and I was doing a modification on my domain based on my data layer. Definitely, not a good thing to do.

So, I decided to create a custom serializer for the fields of type `decimal`.

```
[BsonSerializer(typeof(MongoDbDecimalFieldSerializer))]
public class MongoDbDecimalFieldSerializer : SerializerBase<decimal>
{
    const decimal DECIMAL_PLACE = 10000m;

    public override decimal Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
    {
        var dbData = context.Reader.ReadInt64();
        return Math.Round((decimal)dbData / DECIMAL_PLACE, 4);
    }

    public override void Serialize(BsonSerializationContext context, BsonSerializationArgs args, decimal value)
    {
        var realValue = (decimal)value;
        context.Writer.WriteInt64(Convert.ToInt32(realValue * DECIMAL_PLACE));
    }
}
``` 

To register it I have just done:

```
BsonSerializer.RegisterSerializer(typeof(decimal), new MongoDbDecimalFieldSerializer());
```

And with this, I have a good code, easy to maintain and the accuracy I need.