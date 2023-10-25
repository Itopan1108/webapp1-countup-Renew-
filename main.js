 function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
   htmlOutput.setTitle('★カウントアップ★');
   return htmlOutput;
 }  
 
 function getSheetData() {
   const spreadsheet = SpreadsheetApp.openById('10GkWRFS8PaaOk8r0YBU7P5xu4oyLSpUJH196g5j-REs');
   const sheet = spreadsheet.getSheetByName('シート1');
   const range = sheet.getRange('B2');
   // １つ以上のセル（今回は１つのセル）の値を取得
   const value = range.getValue();
   // シートから取得した値を画面に渡す 
   return value;
 }
 
 function setSheetData(Value) {
   // 1. スプレッドシートを特定して取得
   const spreadsheet = SpreadsheetApp.openById("10GkWRFS8PaaOk8r0YBU7P5xu4oyLSpUJH196g5j-REs");
   // 2. シートを特定して取得
   const sheet = spreadsheet.getSheetByName('シート1');
   // 3. セル（範囲）を特定して取得
   const range = sheet.getRange('B2')
   range.setValue(Value);
 }

//（ＤＢ接続 部分）

 const connectionName = PropertiesService.getScriptProperties().getProperty("connectionName");
 const userName = PropertiesService.getScriptProperties().getProperty("userName");
 const password = PropertiesService.getScriptProperties().getProperty("password");
 const databaseName = PropertiesService.getScriptProperties().getProperty("databaseName");
 const url = PropertiesService.getScriptProperties().getProperty("url");
 

   //（４－６ DBから値を取得する関数）

 function readFromTable() {
   const connection = Jdbc.getCloudSqlConnection(url, userName, password);
   const statement = connection.createStatement();
   const result = statement.executeQuery('SELECT * FROM countup2');
   while (result.next()) {
    const countNumber = result.getInt('count_number');
    Logger.log(countNumber);
    
    if(countNumber.isEmpty()){
     return ZERO;
    }
    else {
     return countNumber ;   
    }
   }

   result.close();
   statement.close();
   connection.close();
 }

  //（４－５ DBに値を更新する関数）

 function updateRecord(count) {
   const connection = Jdbc.getCloudSqlConnection(url, userName, password);
   const statement = connection.prepareStatement('INSERT INTO countup2 (id, count_number) values (?, ?)  ON DUPLICATE KEY UPDATE count_number = ?');
   statement.setInt(1, 1);
   statement.setInt(2, count);
   statement.setInt(3, count);

   const row = statement.executeUpdate();
   Logger.log(row);

   statement.close();
   connection.close();
 }
