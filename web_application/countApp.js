// main関数
function doGet() {
	return HtmlService.createTemplateFromFile('index').evaluate();
}

// カウントをスプレッドシートに保存する関数
function saveCountToSpreadsheet(saveValue) {
	const spreadSheet = SpreadsheetApp.openById('1n672n5k3wzB11tifyqdI2DtwUKsiTdlnwX1GARHZNYk');
	const sheet = spreadSheet.getSheetByName('saveCount');
	const sheetRange = sheet.getRange('A1');
	sheetRange.setValue(saveValue);
}
