/**
 * Encodes a chunk of data into run length encoding format
 * @param {data} string - Receive chunk of data, no space and only letters
 * @returns {string} - return rle encoded data
 */
export const encode = (data: string): string => {
  const sanitizedData: string[] = getSanitizedData(data, 'encode').split('');

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

/**
 * Decodes run length encoding chunk of data
 * @param {data} string - rle encoded data, no espace and only letter & number
 * @returns {string} - return decoded data
 */
export const decode = (data: string): string => {
  const sanitizedData = getSanitizedData(data, 'decode');

  const splitRegex = new RegExp(/[a-zA-Z]+|[0-9]+(?:\.[0-9]+)?|\.[0-9]+/g);
  const encodedUnits: string[] = sanitizedData.match(splitRegex);

  return encodedUnits.reduce((acc: string, unit: string, index: number) => {
    const isLastElement = index === encodedUnits.length - 1;
    const isLetter = index % 2 === 1;

    if (isLastElement) {
      if (!acc) {
        throw new Error('rle: data to decode appears to be already decode');
      }
      return acc;
    } else if (isLetter) {
      return acc;
    }

    const letter = encodedUnits[index + 1];
    const repetitions = Number(unit);

    if (letter.length > 1 || isNaN(repetitions)) {
      throw new Error('rle: Bad encoded format');
    }

    const encodedUnit = letter.repeat(repetitions);
    return acc.concat(encodedUnit);
  }, '');
};

type option = 'encode' | 'decode';

/**
 * Trim incoming data and check for invalid format depending the option
 * @param {data} string - Incoming data from input file
 * @param {action} option - Option type wich can be decode or decode
 *                          depending on option passed, especific validation will check
 * @returns {string} - return sanitized data
 */
const getSanitizedData = (data: string, action: option): string => {
  const sanitizedData = data.trim();
  const space = ' ';
  if (sanitizedData.includes(space)) {
    throw new Error('rle: text cannot include space between');
  }

  if (action === 'encode') {
    const onlyLetters = new RegExp(/^[a-zA-Z]+$/);
    if (!onlyLetters.test(sanitizedData)) {
      throw new Error('rle: text can includes just letters while encoding');
    }
  } else if (action === 'decode') {
    const onlyLetterNumber = new RegExp(/^[0-9a-zA-Z]+$/);
    if (!onlyLetterNumber.test(sanitizedData)) {
      throw new Error(
        'rle: text can includes just letters & numbers while decoding',
      );
    }
  }

  return sanitizedData;
};
