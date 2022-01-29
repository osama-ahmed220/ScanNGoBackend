# Set node version
FROM node:14.10.1

# Pick a beutifull temporary folder name
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy package and yarn lock so we can quickly do the install then we copy the bulk
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy the rest of the bulk
COPY . ./

# Start it up
CMD ["yarn", "dev"]
