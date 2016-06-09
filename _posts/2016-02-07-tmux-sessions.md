---
layout: post
---

(OK, so I am a pathetic blogger. But when I do blog, it's about `tmux`.)

`tmux` is the best. For some reason I woke up this morning wanting to talk
about my tmux session workflow.

First, the basics. One fullscreen iTerm window. `tmux`. A shim in my
bash (actually `fish`) shell configuration that starts `tmux` if it
isn't already running. And a little script called `s` that kickstarts
tmux sessions for anything I'm working on.

```fish
if status --is-interactive
  if not set -q TMUX
    s kjell
  end
end
```

As soon as I open a terminal window, tmux is up and running. I'll get to
`s` in a second.

## Sessions, windows, panes, oh my!

![image](https://cloud.githubusercontent.com/assets/1378/12873432/24b5e41e-cd82-11e5-8664-6e6a12fce552.png)

This shows the 8 sessions I have open currently. My server has been up
and running for a bit over a week:

```
kjell            532   2.3  0.1  2467244   2372   ??  Ss   29Jan16 38:22.14 tmux new-session -d -s kjell -c /Users/kjell /usr/local/bin/reattach-to-user-namespace -l fish
```

I've been attached to this instance for 3 days:

```
kjell          82646   0.0  0.0  2435496    272 s000  S+   Fri04PM 0:00.01 tmux a
```

The graphic above is my "session switcher" (`PREFIX-s`). `7`, highlighted
yellow, is active with 3 windows.

```
⁂ tmux list-windows -t kjell
0: fish  (2 panes) [178x51] [layout f7f9,178x51,0,0{89x51,0,0,83,88x51,90,0,94}] @44
1: vim- (1 panes) [178x51] [layout 5b58,178x51,0,0,95] @50
2: tmux* (1 panes) [178x51] [layout 5b59,178x51,0,0,96] @51 (active)
```

shows what they are:

`0` has 2 panes, one is a `fish` shell; `1` is a vim window; `2` is a
single tmux. These are running in a session called "kjell", which is my
'home' session: the first to start and usually the last to end. It's the
all-purpose session.

When I context switch to another session, I `<PREFIX>-f <session id>` to
swap to the windows and panes open for that project. I can leave things
up and running to minimize startup time. If only my brain could keep up.

I usually leave the sessions open until things get too cluttered. Then I
go through and clean up old code I'm not using and take a breath of
fresh air.

I won't be able to explain it adequately, but here goes. Any two (or
five) programs can live side-by-side equally in `tmux`. A vim window can
sit next to a watcher command that runs a program each tile the files
change, showing me the results, successful or not. People swear by emacs
as an environment that they never need to leave. For me, having
tmux+vim+every other command line utility out there to be able to plug
and play is great.

I should really learn emacs though.
