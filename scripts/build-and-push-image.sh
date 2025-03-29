#!/usr/bin/env bash
set -e

docker build src/app-web -t registry.home.dennisskoko.com/git-guesser/app-web:latest

docker push registry.home.dennisskoko.com/git-guesser/app-web:latest
