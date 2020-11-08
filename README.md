# Reto Rimac - AWS

ApiRest que permite agregar y listar opiniones sobre las peliculas de StarWars

## Estructura

Para cada operación existe un archivo, p.ej: ```handlers/nuevoRegistro.js```, la estrcutura del proyecto es asi:

  - ```handlers``` funciones lambda
  - ```common``` clases de logica
  - ```__test__``` pruebas unitarias

## Configuración

```npm install```

## Test

```npm test```

Existen 2 archivos de pruebas unitarios, uno enfocado al handler de la creación del registro, y el otro enfocado a la logica de la creación.
El resultado debe ser similar a:
```
 PASS  __tests__/handlers/nuevoRegistro.test.js
 PASS  __tests__/common/opiniones.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        4.563 s
Ran all test suites.
```

## Despliegue

```serverless deploy```
El resultado debe ser similar a:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Installing dependencies for custom CloudFormation resources...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service reto-rimac.zip file to S3 (23.97 MB)...
Serverless: Uploading custom CloudFormation resources...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
............................
Serverless: Stack update finished...
Service Information
service: reto-rimac
stage: dev
region: us-east-1
stack: reto-rimac-dev
resources: 39
api keys:
  None
endpoints:
  POST - https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/nuevo
  GET - https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/obtener/{id} 
  GET - https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/listado
functions:
  nuevoRegistro: reto-rimac-dev-nuevoRegistro
  obtenerRegistro: reto-rimac-dev-obtenerRegistro
  listarRegistros: reto-rimac-dev-listarRegistros
layers:
  None
```

## Uso

### Nueva opinión

```
curl --location --request POST 'https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/nuevo' \
--header 'Content-Type: application/json' \
--data-raw '{
    "usuario":"jorgem",
    "descripcion" : "Mi opinión sobre la pelicula",
    "puntaje": 5,
    "idPelicula": 1
}'
```
Resultado de ejemplo:
```
{"mensaje":"Registro creado"}
```

### Listar todas las opiniones

```
curl --location --request GET 'https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/listado'
```
Resultado de ejemplo:
```
[
    {
        "idPelicula": 1,
        "usuario": "jmesa",
        "id": "f8bc16e0-2118-11eb-9b67-23cb7775d9de",
        "creado": "2020-11-09T10:47:50.094Z",
        "puntaje": 5,
        "opinion": "test 2",
        "titulo": "A New Hope",
        "director": "George Lucas",
        "personajes": "Luke Skywalker,C-3PO,R2-D2,Darth Vader,Leia Organa,Owen Lars,Beru Whitesun lars,R5-D4,Biggs Darklighter,Obi-Wan Kenobi,Wilhuff Tarkin,Chewbacca,Han Solo,Greedo,Jabba Desilijic Tiure,Wedge Antilles,Jek Tono Porkins,Raymus Antilles"
    },
    {
        "idPelicula": 1,
        "usuario": "jmesa2",
        "id": "827b85a0-21e6-11eb-99bd-a97314319df7",
        "creado": "2020-11-09T10:19:08.026Z",
        "puntaje": 5,
        "opinion": "test 3",
        "titulo": "A New Hope",
        "director": "George Lucas",
        "personajes": "Luke Skywalker,C-3PO,R2-D2,Darth Vader,Leia Organa,Owen Lars,Beru Whitesun lars,R5-D4,Biggs Darklighter,Obi-Wan Kenobi,Wilhuff Tarkin,Chewbacca,Han Solo,Greedo,Jabba Desilijic Tiure,Wedge Antilles,Jek Tono Porkins,Raymus Antilles"
    }
]
```

### Ver una opinion específica

```
curl --location --request GET 'https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/obtener/f8bc16e0-2118-11eb-9b67-23cb7775d9de'
```
Resultado de ejemplo:
```
{
    "idPelicula": 1,
    "usuario": "jmesa",
    "id": "f8bc16e0-2118-11eb-9b67-23cb7775d9de",
    "creado": "2020-11-09T10:47:50.094Z",
    "puntaje": 5,
    "opinion": "test 2",
    "titulo": "A New Hope",
    "director": "George Lucas",
    "personajes": "Luke Skywalker,C-3PO,R2-D2,Darth Vader,Leia Organa,Owen Lars,Beru Whitesun lars,R5-D4,Biggs Darklighter,Obi-Wan Kenobi,Wilhuff Tarkin,Chewbacca,Han Solo,Greedo,Jabba Desilijic Tiure,Wedge Antilles,Jek Tono Porkins,Raymus Antilles"
}
```
## Integraciones

Los datos que se registran en DynamoDB solo continen el id de la pelicula, el nombre se obtiene mediante una integración con:
```https://swapi.py4e.com/api/films/:id/```

Cada pelicula devuelve un array de los personajes, el nombre de los personajes se obtiene recorriendo este array e integrandolo mediante: 
```https://swapi.py4e.com/api/people/:id/```

## Especificación OpenAPI
[dev-reto-rimac-dev-swagger.json](dev-reto-rimac-dev-swagger.json)
