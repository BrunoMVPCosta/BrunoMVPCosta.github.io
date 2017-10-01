---
layout: post
title:  "Undo changes in git"
date:   2017-10-01 23:00:42
tags: [git]
categories: git
permalink: /git/2017/08/23/undo-changes-git.html
description:  Undoing changes is a little scary, right? I hope this article helps you to keep calm when you need to undo stuff.
comments: true
share: true
---

In this article I will talk about the ways we have available to undo things when using git. I will abord `git checkout`, `git reset`, `git clean` and `git revert`.

I have an existing repository with two files, a `README` and a file named `add_new_file` as you can see.

```
→ ls
README		add_new_file
```

The current context of `add_new_file` is the follow:

```
This is the new file I want to add.
This is a new change
```

And the changes I have using `git log add_new_file` are:

```
→ git log add_new_file
commit e03d1e99a9210a1fb6d26ceb1fce93f0e795f4a6
Author: Bruno Costa <yyy@yyy.com>
Date:   Sun Oct 1 11:42:10 2017 +0100

    New change to the add_new_file

commit c5c7ae474a94480530059017066ac6197d0a043b
Author: Bruno Costa <yyy@yyy.com>
Date:   Tue Aug 22 23:35:39 2017 +0100

    Add new file
```

I will add some text to the file `add_new_file` and I will show you how can I undo that change without having to delete the change on my own.

git checkout

Let start with `git checkout`. If you are using git, my guess is that you use this command often to checkout a branch to work. This is where we use the `git checkout <branch>` option, where <branch> is the branch we want to work on. `git checkout` has some other options, but we want to focus on the one that allow us to undo changes we may have and not those that switch branches.

I will now add some text to the file `add_new_file`, something like `Yet another change" and after I do that, I will check the `git status` and I will have the file `add_new_file` as `modified`.

```
→ git status
On branch new_branch
Your branch is up-to-date with 'origin/new_branch'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   add_new_file

no changes added to commit (use "git add" and/or "git commit -a")
```

Now, if I wanted to revert those changes without manual deleting each change I did on the file, I could use the command `git checkout <path>`. Just type `git checkout add_new_file` and check the status using `git status` and you should see that those changes are now gone.

```
→ git status
On branch new_branch
Your branch is up-to-date with 'origin/new_branch'.
nothing to commit, working directory clean
```

You probably also noticed that you were not asked to confirm the checkout. Please remember, this is a very dangerous command. As far as I know, there is no way to recover those changes using git.

git reset

git clean

git revert


Add the new file

Brunos-MBP:client_repo BrunoCosta$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	add_new_file

  http://eagain.net/articles/git-for-computer-scientists/
  ler: http://tom.preston-werner.com/2009/05/19/the-git-parable.html
  ler: https://adaptechsolutions.net/git-pro-tips/
