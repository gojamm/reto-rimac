const axios = require("axios");

module.exports = {
    obtenerDatosPelicula: function(id) {
        const data = axios.get(process.env.ENDPOINT_SWAPI_FILMS+id)
        .then((response) => {
            return {
                "titulo": response.data.title,
                "director": response.data.director, 
                "personajes": response.data.characters
            }
        })
        return data;
    },
    obtenerPersonajesPelicula: async function (datos) {
        let promiseArr = datos.personajes.map(l => axios.get(l).then(res => res.data.name));
        let resultado = "";
        await Promise.all(promiseArr).then( res => resultado = resultado+res );
        return resultado;
    },
    completarInfo: async function(id){
        let info = {};
        let x = await module.exports.obtenerDatosPelicula(id)
        .then(datos=>{
          info = datos;
          return module.exports.obtenerPersonajesPelicula(datos);    
        }).then(r=>{
            info.personajes = r;
        })
        return info;
    }
  };
 