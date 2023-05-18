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
