#!/bin/bash
RED='\033[0;31m'
GRN='\033[0;32m'
ORN='\033[0;33m'
NC='\033[0m'

if [ $# -eq 0 ]; then echo -e "\nusage: ./deploy.sh <your_docker_username>\n"; exit 1; fi

echo -e "BUILDING IMAGE ${ORN}$1/sinforeact-app${NC}. . ."
docker build -t $1/sinforeact-app .
if [ $? -ne 0 ]; then 
    echo -e "\n> The build has given an ${RED}error, ${NC}did you check if Docker is available or is executed?"
    echo -e "> If it is, ${RED}maybe is our fault${NC}, but we've checked that this works as it should.\n"
    exit 1
fi

echo -e "\nYour application is available in ${GRN}http://localhost:8080/\n ${NC}"
docker run -p 8080:80 $1/sinforeact-app