/**
 * DBから書籍情報を削除する。
 * @param {object} book
 */
export default function deleteBook (book) {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.prepareStatement('DELETE FROM books WHERE id=?');

  gpcStatement.setInt(1, book.id);
  const sqlResults = gpcStatement.executeUpdate();

  // デバッグ用ログ出力
  Logger.log(sqlResults);

  gpcStatement.close();
  gpcConnection.close();
}
