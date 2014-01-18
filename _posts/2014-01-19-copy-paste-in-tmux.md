---
title: Copy and Paste in `tmux`
layout: post
---

For a year or two now I've been using `tmux`. It starts itself with a hook in my `~/.fish` as soon as I open up a terminal. Once `tmux` is open there's no need for other terminal windows or tabs. I use one 'session' per project. Each session has 'windows', each window has 'panes'.

It took until today for me to figure out how to properly copy and paste.  I did it a few times, but for whatever reason it never stuck. Now it does. All the code in this post was copied straight from TMUX.

How did I get by without pasting for so long? `vim` has the unnamed register (`"+`), which pulls from the system clipboard with the right configuration. `pbcopy`/`pbpaste` are essential. But the last resort, `option + click-and-dragging` the text I wanted and using the system clipboard, was impossible with vertically split panes. It copies all the text you want frmo the target pane, but the unrelated second pane is interleaved line by line, separated by `|` characters and whitespace.

The relevant lines from my `~/.tmux.conf`, with comments:

```
setw -g mode-keys vi # vim-style movement
# in normal tmux mode
bind Escape copy-mode # `tmux prefix + Escape` starts copy mode.
bind p paste-buffer # `prefix + p` pastes the latest buffer

# in copy mode…
bind -t vi-copy v begin-selection # `v` begins a selection. (movement keys to select the desired bits)
bind -t vi-copy y copy-selection # `y` copies the current selection to one of tmux's "paste buffers"
bind -t vi-copy V rectangle-toggle # `V` changes between line- and columnwise selection

bind -t vi-copy Y copy-end-of-line # ^1
bind + delete-buffer
```

I like `Y` to yank the current line, which is what `^1` does.

In copy-mode you can jump around with almost all the commands that work in vim. `/` and `?` work to search. There are no motions, so you can't `y5w` or `yap`.

Once you've copied some stuff, you can do more than just paste the last thing:

```
           #           List all paste buffers.
           -           Delete the most recently copied buffer of text.
           =           Choose which buffer to paste interactively from a list.
           [           Enter copy mode to copy text or view the history.
           ]           Paste the most recently copied buffer of text. 
```

(I have `[` remapped to `Escape` and `]` remapped to `p`. I use `-` for `split-window -v`, so I moved `delete-buffer` to `+`.)

`tmux` remembers old buffers and `prefix + =` lets you paste them arbitrarily!

Next up is running `tmux > ssh > tmux` for split panes server-side without multiplexing `ssh` connections.

Postscript: you can check all the `vi-copy` mode keys with `tmux list-keys -t vi-copy`. `tmux list-keys` prints all the current bindings, so if you're wondering about something you can `tmux list-keys | grep <something>`. `prefix + ?` from inside tmux opens the same list.
