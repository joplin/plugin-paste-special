async function importCsv (file) {
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(file.value.toLowerCase())) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('hiddenInput').value = reader.result.toString();
        }
        reader.readAsText(file.files[0]);
        console.info(file.files[0]);
    } else {
        console.info("Please upload a valid CSV file.");
    }
    return;
}
