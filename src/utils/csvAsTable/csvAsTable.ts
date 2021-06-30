import { parse } from 'papaparse';
const csvToMarkdown = require('./csvToMarkdown');

const parseCsv = (csv) => {
	let parsedCsv = undefined;
	parse(csv, {
		header: true,
		complete: (results) => {
			if(!results?.errors?.length) {
				parsedCsv = results.data;
			}
		},
		error: (err) => {
			console.info("PapaParse err: ", err[0]?.message);
		}
	});

	return parsedCsv;
}

export const convertCsvToMarkdown = (csv) => {
	let mdTable: string;
	mdTable = csvToMarkdown(csv.toString(), ',', true);
	return mdTable;
}

export async function csvAsTable (csv: string) {
	let mdTable: string, parsedCsv: string;

	parsedCsv =  parseCsv(csv);

	if(!parsedCsv) {
		console.error("Use proper formatted CSV!");
		return;
	}

	mdTable = convertCsvToMarkdown(csv);
	return mdTable;
}