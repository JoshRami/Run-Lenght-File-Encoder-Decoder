import File from './file';

describe('Instantiating a File class', () => {
  it('should throw error when invalid file', () => {
    expect(() => new File('invalid')).toThrow();
  });

  it('should handle in directory path', () => {
    expect(new File('.prettierrc').filePath).toBe('.prettierrc');
  });

  it('should handle absolute path', () => {
    expect(
      new File(
        'C:\\Users\\LosQuinteros\\Desktop\\Trainee\\Week2\\rle\\.prettierrc',
      ).filePath,
    ).toBe(
      'C:\\Users\\LosQuinteros\\Desktop\\Trainee\\Week2\\rle\\.prettierrc',
    );
  });
});
