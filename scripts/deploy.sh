#!/bin/bash

# setup vars
out=${2:-"build/"}
origin=${1:-"git@github.com:pawk/todo-app.git"}

run() {
  pushd $out
  git init
  git add .
  git cm "github pages deployment"
  git remote add origin $origin
  git fetch origin gh-pages
  git branch -u origin/gh-pages
  git push --force origin HEAD:gh-pages
  popd

  rm -rf $out
}

run
