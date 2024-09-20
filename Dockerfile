FROM node:21.6.1-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install 

RUN npm run build

CMD ["npx", "prisma", "studio", "&&", "npm", "start"]