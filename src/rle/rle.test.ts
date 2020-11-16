import * as rle from './rle';

describe('handling errors regarding bad data format', () => {
  it('should throw error when space found between text', () => {
    expect(() => {
      rle.decode('3A3B 4D');
    }).toThrow();
  });
  it('should throw error when text to encode not contains just only letters', () => {
    expect(() => {
      rle.encode('ABD1');
    }).toThrow();
  });
  it('should throw error when text to decode not contains just only letters & numbers', () => {
    expect(() => {
      rle.decode('ABD1$');
    }).toThrow();
  });
  it('should trim string and not throw eror', () => {
    expect(rle.decode(' 3A3B4D ')).toBe('AAABBBDDDD');
  });
});
describe('encoding', () => {
  it('should encode as expected', () => {
    expect(rle.encode('QQQTTTYYY')).toBe('3Q3T3Y');
  });
  it('should encode uppercase and lowercase well', () => {
    expect(rle.encode('ABBCCCdddDDD')).toBe('1A2B3C3d3D');
  });
});
describe('decoding', () => {
  it('should decode as expected', () => {
    expect(rle.decode('3Q3T3Y')).toBe('QQQTTTYYY');
  });
  it('should decode uppercase and lowercase well', () => {
    expect(rle.decode('1A2B3C3d3D')).toBe('ABBCCCdddDDD');
  });
  it('should throw an error if bad pattern is found while decoding', () => {
    expect(() => {
      rle.decode('1BB');
    }).toThrow();
  });
});
describe('decode and encode same data', () => {
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
