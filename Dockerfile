# Use the official nginx image from DockerHub
FROM nginx:alpine

# Copy your static website files into the nginx/html directory
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]