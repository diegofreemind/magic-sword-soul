import Warrior from '../../src/entities/Warrior';
import Thief from '../../src/entities/Thief';
import Mage from '../../src/entities/Mage';

describe('Validações sobre as entidades de personagens', () => {
  test('Deve instanciar um objeto da classe Warrior', () => {
    // TODO: create a factory for characters
    const warrior = new Warrior('Gusmng Thyeks');
    expect(warrior).toBeInstanceOf(Warrior);

    expect(warrior.getLife).toBe(20);
    expect(warrior.getSkill).toBe(5);
    expect(warrior.getStrength).toBe(10);
    expect(warrior.getIntelligence).toBe(5);
    expect(warrior.getName).toBe('Gusmng Thyeks');
    expect(warrior.getProfession).toBe('warrior');
  });

  test('Warrior Attack: 80% da Força + 20% da Destreza', () => {
    const warrior = new Warrior('Gusmng Thyeks');
    expect(warrior.attack()).toBe(9);
  });

  test('Warrior Speed: 60% da Destreza + 20% da Inteligência', () => {
    const warrior = new Warrior('Gusmng Thyeks');
    expect(warrior.speed()).toBe(4);
  });

  test('Deve instanciar um objeto da classe Thief', () => {
    // TODO: create a factory for characters
    const thief = new Thief('Fkmaas Ghetryn');
    expect(thief).toBeInstanceOf(Thief);

    expect(thief.getLife).toBe(15);
    expect(thief.getSkill).toBe(10);
    expect(thief.getStrength).toBe(4);
    expect(thief.getIntelligence).toBe(4);
    expect(thief.getName).toBe('Fkmaas Ghetryn');
    expect(thief.getProfession).toBe('thief');
  });

  test('Thief Attack: 25% da Força + 100% da Destreza + 25% da Inteligência', () => {
    const thief = new Thief('Fkmaas Ghetryn');
    expect(thief.attack()).toBe(12);
  });

  test('Thief Speed: 80% da Destreza', () => {
    const thief = new Thief('Fkmaas Ghetryn');
    expect(thief.speed()).toBe(8);
  });

  test('Deve instanciar um objeto da classe Mage', () => {
    // TODO: create a factory for characters
    const mage = new Mage('Dangalf Musy');
    expect(mage).toBeInstanceOf(Mage);

    expect(mage.getLife).toBe(12);
    expect(mage.getSkill).toBe(6);
    expect(mage.getStrength).toBe(5);
    expect(mage.getIntelligence).toBe(10);
    expect(mage.getName).toBe('Dangalf Musy');
    expect(mage.getProfession).toBe('mage');
  });

  test('Mage Attack: 20% da Força + 50% da Destreza + 150% da Inteligência', () => {
    const mage = new Mage('Dangalf Musy');
    expect(mage.attack()).toBe(19);
  });

  test('Mage Speed: 20% da Força + 50% da Destreza', () => {
    const mage = new Mage('Dangalf Musy');
    expect(mage.speed()).toBe(4);
  });
});
