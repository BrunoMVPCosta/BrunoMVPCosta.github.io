---
title: Undo changes in git
layout: post
date: '2017-10-07 23:00:42 +0000'
tags:
- git
categories: git
permalink: "/git/2017/08/23/undo-changes-git.html"
description: Undoing changes is a little scary, right? I hope this article helps you
  to keep calm when you need to undo stuff.
comments: true
share: true
---

In this article I will talk about the ways we have available to undo things when using git. I will tackle `git checkout`, `git reset`, `git clean` and `git revert`.

To better explain it, I would like to go to the basics about the three main sections we have on git, which are `Working directory`,  `Index` and `HEAD`.

![Git Sections]({{ site.url }}/assets/img/posts/2017.09.05/git_sections.jpg)

* Git directory is where all the information regarding metadata and object is stored. 
* The Index , also known as `staging area`, is a file with information about what will go into your next commit.
* The working directory consist of files that you are currently working on.

These concepts are important, because the ways I will talk to undo changes might change different sections depending on how we use it. Any change on the working directory is considered a dangerous change, because if we delete something from the working tree that was not commited or added to stage yet, it will be lost. 

For this article, I already have a repository with two files, a `README` and a file named `add_new_file` and I try to show how my repository is with the following image.

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_image.jpg)

```
→ ls
README		add_new_file
```

The current context of `add_new_file` is the following:

```
This is the new file I want to add.
This is a new change
```

And the changes we  can see using `git log add_new_file`, which are:

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

I will add some text to the file `add_new_file` and I will show you how you can undo that change without having to delete the change yourself.

### git checkout


Lets start with `git checkout`. If you are using git, my guess is that you use this command often to checkout a branch to work on. This is where we use the `git checkout <branch>` option, where <branch> is the branch we want to work on. `git checkout` has some other options, but we want to focus on the one that allows us to undo changes we may have and not the option that switch branches.

I will now add some text to the file `add_new_file`, something like "Yet another change". 

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_change_add_new_file_wd.jpg)

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

Now, if I wanted to revert those changes without manually deleting each change I did on the file, I could use the command `git checkout <path>`. The `git checkout <path>` does not switch branches, instead it is used to restore modified or deleled path from the index. Just type `git checkout add_new_file` and check the status using `git status` and you should see that those changes are now gone.

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_checkout.jpg)
```
→ git status
On branch new_branch
Your branch is up-to-date with 'origin/new_branch'.
nothing to commit, working directory clean
```

You probably also noticed that you were not asked to confirm the checkout. Please remember, this is a very dangerous command. As far as I know, there is no way to recover those changes using git.

### git reset


`git reset` is used often and it's one of those commands that can destroy work, because it affects the working tree. That said, please be careful with doing git reset with --hard option.

#### git reset --hard

Lets start by the option --hard. I know this is not the best option to start explaining `git reset `, but since I just talked about `git checkout` I think it would be good to start with --hard because given the same context we had on the git checkout example, the outcome will be the same.

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_change_add_new_file_wd.jpg)

Using `git reset --hard` in this context, the outcome will be the same as using `git checkout add_new_file`, **but** we need to understand the internals. Instead of picking the change from Index, it will pick up from `HEAD` and it will also replace what we may have on the `Index`. Which means that if we had do `git add add_new_file` it will also reset the content of add_new_file from Index. 

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_reset_hard_checkout.jpg)

#### git reset --mixed

This command is the default, which means, if we don't add anything to the `git reset ` it will behave as `git reset --mixed`.

For this example, lets consider that we add the change we did on the `add_new_file` to `Index`.

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_change_staged_add_new_file.jpg)

If we do `git reset --mixed` or `git reset` it will replace the content we have on `Index`, but it will not replace anything on the working directory. 

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_reset_mixed.jpg)

#### git reset --soft

One thing I didn't tell you is that you can indicate a commit to do the reset. That will first update the HEAD to the given commit and if we use `--soft` it will be all that it would do.

![Git State]({{ site.url }}/assets/img/posts/2017.09.05/git_reset_soft.jpg)

Summing up, it will first update the HEAD to the given commit, if `--mixed` it will also update the `Index` or it will also update the working directory if we use `--hard`.

### git clean

This command is useful to remove those files that are not tracked, as an example, we can imagine adding a wrong file and we want to clean up the working directory. We can also use `-x` option to remove those files that are ignored (.gitignore), which is useful to remove `bin` folders for example.

![Git Clean]({{ site.url }}/assets/img/posts/2017.09.05/git_clean.jpg)


### git revert

Last, but not least, `git revert`. All the options we've looked at so far just erase changes we did, without recording the action itself. This command is different, this command allows us to revert changes already committed, without changing the history of repository, but adding a new commit with the revert. 

I can think of one good reason to use this command, imagine that we introduce a change with performance issues. We want to revert that change, but we want to keep that revert in our repository, to explain why we did it and because the history should tell the life story of a repository. However, if we find ourselves using `git revert` too often before a release, we might need to change our workflow.

I will use the revert to remove the changes I did on commit `e03d1e9`. `git revert e03d1e9` and it will ask me for a commit message and I will use something like

```
    Revert "New change to the add_new_file"

    After starting the canary release, we started noticing some performance issues with
    this change.

    This reverts commit e03d1e99a9210a1fb6d26ceb1fce93f0e795f4a6.
```

After I save it, if I go to `git log` I will see my new commit there.

```
→ git log --pretty=format:"%h %an: %s"
0dbcaef Bruno Costa: Revert "New change to the add_new_file"
e03d1e9 Bruno Costa: New change to the add_new_file
c5c7ae4 Bruno Costa: Add new file
de4fc88 Bruno Costa: Add README
```

Trying to translate it into an image, it would be something like this:

![Git Revert]({{ site.url }}/assets/img/posts/2017.09.05/git_revert.jpg)

I hope you enjoyed the article, if you have any questions or suggestions, feel free to comment. Thanks!