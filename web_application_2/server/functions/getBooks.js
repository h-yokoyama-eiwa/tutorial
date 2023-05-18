/**
 * booksテーブルから書籍情報を取得する。
 * @returns {object} books
 */
export default function getBooks () {
  const gpcConnection = Jdbc.getCloudSqlConnection(GPC_URL, GPC_USER_NAME, GPC_PASSWORD);
  const gpcStatement = gpcConnection.createStatement();
  const sqlResults = gpcStatement.executeQuery('SELECT * FROM books'); 

  const books = [];

  while (sqlResults.next()) {
    const book = {}
    book.id = sqlResults.getInt('id');
    book.createdAt = sqlResults.getString('created_at');
    book.updatedAt = sqlResults.getString('updated_at');
    book.title = sqlResults.getString('book_title');
    book.genre = sqlResults.getString('book_genre');
    book.boughtAt = sqlResults.getString('bought_at');
    book.buyer = sqlResults.getString('buyer');
    book.review = sqlResults.getString('review');

    books.push(book);
  }

  // デバッグ用ログ出力
  Logger.log(books);

  sqlResults.close();
  gpcStatement.close();
  gpcConnection.close();

  return books;
}
