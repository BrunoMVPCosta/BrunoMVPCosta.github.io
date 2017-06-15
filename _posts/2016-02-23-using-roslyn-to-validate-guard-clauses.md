---
layout: post
title:  "Using Roslyn to validate guard clauses"
date:   2016-02-23 15:03
categories: coding
tags: [clean-code]
permalink: /code/clean/2016/02/23/using-roslyn-validate-guard-clauses.html
description: An example using Roslyn to stop doing if return else statements. It's bad for maintainability and it is error prone.
comments: true
share: true
---

In one of my previous posts, I talked about [Not every if--then-else statement, needs the	 else]({% post_url 2015-04-03-stop-doing-if-return-else %}).. Today, we'll explore the creation of an Analyzer using Roslyn API, that will analyze the source code looking for any Guard clause with If-Return-Else or If-Throw-Else.

<b>Prerequisites</b>

 - [Visual Studio 2015][2]
 - [.NET Compiler Platform SDK][3]

<b>Introduction</b>

A Guard Clause is a piece of code, generally, on the top of the method that does some precondition validations.
As example of bad use of Guard Clause we have the If-Throw-Else:

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

And we have the If-Return-Else:

{% highlight csharp %}

private void Bar(string[] args)
{
    if(args.Count == 0)
    {
        return;
    }
    else
    {
        Console.WriteLine(args.Count);
    }
}

{% endhighlight %}


<b>Writing the Analyzer</b>

1 - Create a New Project on the Visual studio using Visual C#

In Visual Studio, choose File -> New -> Project -> Visual C# -> Extensibility
There, you will see Analyzer with Code Fix (NuGet + VSIX). Choose it and name your project "IfElseValidationAnalyzer" and click OK.

![New Project Windows]({{ site.url }}/assets/img/posts/2016.02.23/new_project.png)

2 - Rename title, message format and description

In Solution Explorer look up for Resources.resx and double-click it to open. You will find three resources there, AnalyzerDescription, AnalyzerMessageFormat and AnalyzerTitle. To keep things simple, we will change the value of all the three to <i>Guard clause don't need the else statement</i>.

![Resources]({{ site.url }}/assets/img/posts/2016.02.23/resources.png)

3 - Change the current Analyzer to do what we want

When we use the template it creates code to analyze that all the types name are uppercase. We need to change a few things for our use case.

 3.1 - Find for the const Category change "Naming" to CSharp.Readability". It's not mandatory, but we want to make things more readable.

{% highlight csharp %}
private const string Category = "CSharp.Readability";
{% endhighlight %}

3.2 - Find the Initialize method and remove all the code from there and remove the private method AnalyzeSymbol as well.

3.3 - Create a Action<SyntaxNodeAnalysisContext> named IfStatementAction and assign the method named HandleIfStatement to it. You will need to generate the method, because it doesn't exist yet.

{% highlight csharp %}

private static readonly Action<SyntaxNodeAnalysisContext> IfStatementAction = HandleIfStatement;

private static void HandleIfStatement(SyntaxNodeAnalysisContext obj)
{
    throw new NotImplementedException();
}

{% endhighlight %}

3.4 - You want to be notified every time a if statement is changed, for that we need to regist the syntax node action on the Initialize method with the SyntaxKind of IfStatement.

{% highlight csharp %}
context.RegisterSyntaxNodeAction(IfStatementAction, SyntaxKind.IfStatement);
{% endhighlight %}

You are almost there, now we get notified when a if statement is changed and we are calling the HandleIfStatement.
So, the final step is to change the HandleIfStatement method to do what we need.

3.5 - Implement HandleIfStatement

{% highlight csharp %}
private static void HandleIfStatement(SyntaxNodeAnalysisContext context)
{
    var ifStatement = context.Node as IfStatementSyntax;

    if (ifStatement == null) return;
    if (ifStatement.Else == null) return;

    var childNodes = ifStatement.Statement.ChildNodes();
    if (childNodes.Count() != 1) return;

    var node = childNodes.First();
    if (node is ReturnStatementSyntax || node is ThrowStatementSyntax)
    {
        var diagnostic = Diagnostic.Create(Rule, ifStatement.GetLocation());

        context.ReportDiagnostic(diagnostic);
    }
}

{% endhighlight %}

3.6 - Comment the code of CodeFixProvider.

We don't have a way to purpose a fix for this kind of mistakes yet. For now, we will just comment the follow section of code to be able to test.

{% highlight csharp %}

//context.RegisterCodeFix(
//    CodeAction.Create(
//      title: title,
//      createChangedSolution: c => MakeUppercaseAsync(context.Document, declaration, c),
//      equivalenceKey: title),
//  diagnostic);

{% endhighlight %}

4 - Run it

So, now hit the F5 button to launch a sandbox version of visual studio with the extension you've just created. Create a new Console Application and try to write a If-Return-Else and check if you get a warning saying <i>Guard clause don't need the else statement</i>.

You should see something like this:

![Output]({{ site.url }}/assets/img/posts/2016.02.23/result.png)

<b>More</b>

Stay tuned. The [next blog]({% post_url 2016-03-11-using-roslyn-codefixprovider-guard-clauses %}) post we will change the CodeFixProvider to give the developer a suggestion on how to solve this mistake.

You can find my version of the Analyzer on [Github][4].

[2]:https://www.visualstudio.com/downloads
[3]:https://visualstudiogallery.msdn.microsoft.com/2ddb7240-5249-4c8c-969e-5d05823bcb89
[4]:https://github.com/BrunoMVPCosta/IfElseValidationAnalyzer
