import File from './file/file';
import { decode, encode } from './rle/rle';
import input from './input/input';

/**
 * Entry point to app, this IIFE process the input
 * @returns {void}
 */
(async (): Promise<void> => {
  const { filePath, option } = input.getCliInput(process.argv.slice(2));
  const inputFile = new File(filePath);

  const fileData = await inputFile.getData();
  const { d, e } = option;

  if (d) {
    const decodedData = decode(fileData);
    inputFile.pipeToNewFile(decodedData);
  } else if (e) {
    const encodedData = encode(fileData);
    inputFile.pipeToNewFile(encodedData);
  }
})()
  .then(() => {
    console.log('rle: process already complete, please review your new file!');
  })
  .catch((error) => {
    console.error(error.message);
  });
