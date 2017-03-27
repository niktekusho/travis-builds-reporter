FROM mhart/alpine-node:7

WORKDIR /src
COPY . .

RUN npm install

# if args will be added in the start script
# CMD ["npm", "start"]

# for now run this container using interactive shell
CMD ["sh"]
