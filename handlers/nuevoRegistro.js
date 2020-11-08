'use strict';

const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Opiniones= require("../common/opiniones");
let opiniones = new Opiniones(dynamoDB);

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const registro = {
    id: uuid.v1(),
    opinion: body.descripcion,
    usuario: body.usuario,
    puntaje: body.puntaje,
    idPelicula: body.idPelicula,
    creado: new Date().toISOString()
  };
  return await opiniones.guardar(registro);
}