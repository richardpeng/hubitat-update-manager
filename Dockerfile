FROM node:lts-alpine
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Expose port
EXPOSE 3000
# Running the app
CMD [ "npm", "start" ]
