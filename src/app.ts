import File from './file/file';
import { decode, encode } from './rle/rle';
import input from './input/input';

/**
 * Entry point to app, this IIFE process the input
 * @returns {void}
 */
(async (): Promise<void> => {
  const cliInput = input.getCliInput(process.argv.slice(2));
  const inputFile = new File(cliInput.filePath);

  const fileData = await inputFile.getData();
  const isDecode = cliInput.option.d;

  if (isDecode) {
    const decodedData = decode(fileData);
    inputFile.pipeToNewFile(decodedData);
  } else {
    const encodedData = encode(fileData);
    inputFile.pipeToNewFile(encodedData);
  }
})().catch((error) => {
  console.error(error.message);
});
