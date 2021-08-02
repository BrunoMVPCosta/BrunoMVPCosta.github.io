---
layout: post
title:  "Rename a branch in git"
date:   2017-08-22 00:00:42
tags: [git]
categories: tutorials
permalink: /git/2017/08/22/rename-branch-git.html
description:  How to rename a branch in git
comments: true
share: true
---

Sometimes we choose the wrong name for our branch or we add some misspelled word and we need to rename the branch.

After looking for help on `man git branch` we are able to find the option `-m`.

```
-m, --move
    Move/rename a branch and the corresponding reflog.
```
```
git branch [<options>] (-m | -M) [<old-branch>] <new-branch>
```

So, let's run this option.

`git branch -m new-branch`

(If the current branch is not the one you want to rename, you need to specify which branch is the `<old-branch>`)

In our case it would be:
`git branch -m old_branch new-branch`

 ```
→ git status
On branch new-branch
Your branch is up-to-date with 'origin/old_branch'.
nothing to commit, working tree clean
 ```

It did rename the local branch, but not the remote one. If we need to do a push it would fail. How can we rename the remote branch?

Unfortunately, it's not possible. We need to remove the old branch and create a new one.

`git push origin :old_branch`

```
→ git status
On branch new-branch
Your branch is based on 'origin/old_branch', but the upstream is gone.
  (use "git branch --unset-upstream" to fixup)
```

`git branch --unset-upstream new-branch`

```
→ git status
On branch new-branch
nothing to commit, working tree clean
```

`git push --set-upstream origin new-branch`

```
→ git status
On branch new-branch
Your branch is up-to-date with 'origin/new-branch'.
nothing to commit, working tree clean
```

And we are done!