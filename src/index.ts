import joplin from 'api';
import registerCsvAsTable from './register/csvAsTable/registerCsvAsTable';

joplin.plugins.register({
	onStart: async function() {
		console.info('Paste Special plugin started!');
		
		// Register the menu items of Paste Special with views here
		await registerCsvAsTable();
	}
});