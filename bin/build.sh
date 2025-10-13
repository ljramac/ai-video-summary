#!/usr/bin/env bash

if [ -d "dist" ]; then
    rm -r dist
fi

mkdir -p dist/config
cp config/default.json dist/config/

npx tsc
