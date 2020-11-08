const Opiniones = require('../../common/opiniones');
const integraciones = require('../../common/integraciones');
const AWS = require('aws-sdk')

jest.mock('aws-sdk');
jest.mock('../../common/integraciones');

const DynamoDB = new AWS.DynamoDB.DocumentClient()
DynamoDB.put = jest.fn((params) => {
    return {
        promise() {
            return Promise.resolve(true)
        }
    }
})

describe(`opiniones logic`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
    }),

        test(`se guarda sin errores el registro`, async () => {

            const opiniones = new Opiniones(DynamoDB);
            const result = await opiniones.guardar({});

            expect(result.statusCode).toEqual(201);
        }),

        test(`error en dynamodb al crear registro`, async () => {

            DynamoDB.put = jest.fn((params) => {
                return new Error('error');
            })

            const opiniones = new Opiniones(DynamoDB);
            const result = await opiniones.guardar(DynamoDB);

            expect(result.statusCode).toEqual(500);
        })
}); 