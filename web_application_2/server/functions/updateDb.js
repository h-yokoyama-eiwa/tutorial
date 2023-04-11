/**
 * DBへ書籍情報を登録する。
 * @param {object} book 
 */
export default function updateDb (book) {
  // GPCの接続情報
  const GPC_CONNECTION_NAME = 'esm-gcp-study:us-central1:modern-study'; //Instance_connection_name
  const GPC_USER_NAME = 'esm'; //user_name
  const GPC_PASSWORD = 'esm'; //'user_password'
  const GPC_DATABASE_NAME = 'web_book_h-yokoyama-eiwa'; //database_name
  const GPC_URL = 'jdbc:google:mysql://' + GPC_CONNECTION_NAME + '/' + GPC_DATABASE_NAME;
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);

  // レコード更新用SQL
  const updateSql = `
    INSERT INTO counts (
      id,
      created_at,
      updated_at,
      book_title,
      book_genre,
      bought_at,
      buyer,
      review)
      values (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)
      ON DUPLICATE KEY UPDATE
        updated_at = VALUES(updated_at),
        book_title = VALUES(book_title),
        book_genre = VALUES(book_genre),
        bought_at = VALUES(bought_at),
        buyer = VALUES(buyer),
        review = VALUES(review)`;

  // SQLステートメント
  const gpcStatement = gpcConnection.prepareStatement(updateSql);

  // 処理時点の日時
  const date = new Date();

  //日付のフォーマット変換
  const currentTime = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy-MM-dd kk:mm:ss')
  const boughtAt = Utilities.formatDate( book.boughtAt, 'Asia/Tokyo', 'yyyy-MM-dd kk:mm:ss')

  // SQLに値を設定
  gpcStatement.setInt(1, book.id);
  gpcStatement.setString(2, currentTime);
  gpcStatement.setString(3, currentTime);
  gpcStatement.setString(4, book.title);
  gpcStatement.setString(5, book.genre);
  gpcStatement.setString(6, boughtAt);
  gpcStatement.setString(7, book.buyer);
  gpcStatement.setString(8, book.review);

  // デバッグ用ログ出力
  const sqlResults = gpcStatement.executeUpdate();
  Logger.log(sqlResults);

  gpcStatement.close();
  gpcConnection.close();

}
