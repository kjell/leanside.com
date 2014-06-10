---
layout: post
---

I'm not exactly sure how this works, but it comes in useful. `ssh` within a
`tmux` session on one machine (*a*) to another machine that's running `tmux` (*b*),
and `tmux attach`.

Now you have "double tmux". I use `control-f` as my `<PREFIX>`, so
`control-f s` shows me a list of sessions on *a*. `<PREFIX> control-b s`
will do the same `choose-tree -s` on machine *b*.

When you're ready to disconnect *b*, `<PREFIX> control-b d` does the
trick. (I've yet to try going three deep.)

