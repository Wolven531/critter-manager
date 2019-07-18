FROM node:latest

# Copy app source
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# Get Node dependencies
RUN npm install

# Expose Node port
EXPOSE 3000

# Start app
CMD [ "npm", "start" ]
