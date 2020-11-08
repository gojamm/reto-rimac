const Opiniones = require('../../common/opiniones');
const nuevoRegistro = require('../../handlers/nuevoRegistro');

jest.mock('../../common/opiniones');

describe(`nuevoRegistro lambda`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
    }),

    test(`resultado exitoso`, async () => {
        const mResponse = { statusCode: 200, body: 'mocked' };
        let mEvent = {};
        mEvent.body = JSON.stringify({ 
            descripcion: 'test',
            usuario: 'userTest',
            puntaje: 5,
            idPelicula: 1
        });

        jest.spyOn(Opiniones.prototype, 'guardar').mockReturnValue(Promise.resolve(mResponse));
        const result = await nuevoRegistro.handler(mEvent,{});

        expect(result.statusCode).toEqual(mResponse.statusCode);
    }),
    
    test(`Se presenta excepcion al guardar`, async () => {
        const mResponse = { statusCode: 500, body: 'mocked' };
        let mEvent = {};
        mEvent.body = JSON.stringify({});

        jest.spyOn(Opiniones.prototype, 'guardar').mockReturnValue(Promise.resolve(mResponse));
        const result = await nuevoRegistro.handler(mEvent,{});

        expect(result.statusCode).toEqual(500);
    });
});