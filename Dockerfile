#imagen
FROM node
# Descargar e instalar dependencias
RUN apt-get -y update && apt-get -y upgrade 
RUN apt install -y npm 

RUN mkdir app/
WORKDIR app/
RUN npm install orientjs
COPY cliente.js .
COPY app.sh .
RUN chmod 777 app.sh

CMD ./app.sh


