if [ -z "$dump" ]; then
  echo '$dump is required'
else
  echo "$dump"
  exec psql postgresql://postgres:postgres@127.0.0.1:6666/foo < "$dump"
fi