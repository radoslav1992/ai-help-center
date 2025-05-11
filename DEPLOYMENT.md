# AI Help Center Deployment Guide

This guide provides instructions for deploying the AI Help Center application to a production environment.

## Prerequisites

- Node.js (v18.17.0 or newer)
- npm (v9.6.7 or newer)
- A server running Ubuntu/Debian (or similar Linux distribution)
- Domain name (optional, but recommended)

## Local Build

Before deploying, ensure your application builds successfully locally:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the production build locally
npm run start -- -p 3001
```

## Production Deployment

### Method 1: Direct Deployment

1. **Prepare your server:**

```bash
# Update package repositories
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

2. **Deploy your application:**

```bash
# Create a directory for your application
mkdir -p /var/www/ai-help-center

# Copy your application to the server
# Option 1: Using scp (from your local machine)
scp -r ./* user@your-server:/var/www/ai-help-center/

# Option 2: Using git (on your server)
git clone your-repository-url /var/www/ai-help-center
```

3. **Install dependencies and build:**

```bash
cd /var/www/ai-help-center
npm install
npm run build
```

4. **Run with PM2:**

```bash
# Start the application (replace 3001 with your desired port)
pm2 start npm --name "ai-help-center" -- start -- -p 3001

# Configure PM2 to start on boot
pm2 startup
pm2 save
```

### Method 2: Using Caddy as a Reverse Proxy

1. **Install Caddy:**

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

2. **Configure Caddy:**

Edit the Caddyfile:

```bash
sudo nano /etc/caddy/Caddyfile
```

Add your configuration:

```
yourdomain.com {
    reverse_proxy localhost:3001
}
```

For a simple setup without a domain:

```
:80 {
    reverse_proxy localhost:3001
}
```

3. **Restart Caddy:**

```bash
sudo systemctl restart caddy
```

## Optimized Deployment Method

For faster deployments with larger applications, use a compressed archive:

1. **Create an archive locally:**

```bash
# Build the application
npm run build

# Create a tarball excluding node_modules and .git
tar --exclude='node_modules' --exclude='.git' -czvf ai-help-center.tar.gz .
```

2. **Transfer and extract on the server:**

```bash
# Transfer the archive
scp ai-help-center.tar.gz user@your-server:/tmp/

# On the server
mkdir -p /var/www/ai-help-center
cd /var/www/ai-help-center
tar -xzvf /tmp/ai-help-center.tar.gz
npm install --production
pm2 restart ai-help-center || pm2 start npm --name "ai-help-center" -- start -- -p 3001
```

## Troubleshooting

- **Port already in use**: If port 3001 is already in use, choose a different port.
- **Build errors**: Ensure all dependencies are installed and your Node.js version is compatible.
- **Permission issues**: Make sure your user has appropriate permissions on the server.

## Maintenance

- **Updates**: Pull the latest changes, rebuild, and restart the PM2 process.
- **Logs**: Check logs with `pm2 logs ai-help-center`.
- **Monitoring**: Use `pm2 monit` for real-time monitoring.

## SSL Configuration

If using Caddy with a domain name, SSL certificates are automatically provisioned. For other setups, consider using Certbot with your web server. 