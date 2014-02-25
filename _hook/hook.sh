echo "starting hook: " $port " -- " $dest " -- " $branch

[[ -e _pipe ]] && rm _pipe
mkfifo _pipe
while true; do
  {
    # block until netcat recieves a request and sends it to `_pipe`
    read input < _pipe 
    # only accept requests from github // "The Public IP addresses for these hooks are: 192.30.252.0/22"
    if echo $input | egrep -q "192\.30\.252" >&2; then
      git checkout $branch >&2
      git fetch >&2
      git reset --hard origin/$branch >&2
      ./_hook/bin/jekyll build -d $dest >&2
      echo -e "HTTP/1.1 200 OK\r\n"
    fi
  } | nc -v -l $port &> _pipe
done
