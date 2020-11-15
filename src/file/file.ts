import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export default class File {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = this.getValidFilePath(filePath);
  }

  /**
   * Returns a Promise<string> that resolves with file data.
   * @param {string} name - A name.
   */
  async getData(): Promise<string> {
    try {
      const data: Buffer = await readFile(this.filePath);
      return data.toString('utf-8');
    } catch (error) {
      throw new Error('rle: something bad happened while getting data');
    }
  }

  /**
   * Returns a Promise<void> create a new file and pipe data to it.
   * @param {string} fileData - Data to pipe - it'll be encode or decode data.
   * @returns {Promise<void>}
   */
  async pipeToNewFile(fileData: string): Promise<void> {
    const newFilePath = await this.createEmptyFile();
    const readStream = fs.createWriteStream(newFilePath);
    readStream.write(fileData);
  }

  /**
   * Returns a string that represent sanitized and checked filePath class member.
   * @param {string} filePath -filePath class member.
   * @param {true} [writable] -optional arg, to check if file be written
   * @returns {string} -sanitized filePath class member
   */
  private getValidFilePath(filePath: string, writable?: true): string {
    const permissions = [fs.constants.F_OK, fs.constants.R_OK];
    if (writable) {
      permissions.push(fs.constants.W_OK);
    }
    try {
      fs.accessSync(filePath, ...permissions);
      return filePath;
    } catch (error) {
      throw new Error(`rle: no such file or does not have enough permmissions`);
    }
  }

  /**
   * Returns a string that represent new file path wich will contain rle proccess result
   * directory is taken from file path class member and it's name is: new_[filename] .
   * @returns {Promise<string>} -new filePath
   */
  private async createEmptyFile(): Promise<string> {
    try {
      const fileName = path.basename(this.filePath);
      const directory = this.filePath.replace(fileName, '');

      const newFileName = `new_${fileName}`;
      const newFilePath = path.join(directory, newFileName);

      fs.closeSync(fs.openSync(newFilePath, 'w'));
      return newFilePath;
    } catch (error) {
      throw Error('rle: Something bad happened while making a new file');
    }
  }
}
