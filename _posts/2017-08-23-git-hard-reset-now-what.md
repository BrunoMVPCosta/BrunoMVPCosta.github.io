---
layout: post
title:  "Git hard reset, now what?"
date:   2017-08-23 00:00:42
categories: git
tags: [git]
permalink: /git/2017/08/22/git-hard-reset-now-what.html
description:  I just did a git hard reset and now I need my previous work. This is how.
comments: true
share: true
---

Imagine it's Friday, you are in a hurry and someone asks you to check on something really quickly. You open the terminal, prepare to checkout a new branch, but before that you just perform a `git reset --hard HEAD~`.

>Oh My God. What did I do?

You just deleted all your work. Gone. Vanished. And probably that's the reason why you are reading this. If so, I will try to help you.

The good news is that git doesn't actually delete anything, even when you do a hard reset. However, git just takes responsability if you did a commit. If you did, you are probably able to restore it.

Git has the option `fsck` which validates the objects in the database and its connectivity.

Let's use this to try and find our missing objects.
First, I will try to simulate a hard reset. My branch is ahead by 1 commit as we can see using `git status`.

```
→ git status
On branch new_branch
Your branch is ahead of 'origin/new_branch' by 1 commit.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean
```

So, now I will do a hard reset and check the status again.

```
→ git reset --hard HEAD~
HEAD is now at c5c7ae4 Add new file
→ git status
On branch new_branch
Your branch is up-to-date with 'origin/new_branch'.
nothing to commit, working directory clean
```

And with this, I believe I'm in the same position as you are. I just deleted all my unpushed work.

I will call git-fsck with --lost-found option to understand if there is something I can hang on to try to recover from my mistake.

```
→ git fsck --lost-found
Checking object directories: 100% (256/256), done.
Checking objects: 100% (6/6), done.
dangling commit 8dc8f51b0c14ff5dbf7234f07976466277f1474e
```

And there it is. The lonely commit waiting for us.

I will try to do a rebase to see if I can get this commit back.

```
→ git rebase 8dc8f51b0c14ff5dbf7234f07976466277f1474e
First, rewinding head to replay your work on top of it...
Fast-forwarded new_branch to 8dc8f51b0c14ff5dbf7234f07976466277f1474e.
```

Oh wait, did it work?

```
→ git status
On branch new_branch
Your branch is ahead of 'origin/new_branch' by 1 commit.
  (use "git push" to publish your local commits)
nothing to commit, working directory clean
→ git log
commit 8dc8f51b0c14ff5dbf7234f07976466277f1474e
Author: Bruno Costa <yyy@yyy.com>
Date:   Wed Aug 23 20:48:42 2017 +0100

    Add yet another file
    (...)
```

It did work!

Do you have other options? I think we might have, lets go back and do it again.

```
→ git reset --hard HEAD~
HEAD is now at c5c7ae4 Add new file
→ git status
On branch new_branch
Your branch is up-to-date with 'origin/new_branch'.
nothing to commit, working directory clean
```

Now we will try to do a cherry-pick to see if it does recover the lost change.

```
→ git cherry-pick 8dc8f51b0c14ff5dbf7234f07976466277f1474e
[new_branch 97e5c7d] Add yet another file
 Date: Wed Aug 23 20:48:42 2017 +0100
 1 file changed, 1 insertion(+)
 create mode 100644 add_yet_another_file
→ git log
commit 97e5c7d6388f7e7df1a321e2f6b869246847f664
Author: Bruno Costa <yyy@yyy.com>
Date:   Wed Aug 23 20:48:42 2017 +0100

    Add yet another file
```

It did!

Now, let's try again using merge.

```
→ git merge 97e5c7d6388f7e7df1a321e2f6b869246847f664
Updating c5c7ae4..97e5c7d
Fast-forward
 add_yet_another_file | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 add_yet_another_file
```

And finally, if things are really nasty and none of this works, you can checkout the change, create a new branch and do a diff. I won't be showing that in here now, I may update it later with an example, but you get the idea.