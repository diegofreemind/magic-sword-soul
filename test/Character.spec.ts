import Warrior from '../src/Warrior';
import Thief from '../src/Thief';

test('Deve instanciar um objeto da classe Warrior', () => {
  const warrior = new Warrior('Gusmng Thyeks');
  expect(warrior).toBeInstanceOf(Warrior);

  expect(warrior.getLife).toBe(20);
  expect(warrior.getSkill).toBe(5);
  expect(warrior.getStrength).toBe(10);
  expect(warrior.getIntelligence).toBe(5);
});

test('Deve instanciar um objeto da classe Thief', () => {
  const thief = new Thief('Fkmaas Ghetryn');
  expect(thief).toBeInstanceOf(Thief);

  expect(thief.getLife).toBe(15);
  expect(thief.getSkill).toBe(10);
  expect(thief.getStrength).toBe(4);
  expect(thief.getIntelligence).toBe(4);
});
