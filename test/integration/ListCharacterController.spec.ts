import request from 'supertest';
import app from '../../src/index';

describe('Listagem de personagens', () => {
  describe('GET /character', () => {
    test('Deve retornar o status 200 ao informar paramêtros de busca', async () => {
      const result = await request(app).get('/character').query({
        status: 'dead',
      });

      expect(result.statusCode).toEqual(200);
      expect(result.body).toBeInstanceOf(Array);
    });

    test('Deve retornar o status 200 ao não informar paramêtros de busca', async () => {
      const result = await request(app).get('/character');

      expect(result.statusCode).toEqual(200);
      expect(result.body).toBeInstanceOf(Array);
    });

    test('Deve retornar o status 400 ao informar parametros incorretos', async () => {
      const result = await request(app).get('/character').query({
        name: undefined,
        status: 'CharacterStatus.Alive',
      });

      expect(result.statusCode).toEqual(400);
    });
  });
});
