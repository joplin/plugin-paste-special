import { parse } from 'papaparse';

const parseCsv = async (csv: string) => {
	let parsedCsv: [] = undefined;
	await parse(csv, {
		complete: (results) => {
			if(results?.data) {
				parsedCsv = results.data;
			}
		},
		error: (err) => {
			console.info("PapaParse err: ", err[0]?.message);
		}
	});
	
	return parsedCsv;
}

const csvToMarkdown = (parsedCsv: any[]): string => {
	// remove pipes and backslashes
	parsedCsv.forEach((rows, i) => {
		rows.forEach((e,j) => {
			parsedCsv[i][j] = e.replace(/[|\\]/g,'');
		});
	})

	const header = parsedCsv[0];
	const rows = parsedCsv.slice(1);
	let mdTable: string;

	mdTable = `| ${header.join(" | ")} | `;
	mdTable = mdTable.concat(`\n| ${header.map(_ => "---").join(" | ")} | `);

	if(rows.length) {
		rows.forEach(row => {
				mdTable = mdTable.concat(`\n| ${row.map(e=> e).join(" | ")} | `);
		});
	}
  	return mdTable;
}

export default async function csvAsTable (csv: string) {
	let mdTable: string, parsedCsv: [];

	parsedCsv = await parseCsv(csv);
	mdTable = csvToMarkdown(parsedCsv);

	return mdTable;
}