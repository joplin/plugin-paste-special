import { parse } from 'papaparse';
import { csvToMarkdown } from 'csv-to-markdown-table/lib/CsvToMarkdown';

export default function csvAsTable(mode) {
	console.info('csvAsaTable');
	let csv, mdTable;

	if(mode === 'paste') {
		// const clipboardData = await joplin.clipboard.readText()
		const clipboardData = csv;
		const readClipboardData = () => {};
		
		// if file, not found
		if(!clipboardData?.length) return;
	}

	if(mode === 'import') {
		csv = "CONTENT TYPE,TITLE,ABBR,ISSN,e-ISSN\nJournals,ACM Computing Surveys ,ACM Comput. Surv.,0360-0300,1557-7341\nJournals,ACM Journal of Computer Documentation ,ACM J. Comput. Doc.,1527-6805,1557-9441\nJournals,ACM Journal on Emerging Technologies in Computing Systems ,J. Emerg. Technol. Comput. Syst.,1550-4832,1550-4840\nJournals,Journal of Data and Information Quality ,J. Data and Information Quality,1936-1955,1936-1963\n"
	}

	let parsedCsv;

	parse(csv, {
		header: true,
		complete: (results) => {
			parsedCsv = results.data;
			console.info("results: ", parsedCsv);
		},
		error: (err) => {
			console.err("PapaParse err: ", err);
		}
	});

	console.info("parsedCSV:" ,parsedCsv);
	mdTable = csvToMarkdown(parsedCsv, ',', 'true');
	console.info("mdTable: ", mdTable);

	return mdTable;
}