# Entrega_Individual_OrientDB

En este proyecto se ha utilizado la imagen de OrientDB y un cliente js para hacer una aplicación que cree una nueva clase dentro de una base de datos, y todo esto dentro de un entorno docker.

## Instalación 🔧

Para la instalación es recomendable crear una carpeta nueva y descargarse todos los archivos (menos el README, la carpeta de Kubernetes y la carpeta de Imagenes) dentro de ella.


## Ejecutando la aplicación ⚙️

Una vez descargados, nos situamos dentro de la nueva carpeta y ejecutamos el siguiente comando: `docker-compose up --build -d`. Este comando construirá las imágenes necesarias antes de iniciar los contenedores y gracias al `-d` correrá estos contenedores en segundo plano. Si todo a salido bien, debería aparecer lo siguiente (el primer "built" puede que tenga el nombre diferente):

![alt text](https://raw.githubusercontent.com/Jonpor13/Entrega_Individual_OrientDB/main/Imagenes/Captura1.PNG)

Ahora, si usamos `docker ps` veremos como nuestro contenedor del servidor de OrientDB está en ejecución:

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura2.PNG)

*Atención, el id del contenedor no tiene que ser el mismo que el de la imagen y se usará más adelante.*


## Comprobando que todo funciona 👍

Para comprobar que la clase "prueba" se ha creado correctamente, debemos meternos dentro del contenedor recién creado de OrientDB. Para ello, necesitamos ejecutar este comando: `docker exec -it <id-del-contenedor> sh`.

Una vez dentro del contenedor, debemos dirigirnos a la carpeta donde están todo los ejecutables (`cd bin`) y ahí ejecutar el archivo "console.sh" (`./console.sh`). Con esto conseguiremos entrar dentro de la consola de OrientDB:

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura3.PNG)

El siguiente paso sería meternos dentro de la base de datos OSystem, la cual se crea automáticamente al iniciar el servidor de OrientDB, con este comando: `connect remote:localhost/OSystem root rootpwd`

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura4.PNG)

Por último, para listar todas las clases que hay en OSystem y comprobar que la clase "prueba" exista, usamos el comando `classes`.

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura5.PNG)


### La clase "prueba" no aparece 👎

Si la clase "prueba" no aparece, puede ser problema del orden de ejecución de los contenedores que se crean. Es decir, antes de que el servidor de OrientDB se inicié, el cliente ejecuta la orden de conectarse al servidor, pero al no haber ningún servidor en marcha, este no puede conectarse y salta un error de conexión. 

Para comprobar si el problema es ese, primero apagamos los contenedores creados usando `docker-compose down` y luego utilizamos de nuevo el comando `docker-compose up --build` pero esta vez sin la `-d`, para ver todo el proceso. Si en la terminal os aparece el siguiente mensaje, significa que el problema es el orden de ejecución de los contenedores:

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura6.PNG)

La solución que yo seguí fué crear un archivo "sh" (app.sh) el cual espera 10 segundos para que el servidor inicie, y luego ejecuta el cliente. Puede ser que vuestra conexión a internet sea más lenta o que la velocidad de computación de vuestro ordenador sea menor. Por eso lo único que debéis hacer es editar el archivo "app.sh" ampliando el tiempo de espera a más de 10 segundos.

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura7.PNG)

Una vez cambiado, podéis comprobar rápidamente que todo funciona ejecutando otra vez `docker-compose down` y luego `docker-compose up --build`. Si no os aparece el mensaje de antes y al final de la terminal os aparece lo siguiente, significa que todo ha ido bien.

![alt text](https://github.com/Jonpor13/Entrega_Individual_OrientDB/blob/main/Imagenes/Captura8.PNG)

Si queréis comprobar que la clase "prueba" esté dentro de la base de datos de una manera más gráfica, seguid los pasos de la sección anterior.


## Autores ✒️

* **Jon Martin Guerrero**

## Expresiones de Gratitud 🎁

A todos los que me han ayudado, muchas gracias. Os invito a un McFlurry 😜😂

