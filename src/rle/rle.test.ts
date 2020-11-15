import * as rle from './rle';

describe('Decode and encode same data', () => {
  it('should encode a decode the same data', () => {
    const encoded = rle.encode(
      'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW',
    );
    const decoded = rle.decode('12W1B12W3B24W1B14W');
    expect(encoded).toBe('12W1B12W3B24W1B14W');
    expect(decoded).toBe(
      'WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW',
    );
  });
});
describe('Decode data', () => {
  it('should throw an error if empty space while decoding', () => {
    expect(() => {
      rle.decode('3A3B 4D');
    }).toThrow();
  });
  it('should throw error when space found between text while decoding', () => {
    expect(() => {
      rle.decode('3A3B 4D');
    }).toThrow();
  });
  it('should trim string and not throw eror', () => {
    expect(rle.decode(' 3A3B4D ')).toBe('AAABBBDDDD');
  });
});
