import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import csvAsTable from '../../utils/csvAsTable/csvAsTable';

export default async function registerCsvAsTable(): Promise<void> {

	// Import CSV Dialog Configuration
	const dialogs = joplin.views.dialogs;
	const importCsvDialog = await dialogs.create('importCsvDialog');
	await dialogs.setHtml(importCsvDialog, `
		<form name="hiddenForm" id="hiddenForm">
			<input type="hidden" name="hiddenInput" id="hiddenInput">
		</form>
		<label>Select CSV File: </label>
		<input id="importCsvAsTable" onChange="importCsv(this)" type="file" accept=".csv" />
	`);
	await dialogs.setButtons(importCsvDialog, [
		{
			id: 'ok',
		},
		{
			id: 'cancel',
		},
	]);
	await dialogs.addScript(importCsvDialog, './register/csvAsTable/importCsv.js');
	

    // Respective command for button
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
				let data = await dialogs.open(importCsvDialog);
				const csv = data.formData.hiddenForm.hiddenInput;
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