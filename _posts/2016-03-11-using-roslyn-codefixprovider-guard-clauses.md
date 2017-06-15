---
layout: post
title:  "Using Roslyn to validate guard clauses - CodeFixProvider"
date:   2016-03-11 00:53
categories: coding
tags: [clean-code, mongodb]
permalink: /code/clean/2016/02/23/using-roslyn-codefixprovider-guard-clauses.html
description: An example using Roslyn to stop doing if return else statements. It's bad for maintainability and it is error prone.
comments: true
share: true
---

In my last post, I showed you [how to build an Analyzer to detect inadequate guard clauses]({% post_url 2016-02-23-using-roslyn-to-validate-guard-clauses %}). But we can do more with Roslyn API and I'll show you today how we can give a suggestion to our developers on how can they fix it propertly.

<b>What have we done so far?<b>

First, be sure you've followed the steps in the previous post. In that article, I showed what the prerequisites are to build diagnostic and fixes, the definition of a guard clause, some examples of bad usage of it and, finally, how to write an Analyzer to detect some of those bad usages.

The final result was the following:

{% highlight csharp %}

using System;
using System.Collections.Immutable;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace IfElseValidationAnalyzer
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class IfElseValidationAnalyzerAnalyzer : DiagnosticAnalyzer
    {
        public const string DiagnosticId = "IfElseValidationAnalyzer";

        // You can change these strings in the Resources.resx file. If you do not want your analyzer to be localize-able, you can use regular strings for Title and MessageFormat.
        // See https://github.com/dotnet/roslyn/blob/master/docs/analyzers/Localizing%20Analyzers.md for more on localization
        private static readonly LocalizableString Title = new LocalizableResourceString(nameof(Resources.AnalyzerTitle), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString MessageFormat = new LocalizableResourceString(nameof(Resources.AnalyzerMessageFormat), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString Description = new LocalizableResourceString(nameof(Resources.AnalyzerDescription), Resources.ResourceManager, typeof(Resources));
        private const string Category = "CSharp.Readability";

        private static DiagnosticDescriptor Rule = new DiagnosticDescriptor(DiagnosticId, Title, MessageFormat, Category, DiagnosticSeverity.Warning, isEnabledByDefault: true, description: Description);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics { get { return ImmutableArray.Create(Rule); } }

        private static readonly Action<SyntaxNodeAnalysisContext> IfStatementAction = HandleIfStatement;


        public override void Initialize(AnalysisContext context)
        {
            context.RegisterSyntaxNodeAction(IfStatementAction, SyntaxKind.IfStatement);
        }

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
    }
}

{% endhighlight %}

Today, we will explore how to create a CodeFixProvider to help us help our colleagues. While it is good to find opportunities to improve our code, it is not less important to show to the user what he can do about it. CodeFixProvider is a way to give our users feedback on how they can improve something. Although this example is focused on code style and maintainability, we can think of other possible usages for it. For instance, if you're using services and you are giving an SDK to other developers to use your API, you can also give them the warnings and fixes of what you may find important to share. Or if you are using an internal framework to build your software, you can also create the warnings and fixes of bad usage of it.

<b>Writing the CodeFixProvider</b>

If you have followed the previous article, the Visual Studio template creates two classes, the <i>IfElseValidationAnalyzerAnalyzer</i> that you can find inside the file DiagnosticAnalyzer.cs, and the class <i>IfElseValidationAnalyzerCodeFixProvider</i> that it's inside the file CodeFixProvider.cs.
Today, we will work on the IfElseValidationAnalyzerCodeFixProvider. This class is responsable for provide an action to the issues detected by our analyzer.

To start, notice this class inherits from the abstract class CodeFixProvider, which gives us good information on how it works. For now, lets concentrate on two things:

 - FixableDiagnosticIds - A list of diagnostic IDs that this provider can provide fixes for.
 - RegisterCodeFixesAsync - Register one or more actions for the specified context (the issues we are trying to give fixes to)

<b>1 - FixableDiagnosticIds</b>

As I said, this is the property we use to tell Roslyn in which diagnostics this code fix will be able to help. Visual Studio already made its magic and we don't need to worry about it on our sample, but I thought it worth mentioning, if you want to explore Roslyn more.

{% highlight csharp %}
public sealed override ImmutableArray<string> FixableDiagnosticIds
{
    get { return ImmutableArray.Create(IfElseValidationAnalyzerAnalyzer.DiagnosticId); }
}
{% endhighlight %}

<b>2 - RegisterCodeFixesAsync</b>

Here, we will register the actions with the possible solutions to present to our user. As you can see, when we create the solution based on the Visual Studio template, we already have some code to fix a default problem presented by the Roslyn's team, named <i>MakeUppercaseAsync</i>. However, this is not what we want, so we can start by removing the method MakeUppercaseAsync.

After that, we need to change the token we are looking for. The generated code is looking for a type declaration and we need to get an instance of IfStatementSyntax.

{% highlight csharp %}
// Find the if statement identified by the diagnostic.
var ifStatement = root.FindToken(diagnosticSpan.Start).Parent.AncestorsAndSelf().OfType<IfStatementSyntax>().First();
{% endhighlight %}

Now that we have the token we were looking for, we need to register an action to invoke a fix. We will also create a method named <i>RemoveElseInGuardValidation</i>.

{% highlight csharp %}

// Register a code action that will invoke the fix.
context.RegisterCodeFix(
    CodeAction.Create(
        title: title,
        createChangedDocument: c => RemoveElseInGuardValidation(context.Document, ifStatement, c),
        equivalenceKey: title),
    diagnostic);

{% endhighlight %}

The method RemoveElseInGuardValidation will contain the fix we want to show to our users when the analyzer detects a warning with the DiagnosticId equals to <i>IfElseValidationAnalyzer</i>.

<b>3 - RemoveElseInGuardValidation</b>

We've got the node IfStatementSyntax, but in reality, we need to change all the block where the IfStatementSyntax is, because we will remove the code inside the else clause and move it to the block above in the tree.

Summing up, what we will need to do is

 - Get the Parent of the IfStatementSyntax;
 - Get the code inside the instance ElseClauseSyntax;
 - Create a new IfStatementSyntax instance with an empty ElseClauseSyntax;
 - Create a new BlockSyntax instance with the new instance created in the previous step, add the statements that were inside the ElseClauseSyntax and finally, add the statements that were inside the original BlockSyntax instance we want to change;
 - Get the Root of the document and replace the original block with the block created in the previous step;
 - Return the document with the new syntax tree;

Remember that syntax trees are immutable in Roslyn.

{% highlight csharp %}

private async Task<Document> RemoveElseInGuardValidation(Document document, IfStatementSyntax ifStatement, CancellationToken cancellationToken)
{
    //We need to get the parent because we need to replace the entire block
    var blockSyntax = ifStatement.Parent as BlockSyntax;
    var blockElseStatement = ifStatement.Else.Statement as BlockSyntax;

    //Build the new if statement without the else condition
    var newIfStatement = SyntaxFactory.IfStatement(
        condition: ifStatement.Condition,
        statement: ifStatement.Statement);

    //Create an aux block
    var auxBlock = blockSyntax.RemoveNode(ifStatement, SyntaxRemoveOptions.KeepNoTrivia);

    //Create the new block with the if and the statements that were inside of the else block
    var newBlockSyntax = SyntaxFactory.Block()
        .AddStatements(newIfStatement)
        .AddStatements(blockElseStatement.Statements.ToArray())
        .AddStatements(auxBlock.Statements.ToArray());

    //Replace it in the document
    var root = await document.GetSyntaxRootAsync(cancellationToken).ConfigureAwait(false);

    var newRoot = root.ReplaceNode(blockSyntax, newBlockSyntax)
        .WithAdditionalAnnotations(Formatter.Annotation);

    return document.WithSyntaxRoot(newRoot);
}

{% endhighlight %}

If you run it to launch a Visual Studio sandbox and you create a sample with code that will fire a warning of this type, you should be able to see something like the following image.

![Result CodeFixProvider]({{ site.url }}/assets/img/posts/2016.03.11/result_code_fix_provider.png)
