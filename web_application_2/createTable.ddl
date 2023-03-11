CREATE TABLE `books` (
  id int UNSIGNED NOT NULL DEFAULT '0', /* 主キー */
  created_at datetime NOT NULL DEFAULT '1000-01-01 00:00:00', /* レコード作成日 */
  updated_at datetime NOT NULL DEFAULT '1000-01-01 00:00:00', /* レコード更新日 */
  book_title varchar(100) NOT NULL DEFAULT ' ', /* 本のタイトル */
  book_genre varchar(50) NOT NULL DEFAULT ' ', /* 本のジャンル */
  bought_at datetime NOT NULL DEFAULT '1000-01-01 00:00:00', /* 購入日 */
  buyer varchar(50) NOT NULL DEFAULT ' ', /* 購入者 */
  review varchar(400) NOT NULL DEFAULT ' ', /* レビュー */
  PRIMARY KEY (`id`)
);
