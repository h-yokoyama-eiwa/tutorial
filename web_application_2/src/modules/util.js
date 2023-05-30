/**
 * 日付（文字列）のフォーマットを変換
 * YYYY-MM-DD hh:mm:ss ⇒ YYYY-MM-DD
 * @param {String} day
 * @returns {String}
 */
export const changeDateFormat = (day) => {
  return day.substring(0, 10)
}

/**
 * 本日日付を取得（YYYY-MM-DD）
 * @returns {String}
 */
export const getToday = () => {
  const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString()
  return changeDateFormat(today)
}
