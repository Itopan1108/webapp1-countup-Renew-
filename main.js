function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
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
