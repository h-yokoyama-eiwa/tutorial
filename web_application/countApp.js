// スプレッドシートのIDです。
const SPREAD_SHEET_ID = '1n672n5k3wzB11tifyqdI2DtwUKsiTdlnwX1GARHZNYk'

// GPCの接続情報
// GPCのデータベース接続名です。
const GPC_CONNECTION_NAME = 'esm-gcp-study:us-central1:modern-study'; //Instance_connection_name

// GPCのユーザー名です。
const GPC_USER_NAME = 'esm'; //user_name

// GPCのパスワードです。
const GPC_PASSWORD = 'esm'; //'user_password'

// GPCのデータベース名です。
const GPC_DATABASE_NAME = 'web_counter_h-yokoyama-eiwa'; //database_name

// GPCのデータベース接続URLです。
const GPC_URL = 'jdbc:google:mysql://' + GPC_CONNECTION_NAME + '/' + GPC_DATABASE_NAME;

// main関数
function doGet() {
	// ブラウザへ表示するHTMLのテンプレートです。
	const template = HtmlService.createTemplateFromFile('index');

	// 処理対象のスプレッドシートです。
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);

	// 処理対象のシートです。
	const sheet = spreadSheet.getSheetByName('saveCount');

	// 処理対象のセルです。
	const sheetRange = sheet.getRange('A1');

	// スプレッドシートから取得した値です。
	const displayValue = sheetRange.getValue();

	template.value = displayValue;
	
	return template.evaluate();
}

/**
 * カウントをスプレッドシートに保存します。
 * @param {number} saveValue 
 */
function saveCountToSpreadsheet(saveValue) {
	// 処理対象のスプレッドシートです。
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);

	// 処理対象のシートです。
	const sheet = spreadSheet.getSheetByName('saveCount');

	// 処理対象のセルです。
	const sheetRange = sheet.getRange('A1');

	sheetRange.setValue(saveValue);
}

/**
 * カウントをスプレッドシートから取得します。
 * @returns {number}
 */
function getCountFromSpreadsheet() {
	// 処理対象のスプレッドシートです。
	const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);

	// 処理対象のシートです。
	const sheet = spreadSheet.getSheetByName('saveCount');

	// 処理対象のセルです。
	const sheetRange = sheet.getRange('A1');

	return sheetRange.getValue();
}

/**
 * GPCのテーブルにレコードを追加または更新します。
 * @param {number} saveValue 
 */
function saveCountToGpc(saveValue) {
	// gpcの接続コネクションです。
	const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);
	
	// レコード更新用SQLです。
	const updateSql = `
		INSERT INTO counts (
			id,
			created_at,
			updated_at,
			count)
			values (
				?,
				?,
				?,
				?)
			ON DUPLICATE KEY UPDATE
				updated_at = VALUES(updated_at),
				count = VALUES(count)`;

	// SQLステートメントです。
	const gpcStatement = gpcConnection.prepareStatement(updateSql);

	// 処理時点の日時です。
	const date = new Date();

	// 処理時点の日時（フォーマット変換後）です。
	const currentTime = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy-MM-dd kk:mm:ss')
	
	// SQLに値を設定する。
	gpcStatement.setInt(1, 1);
	gpcStatement.setString(2, currentTime);
	gpcStatement.setString(3, currentTime);
	gpcStatement.setInt(4, saveValue);

	// デバッグ用ログ出力
	const sqlResults = gpcStatement.executeUpdate();
	Logger.log(sqlResults);
	
	gpcStatement.close();
	gpcConnection.close();
}
	
// // 2022.10.29間違えて値を取得する関数を作り始めてしまったので中断
// // GPCのテーブルから値を取得する関数
// function getCountFromGpc() {
// 	const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, PGC_USER_NAME, GPC_PASSWORD);
// 	const gpcStatement = gpcConnection.createStatement();
// 	const sqlResults = gpcStatement.executeQuery('SELECT * FROM counts'); 

// 	while (sqlResults.next()) {
// 		const id = sqlResults.getInt('id');
// 		const createdAt = sqlResults.getString('created_at');
// 		const updatedAt = sqlResults.getString('updated_at');
// 		const count = sqlResults.getInt('count');

// 		// 中断位置（↓ここから）
// 		Logger.log('%s t %s t %s', id, createdAt, updatedAt, count);
// 	}

// 	results.close();
// 	statement.close();
// 	connection.close();
// }

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
