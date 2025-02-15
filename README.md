# 🚗 Aplicación web Backend Parking Lot 🚗

Este repositorio contiene el código fuente de una aplicación backend hecha con NODE.JS/EXPRESS que sirve para gestionar un parqueadero, sus entradas, salidas de vehiculos y autenticacion y autorizacion de usuarios por roles con JWT.

Adicionalmente fue contenido usando docker para un despliege mas sencillo.

## Funcionalidades
- Login de usuarios por roles con autenticación basado en JWT
- creación de tipos de vehiculos y costo por fracción
- creación tickets de parqueo
- calculo de costo del ticket en base al tiempo transcurrido desde la entrada

## Tecnologías utilizadas
<ul>
    <li>
        <p>
            Node.js
            <img src="https://www.svgrepo.com/show/303360/nodejs-logo.svg" alt="node.js" width="25" height="25" />
        </p>
    </li>
    <li>
        <p>
            Express
            <img src="https://static.cdnlogo.com/logos/e/23/express.svg" alt="Express" width="25" height="25" />        
        </p>
    </li>
    <li>
        <p>
            Mongo DB
            <img src="https://www.svgrepo.com/show/373845/mongo.svg" alt="Mongo DB" width="25" height="25" />       
        </p>
    </li>
    <li>
        <p>
            Docker
            <img src="https://www.svgrepo.com/show/452192/docker.svg" alt="Docker" width="25" height="25" />
        </p>
    </li>
</ul>

## Despliegue en AWS ECS

Se desplegó el servicio usando ecs registrando la imagen, creando el cluster, su servicio y su tarea.

Evidencias:

Repositorio:
![Repositorio](public/deploy/1-repositorio-creado.png)

Imagen de docker creada en aws
![Imagen de docker creada en aws](public/deploy/2-imagen-creada.png)

Cluster
![Cluster](public/deploy/3-cluster.png)

Servicio de cluster
![Servicio de cluster](public/deploy/4-servicio.png)

Tarea ejecutandose
![Tarea ejecutandose](public/deploy/5-task.png)

Ejecucion exitosa usando el ip publica que nos entrega la task
![Ejecucion exitosa usando el ip publica que nos entrega la task](public/deploy/6-prueba.jpeg)
