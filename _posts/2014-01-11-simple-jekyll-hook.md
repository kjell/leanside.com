---
layout: post
---

I like the idea of jekyll, but haven't actually used it for years. I
decided to wrap my personal website, which I've been ignoring lately,
with jekyll. I have a nice little server that's always treated me well,
and I'm not ready to give it up. No `CNAME` to github pages for me.

So
[`jekyll-hook`](https://github.com/developmentseed/jekyll-hook/blob/master/jekyll-hook.js).
Except that's a bit complicated and I don't have `node.js` on the server
in question. [So I wrote my own. In bash, using
`netcat`](https://github.com/kjell/leanside.com/commit/2195fd286419c898874edf079497035cbeeefaa6#diff-e9f3fddc758fe0d61b04245333aeead0).
Here's how it looks:

```sh
echo "starting hook: " $port " -- " $dest " -- " $branch

[[ -e _pipe ]] && rm _pipe
mkfifo _pipe
while true; do
  {
    # block until netcat recieves a request and sends it to `_pipe`
    read input < _pipe 
    # only accept requests from github // "The Public IP addresses for these hooks are: 192.30.252.0/22"
    if echo $input | egrep -q "192\.30\.252\.[0-255]"; then
      echo $input >&2 # now do stuff
      git checkout $branch
      git fetch
      git reset --hard origin/$branch >&2
      ./_hook/bin/jekyll build -d $dest >&2
      echo -e "HTTP/1.1 200 OK\r\n"
    fi
  } | nc -v -l $port &> _pipe
done
```

This does a few cool things that I had to figure out. I'll explain them
briefly. I barely know what I'm talking about, so double check this
before taking my word for it. `man` is your friend.

## netcat (`nc`)

Is like `cat`, but for network interfaces. It can send or recieve data
to other machines. I'm telling `nc` to `-v` (send verbose output) and
`-l $port` (listen for incoming connections on `$port`). When a
connection is made, send all output to something called `_pipe`.

## `while true`, `{…}`

The whole script is inside a `while true` loop. It waits for an incoming
request, processes it, and then reloads to wait for the next one. It
does this by spawning two 'sub processes'. The first is a series of
commands bundled up with curly braces. The second is
the `nc` that listens for incoming requests.

## pipes, mkfifo

First off, `mkfifo` creates a named pipe, aptly called `_pipe`. (If `_pipe` already
exists, `rm` it.) At the command line, `|`, `>`, and `<` are "unnamed pipes". 
They pipe something from one place to another. `_pipe` does too, but
it behaves as a file on the filesystem.

`_pipe` is what juggles between `nc` waiting and doing. When `nc`
handles an incoming connection, it outputs (`-v` verbosely) to the pipe.
We've already spawned a bash subprocess that's sitting and waiting for
input from our pipe. When a request is made, `nc` sends the request to
`_pipe`, which kicks off the `{…}` subprocess.

This main body of commands checks that the request is actually coming
from github's block of IP addresses. If so it grabs the newest code
and `jekyll build`s into the directory that `leanside.com` comes from.

The part that I can barely understand is that this subprocess then pipes
it's output back into netcat! So it says `HTTP/1.1 200 OK\r\n`. So it's
a circular thing. On successfully processing the request `nc` quits,
which brings us back to the top of the `while` and starts everythign
over again.

Now to push this post and watch it happen.
