# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Python for any Python dependencies
RUN apk add --update python3 make g++

# Copy the rest of the application
COPY . .

# Create uploads directory if it doesn't exist
RUN mkdir -p uploads

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
