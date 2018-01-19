FROM node:9-alpine

# Caches node_modules to speed up build time
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install --production
RUN mkdir -p /server && cp -r /tmp/* /server/

# Create the working directory and copy in the bundle
ADD ./dist /server/dist
WORKDIR /server

# Expose the port and run it
EXPOSE 8080
CMD ["npm", "run", "server:prod"]