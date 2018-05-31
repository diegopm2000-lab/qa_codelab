#!/bin/sh

# Execute this script as source ./initSwagger.sh for export variables to global environment outside the script scope

# Configuration File
export CONFIG_PATH="./config/myconfig.yml"
env | grep '^CONFIG_PATH='

# Server Port
export PORT="8080"
env | grep '^PORT='
