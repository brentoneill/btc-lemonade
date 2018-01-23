# Use latest version LTS of node
FROM node:carbon

# Install webpack and pm2
RUN npm install webpack -g
RUN npm install pm2 -g

# Install deps from package
WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Create app directory and build front-end
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack

# Expose the port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["pm2-runtime", "./server.js"]
