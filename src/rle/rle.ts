export const encode = (data: string): string => {
  const sanitizedData: string[] = data.trim().split('');

  let repetitions = 1;
  return sanitizedData.reduce(
    (acc: string, current: string, currentIndex: number, data: string[]) => {
      if (current === data[currentIndex + 1]) {
        repetitions += 1;
        return acc;
      } else {
        const encode = `${repetitions}${current}`;
        repetitions = 1;
        return acc.concat(encode);
      }
    },
    '',
  );
};

export const decode = (data: string): string => {
  const space = ' ';
  const splitRegex = new RegExp(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+)?|\.[0-9]+/g);
  const sanitizedData = data.trim();

  if (sanitizedData.includes(space)) {
    throw new Error('rle: encoded text cannot include space');
  }
  const encodedUnits: string[] = sanitizedData.match(splitRegex);

  return encodedUnits.reduce((acc: string, unit: string, index: number) => {
    const letter = encodedUnits[index + 1];
    const repetitions = Number(unit);
    if (index === encodedUnits.length - 1 || index % 2 === 1) {
      return acc;
    }
    if (letter.length > 1) {
      throw new Error('rle: Bad encoded format');
    }
    const encodedUnit = letter.repeat(repetitions);

    return acc.concat(encodedUnit);
  }, '');
};
