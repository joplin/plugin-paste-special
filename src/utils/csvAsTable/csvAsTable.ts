import csvToMarkdown from './csvToMarkdown';
import { parse } from 'papaparse';

export const convertCsvToMarkdown = (csv) => {
	const mdTable = csvToMarkdown(csv.toString(), ',', true);
	console.info(mdTable);
	return mdTable;

}

export const parseCsv = (csv) => {
	let parsedCsv: any;

	parse(csv, {
		header: true,
		complete: (results) => {
			parsedCsv = results.data;
			console.info("results: ", parsedCsv);
		},
		error: (err) => {
			console.info("PapaParse err: ", err);
		}
	});

	return parsedCsv;
}

const csvAsTable = (mode: any) => {
	let csv: string;

	if(mode === 'paste') {
		// const clipboardData = await joplin.clipboard.readText()
		const clipboardData = csv;
		const readClipboardData = () => {};
		
		// if file, not found
		if(!clipboardData) return;
	}

	if(mode === 'import') {
		csv =`CONTENT TYPE,TITLE,ABBR,ISSN,e-ISSN\nJournals,ACM Computing Surveys ,ACM Comput. Surv.,0360-0300,1557-7341\nJournals,ACM Journal of Computer Documentation ,ACM J. Comput. Doc.,1527-6805,1557-9441\nJournals,ACM Journal on Emerging Technologies in Computing Systems ,J. Emerg. Technol. Comput. Syst.,1550-4832,1550-4840\nJournals,Journal of Data and Information Quality ,J. Data and Information Quality,1936-1955,1936-1963`;
	}

	let parsedCsv =  parseCsv(csv);

	if(!parsedCsv) {
		alert("Use proper formatted CSV!");
		return;
	}

	const mdTable = convertCsvToMarkdown(csv);
	return mdTable;
}

export default csvAsTable;