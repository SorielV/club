FROM node

EXPOSE 3000 
COPY . /home/app/
WORKDIR /home/app/
RUN npm install
RUN npm i -g nodemon
CMD ./scripts/start.sh