<script>
/**
 * 本日日付を取得（YYYY-MM-DD）
 * @returns {String} today
 */
export function getToday () {
  return (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
}

/**
 * 日付（文字列）のフォーマットを変換
 * YYYY-MM-DD hh:mm:ss ⇒ YYYY-MM-DD
 * @param {String} day
 * @returns {String}
 */
export function changeDateFormat (day) {
  return day.substring(0, 10)
}
</script>
