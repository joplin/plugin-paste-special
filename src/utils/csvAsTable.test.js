var assert = require('assert');
import * as Papa from 'papaparse';
import { csvToMarkdown } from 'csv-to-markdown-table/lib/CsvToMarkdown';

describe('csvToMarkdown', function () {
    it('should return a table with no headers', function () {
		var result = csvToMarkdown("abc\tbcd\tcde", "\t", false);
		expect(result).toBe("|     |     |     | \n|-----|-----|-----| \n| abc | bcd | cde | \n");
	});
});

describe('papaParse', function () {
    it('should return a this ', function () {
		var results = Papa.parse("abc, bcd, cde", { 
            header: true,
            complete: (results) => {
                return results;
            },
            error: (err) => {
                return err;
            }
        });
		expect(results.data[0]).toBe(["abc", "bcd", "cde"]);
	});
});

