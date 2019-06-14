FROM node:10-alpine

WORKDIR /app
COPY . ./
RUN npm install --production

# TODO args start script
CMD ["npm", "start"]
