#!/usr/bin/env bash

set -e
cd slipbox
cat filters/*.test.lua | lua
cd ..

pytest --cov=slipbox --cov-fail-under=80
pylint slipbox --fail-under=9

echo "Yay!"
