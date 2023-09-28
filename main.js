function doGet() {
  const template = HtmlService.createTemplateFromFile('index');
  return template.evaluate();
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
