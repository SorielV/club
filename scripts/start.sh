#!/bin/sh

# TODO: Production Script
if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  if [ "$NODE_ENV" == "seo" ]; then
    npm run seo-dev
  else
    npm run dev
  fi
fi