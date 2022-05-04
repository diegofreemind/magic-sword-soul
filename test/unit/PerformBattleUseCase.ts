describe('F4 - Realizar o combate entre dois personagens', () => {
  test('Deve recalcular a velocidade no caso de empate');
  test('Deve garantir a ordem das jogadas com base na velocidade');
  test('Não devem ser persistidos os eventos de empate de velocidade');
  test('Não devem ser persistidos os pontos de vida menores do que 0');
  test('Deve atualizar os pontos de vida de um personagem ao concluir'); // TODO: interaction with inMemoryCharacter[]
});
