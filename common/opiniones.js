'use strict';

const uuid = require("uuid");
const integraciones = require("./integraciones");

class Opiniones {
    constructor(db) {
        this.db = db;
    }

    async guardar(registro, callback) {
        let resultado;
        try {
            const resultado = await this.db.put({
                TableName: process.env.STARWARS_RIMAC_TABLE,
                Item: registro,
            }).promise();

        } catch (error) {
            return this.error('Error al guardar');
        }
        return {
            statusCode: 201,
            body: JSON.stringify({ mensaje: "Registro creado" }),
        }
    }

    async obtenerListado() {
        let registros;
        try {
            const resultado = await this.db.scan({
                TableName: process.env.STARWARS_RIMAC_TABLE,
            }).promise();
            registros = resultado.Items;

            for (let index = 0; index < registros.length; index++) {
                await integraciones.completarInfo(registros[index].idPelicula).then(x => {
                    registros[index].titulo = x.titulo;
                    registros[index].director = x.director;
                    registros[index].personajes = x.personajes;
                });
            }

        } catch (error) {
            return this.error('Error al listar');
        }

        return {
            statusCode: 200,
            body: JSON.stringify(registros),
        };
    }

    async obtenerRegistro(id) {
        let registro;

        try {
            const resultado = await this.db.get({
                TableName: process.env.STARWARS_RIMAC_TABLE,
                Key: { "id": id }
            })
                .promise();
            registro = resultado.Item;
        } catch (error) {
           return this.error('Error al buscar item');
        }

        await integraciones.completarInfo(registro.idPelicula).then(x => {
            registro.titulo = x.titulo;
            registro.director = x.director;
            registro.personajes = x.personajes;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(registro),
        };
    }

    error(msg) {
        return {
            statusCode: 500,
            body: JSON.stringify({ mensaje: "Error en la operacion" }),
        };
    }
}

module.exports = Opiniones;