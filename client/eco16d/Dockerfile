ARG NODE_VERSION=20.13.1
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build   

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
