import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { csvAsTable } from './utils/csvAsTable/csvAsTable';

joplin.plugins.register({
	onStart: async function() {
		// Respective command for main button
		await joplin.commands.register({
            name: 'pasteCsvAsTable',
            label: 'CSV as Table',
            execute: async () => {
				const pasteCsvAsTable = await csvAsTable('paste');
				await joplin.commands.execute("insertText", pasteCsvAsTable);
				await joplin.commands.execute('editor.focus');
			}
		});
		await joplin.commands.register({
            name: 'importCsvAsTable',
            label: 'CSV as Table',
            execute: async () => {
				const importCsvAsTable = await csvAsTable('import');
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
	},
});