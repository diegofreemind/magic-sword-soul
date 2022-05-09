import request from 'supertest';
import app from '../../src/index';

describe('Execução de uma batalha', () => {
  describe.only('POST /battle', () => {
    test('Deve retornar o status code 201 ao informar os dados corretos', async () => {
      const responseOne = await request(app).post('/character').send({
        name: 'playerOne_name',
        profession: 'warrior',
      });

      const responseTwo = await request(app).post('/character').send({
        name: 'playerTwo_name',
        profession: 'thief',
      });

      expect(responseOne.body).toHaveProperty('id');
      const playerOne = responseOne.body;

      expect(responseTwo.body).toHaveProperty('id');
      const playerTwo = responseTwo.body;

      const result = await request(app)
        .post('/battle')
        .send({
          players: [playerOne.id, playerTwo.id],
        });

      expect(result.statusCode).toEqual(201);
      expect(result.body).toHaveProperty('id');
      expect(result.body).toHaveProperty('status');
      expect(result.body).toHaveProperty('players');
    });

    test('Deve retornar o status code 400 ao informar os dados incorretos', async () => {
      const result = await request(app).post('/battle').send({
        name: 'Gusnmg_Hujn',
        profession: 'witcher',
      });

      expect(result.statusCode).toEqual(400);
    });

    test('Deve retornar o status code 404 ao informar o endereço incorreto', async () => {
      const result = await request(app).post('/').send({
        name: 'Gusnmg_Hujn',
        profession: 'witcher',
      });

      expect(result.statusCode).toEqual(404);
    });
  });
});
