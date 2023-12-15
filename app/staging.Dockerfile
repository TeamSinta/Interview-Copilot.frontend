# Use an official Node.js runtime as the base image
FROM node:18 AS build

ARG VITE_BACKEND_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG ASSEMBLY_AI_KEY


# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY app/package.json ./
# Set environment file
COPY app/.env.staging ./.env

# Install project dependencies
RUN npm install

# Copy all frontend files to the container
COPY . /app/

EXPOSE 3001

# Start the React development server
CMD ["npm", "run", "dev"]
