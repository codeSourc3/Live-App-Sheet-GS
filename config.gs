class Config {

  
  constructor() {
    this._spreadSheetId = '1Wbed6JQ6H7A9HLYMj-UzfTKC6LErLxr9zUwyTADnR18';
    this._spreadSheet = SpreadsheetApp.openById(this._spreadSheetId);
    let localThis = this;
    this.sheetFiles = {
      INTERNS: localThis.spreadSheet.getSheetByName('Interns'),
      BINS: localThis.spreadSheet.getSheetByName('Bins'),
      TASKS: localThis.spreadSheet.getSheetByName('Tasks')
    };
  }

  static getConfig() {
    return new Config();
  }

  get spreadSheet() {
    return this._spreadSheet;
  }

  get internSheet() {
    return this.sheetFiles.INTERNS;
  }

  get binSheet() {
    return this.sheetFiles.BINS;
  }

  get taskSheet() {
    return this.sheetFiles.TASKS;
  }
}
/*
function Config() {
  const spreadSheetId = '1Wbed6JQ6H7A9HLYMj-UzfTKC6LErLxr9zUwyTADnR18';

}
*/
Config.config = new Config();
//Config.spreadSheetId = '1Wbed6JQ6H7A9HLYMj-UzfTKC6LErLxr9zUwyTADnR18';
