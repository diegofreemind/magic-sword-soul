import Warrior from '../src/Warrior';
import Thief from '../src/Thief';
import Mage from '../src/Mage';

test('Deve instanciar um objeto da classe Warrior', () => {
  // TODO: create a factory for characters
  const warrior = new Warrior('Gusmng Thyeks');
  expect(warrior).toBeInstanceOf(Warrior);

  expect(warrior.getLife).toBe(20);
  expect(warrior.getSkill).toBe(5);
  expect(warrior.getStrength).toBe(10);
  expect(warrior.getIntelligence).toBe(5);
});

test('Deve instanciar um objeto da classe Thief', () => {
  // TODO: create a factory for characters
  const thief = new Thief('Fkmaas Ghetryn');
  expect(thief).toBeInstanceOf(Thief);

  expect(thief.getLife).toBe(15);
  expect(thief.getSkill).toBe(10);
  expect(thief.getStrength).toBe(4);
  expect(thief.getIntelligence).toBe(4);
});

test('Deve instanciar um objeto da classe Mage', () => {
  // TODO: create a factory for characters
  const mage = new Mage('Dangalf Musy');
  expect(mage).toBeInstanceOf(Mage);

  expect(mage.getLife).toBe(12);
  expect(mage.getSkill).toBe(6);
  expect(mage.getStrength).toBe(5);
  expect(mage.getIntelligence).toBe(10);
});
