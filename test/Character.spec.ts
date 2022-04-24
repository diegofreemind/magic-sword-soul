import Warrior from '../src/Warrior';

test('Deve criar um novo personagem do tipo Warrior', () => {
  const warrior = new Warrior('Gusmng Thyeks');
  expect(warrior).toBeInstanceOf(Warrior);

  expect(warrior.getLife).toBe(20);
  expect(warrior.getSkill).toBe(5);
  expect(warrior.getStrength).toBe(10);
  expect(warrior.getIntelligence).toBe(5);
});
