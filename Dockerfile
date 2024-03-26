# Use the official Node.js 14 image as a parent image
FROM node:18

# Set the working directory
WORKDIR /src/app

# Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN npm install

# Build the project (if you are using TypeScript)
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["node", "dist/main"]
