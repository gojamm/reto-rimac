'use strict';

const uuid = require("uuid");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const Opiniones= require("../common/opiniones");
let opiniones = new Opiniones(dynamoDB);

module.exports.handler = async (event, context) => {
    const { id } = event.pathParameters;
    return opiniones.obtenerRegistro(id);
};