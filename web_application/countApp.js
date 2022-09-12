// スプレッドシートのID
const SPREAD_SHEET_ID = '1n672n5k3wzB11tifyqdI2DtwUKsiTdlnwX1GARHZNYk'

// main関数
function doGet() {
	const template = HtmlService.createTemplateFromFile('index');
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
	const sheet = spreadSheet.getSheetByName('saveCount');
	const sheetRange = sheet.getRange('A1');
  const displayValue = sheetRange.getValue();

	template.value = displayValue;
	
	return template.evaluate();
}

// カウントをスプレッドシートに保存する関数
function saveCountToSpreadsheet(saveValue) {
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
	const sheet = spreadSheet.getSheetByName('saveCount');
	const sheetRange = sheet.getRange('A1');
	sheetRange.setValue(saveValue);
}

// カウントをスプレッドシートから取得する関数
function getCountFromSpreadsheet() {
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
	const sheet = spreadSheet.getSheetByName('saveCount');
	const sheetRange = sheet.getRange('A1');

	return sheetRange.getValue();
}
