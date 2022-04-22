/* eslint-disable global-require */

const {
  describe, expect, test,
} = global;

describe('Unit tests for fs.js', () => {
  test('Unit test readFile', async () => {
    const fs = require('fs');
    jest.mock('fs');
    const expected = 'I read that file';
    fs.readFileSync.mockReturnValue(expected);

    const { readFile } = require('./fs');
    const fileContent = readFile('filename.txt');

    expect(fs.readFileSync).toHaveBeenCalled();
    expect(fileContent).toBe(expected);
  });
});
