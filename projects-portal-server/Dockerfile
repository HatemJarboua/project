# Use the official Node.js image
FROM node:18
RUN mkdir  /usr/src/firebase
RUN chmod 777 -R /usr/src/firebase
# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Inform Docker that the container is listening on the specified port
EXPOSE 3000

# Run the application
CMD ["node", "index.js"]
