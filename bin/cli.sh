#!/usr/bin/env bash

if [ -d "dist" ]; then
    node --enable-source-maps dist/cjs/interfaces/cli/index.js "$@"
else
    if [ -f "interfaces/cli/index.ts" ]; then
        npx ts-node --compiler-options '{"module":"commonjs"}' interfaces/cli/index.ts "$@"
    elif [ -f "interfaces/cli/index.js" ]; then
        node --enable-source-maps interfaces/cli/index.js "$@"
    fi
fi
