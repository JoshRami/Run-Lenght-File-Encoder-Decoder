import * as yargs from 'yargs';

type Option = { e: boolean; d: boolean };
interface Input {
  filePath: string;
  option: Option;
}
/**
 * Returns input from cli proccess, check and sanitize it
 * @param {cliInput} string[] - Expect to receive process argv prop
 * @returns {Input} - Return Input type wich has a clean structure
 */
const getCliInput = (cliInput: string[]): Input => {
  const input = yargs(cliInput)
    .option('e', {
      alias: 'encode',
      describe: 'encode the file',
      type: 'boolean',
      default: false,
    })
    .option('d', {
      alias: 'decode',
      describe: 'decode the file',
      type: 'boolean',
      default: false,
    })
    .check((argv) => {
      const encodeOption = argv.e;
      const decodeOption = argv.d;
      if (encodeOption && decodeOption) {
        throw new Error('rle: arguments -e and -d are mutually exclusive');
      } else if (!(encodeOption || decodeOption)) {
        throw new Error(
          'rle: You have not especified a encode or decode flag ',
        );
      }
      return true;
    })
    .demandCommand(1, 'rle: must especified a file path')
    .help('filePath -option [encode|decode]').argv;
  return { filePath: input._[0], option: { e: input.e, d: input.d } };
};
export default { getCliInput };
