import { parseCsv, convertCsvToMarkdown } from './../../utils/csvAsTable/csvAsTable';

test('csvToMarkdown', () => {
  const result = convertCsvToMarkdown("abc\tbcd\tcde");
  expect(result).toBe("|     |     |     | \n|-----|-----|-----| \n| abc | bcd | cde | \n");
})

test('papaparse', () => {
    var results = parseCsv("abc, bcd, cde");
    expect(results).toBe([["abc", "bcd", "cde"]]);
})