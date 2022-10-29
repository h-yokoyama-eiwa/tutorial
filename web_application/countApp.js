// スプレッドシートのID
const SPREAD_SHEET_ID = '1n672n5k3wzB11tifyqdI2DtwUKsiTdlnwX1GARHZNYk'

// GPCの接続情報
// データベース接続名
const GPC_CONNECTION_NAME = 'esm-gcp-study:us-central1:modern-study'; //Instance_connection_name
// ユーザー名
const GPC_USER_NAME = 'esm'; //user_name
// パスワード
const GPC_PASSWORD = 'esm'; //'user_password'
// データベース名
const GPC_DATABASE_NAME = 'web_counter_h-yokoyama-eiwa'; //database_name
// データベース接続URL
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

// GPCのテーブルにレコードを追加する関数
function insertRecordToGpc(saveValue) {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.prepareStatement('INSERT INTO counts (id, created_at, updated_at, count) values (?, ?, ?, ?)');

	const date = new Date();
	const currentTime = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy-MM-dd kk:mm:ss')
	gpcStatement.setInt(1, 1);
	gpcStatement.setString(2, currentTime);
	gpcStatement.setString(3, currentTime);
	gpcStatement.setInt(4, saveValue);
	const sqlResults = gpcStatement.executeUpdate();

	Logger.log(sqlResults);
  
  gpcStatement.close();
  gpcConnection.close();
}

// 2022.10.29間違えて値を取得する関数を作り始めてしまったので中断
// GPCのテーブルから値を取得する関数
function getCountFromGpc() {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, PGC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.createStatement();
  const sqlResults = gpcStatement.executeQuery('SELECT * FROM counts'); 
  
  while (sqlResults.next()) {
    const id = sqlResults.getInt('id');
    const createdAt = sqlResults.getString('created_at');
    const updatedAt = sqlResults.getString('updated_at');
    const count = sqlResults.getInt('count');

		// 中断位置（↓ここから）
		Logger.log('%s t %s t %s', id, createdAt, updatedAt, count);
  }

  results.close();
  statement.close();
  connection.close();
}

// GPCのテーブルからレコードを削除する関数（テスト用）
function deleteRecordFromGpc() {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.prepareStatement('DELETE FROM counts WHERE id=?');

	gpcStatement.setInt(1, 1);
	const sqlResults = gpcStatement.executeUpdate();

	Logger.log(sqlResults);
  
  gpcStatement.close();
  gpcConnection.close();
}
