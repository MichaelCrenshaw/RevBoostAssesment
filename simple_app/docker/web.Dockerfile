FROM node:20-alpine3.19

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Update and install dependencies
RUN apk update && apk upgrade

# Copy and install app dependencies
COPY package.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/
RUN npm install

# Copy app files
COPY . /usr/src/app

# Build app
RUN npm run build

# Start app
CMD ["node", ".output/server/index.mjs", "&"]

# Expose port
EXPOSE 3000

