FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies, include lockfile
COPY package*.json ./

RUN npm install
# Use ci for production, bypass package.json to install modules from lockfile
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]