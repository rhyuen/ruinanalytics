FROM mhart/alpine-node:6
MAINTAINER robertyuen
WORKDIR 
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 6363:6363
CMD ["yarn", "run", "production"]
