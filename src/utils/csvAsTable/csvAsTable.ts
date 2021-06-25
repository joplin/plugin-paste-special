import joplin from 'api';
import { parse } from 'papaparse';
const csvToMarkdown = require('./csvToMarkdown');

export const convertCsvToMarkdown = (csv) => {
	let mdTable: string;
	mdTable = csvToMarkdown(csv.toString(), ',', true);
	return mdTable;
}

export const parseCsv = (csv) => {
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

export async function csvAsTable (mode: string): Promise<void> {
	let csv, mdTable, parsedCsv: string;

	if(mode === 'paste') {
		csv = await (joplin as any).clipboard.readText();
		// if clipboard data, not found
		if(!csv?.length) return;
	}

	if(mode === 'import') {
		csv =`CONTENT TYPE,TITLE,ABBR,ISSN,e-ISSN\nJournals,ACM Computing Surveys ,ACM Comput. Surv.,0360-0300,1557-7341\nJournals,ACM Journal of Computer Documentation ,ACM J. Comput. Doc.,1527-6805,1557-9441\nJournals,ACM Journal on Emerging Technologies in Computing Systems ,J. Emerg. Technol. Comput. Syst.,1550-4832,1550-4840\nJournals,Journal of Data and Information Quality ,J. Data and Information Quality,1936-1955,1936-1963`;
	}

	parsedCsv =  parseCsv(csv);

	if(!parsedCsv) {
		console.error("Use proper formatted CSV!");
		return;
	}

	mdTable = convertCsvToMarkdown(csv);
	return mdTable;
}