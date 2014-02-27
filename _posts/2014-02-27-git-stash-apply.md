---
layout: post
---

`git stash pop`. Don't do it!

I love `git`. I love `stash`. But if I was a smart person, I would always
use `git stash apply`.

Why?

Because `git stash pop` loses your most recent stashed changes. If what
you `pop`ped conflicts with your working tree, the resulting merge will
conflict. But the `stash` is long gone because it was `pop`ped onto the
working tree. So you have a mess to clean up. Messes are no fun.

The problem is if I `pop` my `stash` in the wrong place, it's no longer
`stash`ed. If I'm unlucky I see `UU` (unmerged, both modified)
somewhere. `UU` means I can't re-`stash` my changes. `UU` is the worst.

If only I'd `git stash apply`ed. Then the changes would still be on the
top of `stash`. I could `git reset .` without losing them. I could
figure out what I did wrong and fix it. At which point `git stash
apply` would work, and I'd be set.

The only downside to `apply` is it leaves the most recent `stash`ed hunk
on top of the `stash` forever. It pollutes the `stash`.

But having `pop`ed on the wrong branch, I now have
to untangle things. The idea of a polluted stash seems a lot better
than losing changes.

Used right, `git` makes it impossible to mess up. Used right, `git`
makes your code immortal. Live on the edge, no consequences!  Do
crazy shit! If it doesn't work out—even if it blows up in your face!—a
simple `git reset .` fixes everything. Or `git checkout -b
oops/this-didnt-go-so-well; git commit -m "but anyway…"` isolates the
broken code. `git checkout -` and you're right where you started, sins
forgiven, ready to move on. Whatever didn't work out is still just an
`oops` branch away.

So `apply`.
