import Chance from 'chance';
import { characterRepository } from '../useCases/CreateCharacter';
import { Professions, CharacterStatus } from '../shared/enums/Character';
import CharacterFactory from '../useCases/CreateCharacter/CharacterFactory';

const chanceGenerator = new Chance();

export function buildCharacter(status?: CharacterStatus) {
  const { characterName, characterStatus, characterProfession } =
    genCharacterInfo();

  return CharacterFactory.create({
    name: characterName,
    profession: characterProfession,
    status: !status ? characterStatus : status,
  });
}

export function genCharacterInfo() {
  const characterName = chanceGenerator
    .name({ nationality: 'en' })
    .split(' ')
    .join('_');

  const characterTypes = Object.values(Professions);
  const statusTypes = Object.values(CharacterStatus);

  const characterStatus = getRandomItem(statusTypes);
  const characterProfession = getRandomItem(characterTypes);

  return { characterName, characterStatus, characterProfession };
}

export function getRandomItem(collection: Array<any>) {
  return collection[Math.floor(Math.random() * collection.length)];
}

export async function generateCharacters(quantity: number) {
  console.log(`Auto generating ${quantity} characters`);
  for (let x = 0; x < quantity; x++) {
    const p = buildCharacter();
    await characterRepository.save(p);
  }

  // const generated = await characterRepository.find({});
  // console.log('Available Characters: \n', generated);
}
