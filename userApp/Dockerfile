# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose application port
EXPOSE 5000

# Environment variable
ENV PORT=5000

# Start app
CMD ["node", "src/index.js"]