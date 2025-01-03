#!/bin/bash

docker build --no-cache -t 0xgingi/firefox-release-discord:latest .

docker push 0xgingi/firefox-release-discord:latest 