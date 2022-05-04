import request from 'supertest';
import app from '../../src/index';

describe('GET /character', () => {
  test('Deve retornar o status 200 ao informar parametros esperados', async () => {
    const result = await request(app).get('/character').query({
      status: 'dead',
    });

    expect(result.statusCode).toEqual(200);
    // expect(result.body).toHaveProperty('result');
    // expect(result.body).toHaveProperty('metadata');
  });

  test('Deve retornar o status 200 ao não informar parâmetros', async () => {
    const result = await request(app).get('/character');

    expect(result.statusCode).toEqual(200);
    // expect(result.body).toHaveProperty('result');
    // expect(result.body).toHaveProperty('metadata');
  });

  test('Deve retornar o status 400 ao informar parametros incorretos', async () => {
    const result = await request(app).get('/character').query({
      name: undefined,
      status: 'CharacterStatus.Alive',
    });

    expect(result.statusCode).toEqual(400);
    // expect(result.body).toHaveProperty('result');
    // expect(result.body).toHaveProperty('metadata');
  });

  test('Deve retornar o status 404 ao informar um endereço incorreto', () => {});
});
