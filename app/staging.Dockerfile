# Use an official Node.js runtime as the base image
FROM node:18 AS build

ARG VITE_BACKEND_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG ASSEMBLY_AI_KEY

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY app/package.json ./

# Install project dependencies
RUN npm install

# Copy all frontend files to the container
COPY app/ /app/

# Set environment file
COPY app/.env.staging ./.env

RUN npm run build

# Expose the port on which the frontend will run (usually 3000 for React)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .

COPY app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start the React development server
CMD ["nginx", "-g", "daemon off;"]
