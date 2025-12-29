# Use Node.js LTS
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies for both server and gateway
# Copy package.json from root
COPY package*.json ./
# Install root dependencies
RUN npm install

# Copy source code
COPY . .

# Expose ports
# 3001: Brand Portal (Server)
# 3002: Model Gateway
EXPOSE 3001 3002

# Start both services using the dev script (or a dedicated prod script)
# For production, we should probably run them separately or use PM2
# Here we use the existing 'dev' script but we should refine it for prod.
# Better: Create a start.sh script
CMD ["npm", "run", "dev"]
