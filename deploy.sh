#!/bin/bash
RED='\033[0;31m'
GRN='\033[0;32m'
ORN='\033[0;33m'
NC='\033[0m'

if [ $# -eq 0 ]; then echo -e "\nusage: ./deploy.sh <your_docker_username>\n"; exit 1; fi

echo -e "BUILDING IMAGE ${ORN}$1/cryptohalic-app${NC}. . ."
docker build -t $1/cryptohalic-app .

if [ $? -ne 0 ]; then exit 0; fi

echo -e "\nYour application is available in ${GRN}http://localhost:8080/\n${NC}"
echo -e "Do not close your terminal! If you want to quit first end the container process with ^C"

docker run -p 8080:80 --name cryptoaholic-container $1/cryptohalic-app
docker rm cryptoaholic-containerm