class BinListRepository {
  constructor() {
    this.bin = Config.config.binSheet;
  }

  getData(id) {
    // if no id specified, get all rows
    if (!id) {
      const values = this.bin.getDataRange().getValues();
      let objects = [];
      for (let i = 1; i < values.length; i++) {
        objects.push(Bin.fromArray(values[i]));
      }

      return objects;
    } else {
      return Bin.fromArray(this.bin.getDataRange().getValues()[id]);
    }
  }

  postData(data) {
    if (Array.isArray(data)) {
      const bin = Bin.fromArray(data);
      bin.id = this.bin.getLastRow() + 1;
      this.bin.appendRow(bin.toArray());
    } else {
      let values;
      if (typeof(data) === 'string') {
        let json = JSON.parse(data);
        const bin = Bin.fromObject(json);
        bin.id = this.bin.getLastRow() + 1;
        values = bin.toArray();
      } else if (typeof(data) === 'object') {
        const bin = Bin.fromObject(data);
        bin.id = this.bin.getLastRow() + 1;
        values = bin.toArray();
      }
      // ensure too much data can't be appended.
      this.bin.appendRow(values);
    }
  }

  putData(id, data) {
    const range = `Bins!B${id+1}:${Rows[Bin.propertiesLength]}${id+1}`;
    
    // data has to be Object[][]
    if (id <= 0) {
      // could throw an Error instead.
      return {error: `${id} is less than or equal to 0`};
    } else {
      delete data['binId'];
      let values = Object.values(data);
      this.bin.getRange(range).setValues([values]);
      // make sure it actually set the values
      return {success: `Id: ${id} was updated`};
    }
  }

  deleteData(id) {
    this.bin.deleteRow(id+1);
    return {success: true};
  }
}
