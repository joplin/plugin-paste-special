import { convertCsvToMarkdown, csvAsTable } from '../../src/utils/csvAsTable/csvAsTable';

test('check if conversion of csv return expected output', async () => {
  let testCase = 'abc,bcd,cde';
  const result = await convertCsvToMarkdown(testCase);
  expect(result).toBe("| abc | bcd | cde | \n|-----|-----|-----| \n");
});


test('check if default export returns expected output', async () => {
  let testCase = 'abc,bcd,cde';
  const result = await csvAsTable(testCase);
  expect(result).toBe("| abc | bcd | cde | \n|-----|-----|-----| \n");
});


