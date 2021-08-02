---
layout: post
title:  "Not every if--then-else statement, needs the	 else"
date:   2015-04-03 00:00:42
categories: Opinions
tags: [clean-code]
permalink: /code/clean/2015/04/03/stop-doing-if-return-else.html
description: Stop doing if return else statements. It's bad for maintainability and it is error prone.
comments: true
share: true
---
As a software engineer, I have the opportunity to review a lot of code from other engineers. One thing that makes me happy is that the number of people doing a defensive code is growing, but there is still room for improvement.

One thing that amuses me is the quantity of people doing the following piece of code.

{% highlight csharp %}

public double Divide(int number, int divisor)
{
	if(divisor == 0)
	{
		throw new ArgumentOutOfRangeException("divisor"
		, "Divide by zero is not allowed");
	}
	else
	{
		return number / divisor;
	}
}

{% endhighlight %}

First the good things. The developer is doing a defensive code, validating the input arguments and throwing an informative exception.

<b>But, do we really need the else statement here? </b>


The if-then-else statement exists to perform some action based on a condition. If the condition is true, the statements following the "then" are executed, otherwise it will continue to the "else" block and after this brach we'll have an "interception" point on the flow. However, one of our branches is an exit point, we don't want an interception happening after the "if-then-else" statement, we want the code to exit the method if the first condition is true.

Resuming, no, we don't need the else there. <b>Not every if-then-else statement, needs the else,</b> changing our code to remove the unnecessary else the code will looks like this.

{% highlight csharp %}

public double Divide(int number, int divisor)
{
	if(divisor == 0)
	{
		throw new ArgumentOutOfRangeException("divisor"
		, "Divide by zero is not allowed");
	}

	return number / divisor;
}

{% endhighlight %}

<b>But, its just a detail...</b>

At first, this seems to be just a little thing that doesn't really matter, but what if we add more and more logic into the code without refactoring it? Have you thought about the maintainability problem that we might have in the future?

<b>Where is this coming from?</b>

I have a theory about why developers are still doing this. When learning how to program, we normally are taught the if-then-else statement before any learning on defensive code. As we practice our skills, we are doing more and more if-then-else statements until it becomes intrinsic in our brain and we do it without thinking. The problem is that we need to think to write a clean code.

<b>How can we stop doing it?</b>

Everytime you have a code review, or change some code from another engineer, please check for code like this and alert your colleague for this. He will be grateful.

<b>UPDATE:</b> You can also write a Analyzer using Roslyn API to validate this, check out [here][1] how to do it.

[1]:http://thrownewexception.com/code/clean/2016/02/23/using-roslyn-validate-guard-clauses.html
