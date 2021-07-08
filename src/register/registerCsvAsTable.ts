import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import csvAsTable from '../utils/csvAsTable/csvAsTable';

export default async function registerCsvAsTable(): Promise<void> {
    // Respective command for main button
		await joplin.commands.register({
            name: 'pasteCsvAsTable',
            label: 'CSV as Table',
            execute: async () => {
				let csv: string = await (joplin as any).clipboard.readText();
				// if clipboard data, not found
				if(!csv?.length) return;
				csv = csv.trim();
				const pasteCsvAsTable = await csvAsTable(csv);
				await joplin.commands.execute("insertText", pasteCsvAsTable);
				await joplin.commands.execute('editor.focus');
			}
		});
		await joplin.commands.register({
            name: 'importCsvAsTable',
            label: 'CSV as Table',
            execute: async () => {
				const csv =`CONTENT TYPE,TITLE,ABBR,ISSN,e-ISSN\nJournals,ACM Computing Surveys ,ACM Comput. Surv.,0360-0300,1557-7341\nJournals,ACM Journal of Computer Documentation ,ACM J. Comput. Doc.,1527-6805,1557-9441\nJournals,ACM Journal on Emerging Technologies in Computing Systems ,J. Emerg. Technol. Comput. Syst.,1550-4832,1550-4840\nJournals,Journal of Data and Information Quality ,J. Data and Information Quality,1936-1955,1936-1963`;
				const importCsvAsTable = await csvAsTable(csv);
				await joplin.commands.execute("insertText", importCsvAsTable);
				await joplin.commands.execute('editor.focus');
			}
		}); 

		// For creating menu items under Edit Menubar item and Folder Context menu.
		await joplin.views.menus.create('pasteSpecial', 'Paste Special', [
			{
				label: "CSV as Table",
				commandName: "pasteCsvAsTable"
			}
		], MenuItemLocation.Edit);
		await joplin.views.menus.create('importSpecial', 'Import Special', [
			{
				label: "CSV as Table",
				commandName: "importCsvAsTable"
			}
		], MenuItemLocation.Edit);
}