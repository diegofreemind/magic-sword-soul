import request from 'supertest';
import app from '../../src/index';

describe('Detalhes de personagem', () => {
  describe('GET /character/:id', () => {
    test(`Deve retornar o status 200 ao informar o id`, async () => {
      const preset = await request(app).post('/character').send({
        name: 'Gusnmg_Hujn',
        profession: 'warrior',
      });

      const result = await request(app).get('/character/' + preset.body.id);

      expect(result.statusCode).toEqual(200);
      expect(result.body).toHaveProperty('character');
      expect(result.body?.character).toMatchObject(preset.body);
    });

    test('Deve retornar o status 400 ao informar parametros incorretos', async () => {
      const result = await request(app).get(
        '/character/ff6c1a7a-$%&#-425b-*()((-366157097358'
      );

      expect(result.statusCode).toEqual(400);
    });

    test('Deve retornar o status 404 ao informar um id desconhecido', async () => {
      const result = await request(app).get(
        '/character/ff6c1a7a-52f7-425b-a7be-366157097348'
      );

      expect(result.statusCode).toEqual(404);
    });
  });
});
