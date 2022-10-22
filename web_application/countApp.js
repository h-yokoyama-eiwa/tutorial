// スプレッドシートのID
const SPREAD_SHEET_ID = '1n672n5k3wzB11tifyqdI2DtwUKsiTdlnwX1GARHZNYk'

// GPCの接続情報
const GPC_CONNECTION_NAME = 'esm-gcp-study:us-central1:modern-study'; //Instance_connection_name
const GPC_USER_NAME = 'esm'; //user_name
const GPC_PASSWORD = 'esm'; //'user_password'
const GPC_DATABASE_NAME = 'web_counter_h-yokoyama-eiwa'; //database_name
const GPC_URL = 'jdbc:google:mysql://' + GPC_CONNECTION_NAME + '/' + GPC_DATABASE_NAME;

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

// GPCから値を取得する関数
function getCountFromGpc() {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, PGC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.createStatement();
  const sqlResults = gpcStatement.executeQuery('SELECT * FROM counts'); 
  
  while (sqlResults.next()) {
    const id = sqlResults.getInt('id');
    const createdAt = sqlResults.getString('created_at');
    const updatedAt = sqlResults.getString('updated_at');
    const count = sqlResults.getInt('count');
    
		// 次回ここから下を修正する2022.10.22
    Logger.log('%s t %s t %s', id, createdAt, updatedAt, count);
  }

  results.close();
  statement.close();
  connection.close();
}
