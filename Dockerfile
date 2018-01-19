# Use latest version LTS of node
FROM node:carbon

RUN npm install webpack -g

# Install deps
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Create app directory and build front end
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack

# Expose the port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the thing
CMD [ "node", "./server.js" ]
