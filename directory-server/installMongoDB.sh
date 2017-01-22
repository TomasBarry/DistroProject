#!/bin/bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
touch /etc/apt/sources.list.d/mongodb-org-3.2.list
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org

