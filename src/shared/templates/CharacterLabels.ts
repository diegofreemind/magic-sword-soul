export const MageLabels = ({ attackProps, speedProps }: any) => {
  const { speedStrength, speedSkill } = speedProps;
  const { attackStrength, attackSkill, attackIntelligence } = attackProps;

  return {
    attack: `${attackStrength.percentage * 100}% da Força(${
      attackStrength.value * attackStrength.percentage
    }) + ${attackSkill.percentage * 100}% da Destreza(${
      attackSkill.value * attackSkill.percentage
    }) + ${attackIntelligence.percentage * 100}% da Inteligência(${
      attackIntelligence.value * attackIntelligence.percentage
    })`,
    speed: `${speedStrength.percentage * 100}% da Força(${
      speedStrength.value * speedStrength.percentage
    }) + ${speedSkill.percentage * 100}% da Destreza(${
      speedSkill.value * speedSkill.percentage
    })`,
  };
};

export const ThiefLabels = ({ attackProps, speedProps }: any) => {
  const { speedSkill } = speedProps;
  const { attackStrength, attackSkill, attackIntelligence } = attackProps;

  return {
    attack: `${attackStrength.percentage * 100}% da Força(${
      attackStrength.value * attackStrength.percentage
    }) + ${attackSkill.percentage * 100}% da Destreza(${
      attackSkill.value * attackSkill.percentage
    }) + ${attackIntelligence.percentage * 100}% da Inteligência(${
      attackIntelligence.value * attackIntelligence.percentage
    })`,
    speed: `${speedSkill.percentage * 100}% da Destreza(${
      speedSkill.value * speedSkill.percentage
    })`,
  };
};

export const WarriorLabels = ({ attackProps, speedProps }: any) => {
  const { speedSkill, speedIntelligence } = speedProps;
  const { attackStrength, attackSkill } = attackProps;

  return {
    attack: `${attackStrength.percentage * 100}% da Força(${
      attackStrength.value * attackStrength.percentage
    }) + ${attackSkill.percentage * 100}% da Destreza(${
      attackSkill.value * attackSkill.percentage
    })`,
    speed: `${speedSkill.percentage * 100}% da Destreza(${
      speedSkill.value * speedSkill.percentage
    }) + ${speedIntelligence.percentage * 100}% da Inteligência(${
      speedIntelligence.value * speedIntelligence.percentage
    })`,
  };
};
