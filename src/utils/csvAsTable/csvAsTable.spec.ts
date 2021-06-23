
import { mocked } from 'ts-jest/utils'
import csvAsTable from './csvAsTable';
import { parse } from 'papaparse';
var csvToMarkdown = require('csv-to-markdown-table/lib/CsvToMarkdown.js');

jest.mock('./csvAsTable')
const mockedCsvAsTable = mocked(csvAsTable, true)

test('csvToMarkdown', () => {
  const result = csvToMarkdown("abc\tbcd\tcde", "\t", false);
  expect(result).toBe("|     |     |     | \n|-----|-----|-----| \n| abc | bcd | cde | \n");
})

test('papaparse', () => {
    var results = parse("abc, bcd, cde", { 
        header: true,
        complete: (results) => {
            return results;
        },
        error: (err) => {
            return err;
        }
    });
    expect(results.data[0]).toBe(["abc", "bcd", "cde"]);
})