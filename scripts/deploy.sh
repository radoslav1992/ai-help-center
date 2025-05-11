#!/bin/bash
# AI Help Center deployment script

set -e

# Configuration
SERVER_USER="your-username"
SERVER_HOST="your-server-ip"
SERVER_PATH="/var/www/ai-help-center"
ARCHIVE_NAME="ai-help-center.tar.gz"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Functions
show_help() {
  echo -e "${YELLOW}AI Help Center Deployment Script${NC}"
  echo
  echo "Usage:"
  echo "  $0 [options]"
  echo
  echo "Options:"
  echo "  -h, --help       Show this help message"
  echo "  -u, --user       Server username (default: $SERVER_USER)"
  echo "  -s, --server     Server hostname or IP (default: $SERVER_HOST)"
  echo "  -p, --path       Server deployment path (default: $SERVER_PATH)"
  echo "  --skip-build     Skip the build step"
  echo
  echo "Example:"
  echo "  $0 -u admin -s example.com -p /var/www/mysite"
  echo
}

# Parse arguments
SKIP_BUILD=false
while [[ "$#" -gt 0 ]]; do
  case $1 in
    -h|--help) show_help; exit 0 ;;
    -u|--user) SERVER_USER="$2"; shift ;;
    -s|--server) SERVER_HOST="$2"; shift ;;
    -p|--path) SERVER_PATH="$2"; shift ;;
    --skip-build) SKIP_BUILD=true ;;
    *) echo "Unknown parameter: $1"; show_help; exit 1 ;;
  esac
  shift
done

# Check if server details are provided
if [ "$SERVER_USER" == "your-username" ] || [ "$SERVER_HOST" == "your-server-ip" ]; then
  echo -e "${RED}Error: Server details not configured${NC}"
  echo -e "Please edit this script or provide parameters for:"
  echo -e "  - Server username (-u, --user)"
  echo -e "  - Server hostname/IP (-s, --server)"
  exit 1
fi

# Deployment steps
echo -e "${GREEN}Starting deployment process...${NC}"

# Create scripts directory if it doesn't exist
mkdir -p $(dirname "$0")

# 1. Build the application if not skipped
if [ "$SKIP_BUILD" = false ]; then
  echo -e "${YELLOW}Building the application...${NC}"
  npm run build
  if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Aborting deployment.${NC}"
    exit 1
  fi
fi

# 2. Create a deployment archive
echo -e "${YELLOW}Creating deployment archive...${NC}"
tar --exclude='node_modules' --exclude='.git' --exclude="$ARCHIVE_NAME" -czvf "$ARCHIVE_NAME" .

# 3. Upload to server
echo -e "${YELLOW}Uploading to server...${NC}"
scp "$ARCHIVE_NAME" "$SERVER_USER@$SERVER_HOST:/tmp/"

# 4. Deploy on server
echo -e "${YELLOW}Deploying on server...${NC}"
ssh "$SERVER_USER@$SERVER_HOST" "mkdir -p $SERVER_PATH && \
  cd $SERVER_PATH && \
  tar -xzvf /tmp/$ARCHIVE_NAME && \
  npm install --production && \
  pm2 restart ai-help-center || pm2 start npm --name \"ai-help-center\" -- start -- -p 3001"

# 5. Clean up
echo -e "${YELLOW}Cleaning up...${NC}"
rm "$ARCHIVE_NAME"

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "Your application is now running at http://$SERVER_HOST" 