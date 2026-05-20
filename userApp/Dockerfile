# Use official Node.js image
FROM node:18

# Create app directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "src/index.js"]