export const MageLabels = ({ strength, skill, intelligence }: any) => {
  return {
    attack: `20% da Força(${strength * 0.2}) + 50% da Destreza(${
      skill * 0.5
    }) + 150% da Inteligência(${intelligence * 1.5})`,
    speed: `20% da Força(${strength * 0.2}) + 50% da Destreza(${skill * 0.5})`,
  };
};

export const ThiefLabels = ({ strength, skill, intelligence }: any) => {
  return {
    attack: `25% da Força(${
      strength * 0.25
    }) + 100% da Destreza(${skill}) + 25% da Inteligência(${
      intelligence * 0.25
    })`,
    speed: `80% da Destreza(${skill * 0.8})`,
  };
};

export const WarriorLabels = ({ strength, skill, intelligence }: any) => {
  return {
    attack: `80% da Força(${strength * 0.8}) + 20% da Destreza(${skill * 0.2})`,
    speed: `60% da Destreza(${skill * 0.6}) + 20% da Inteligência(${
      intelligence * 0.2
    })`,
  };
};
