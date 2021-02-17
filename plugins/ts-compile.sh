#!/bin/sh

# Compile "tutorial" plugin
tsc \
    --esModuleInterop \
    --outDir \
    plugins/tutorial/compiled \
    plugins/tutorial/index.ts plugins/tutorial/markdownLoader.ts
