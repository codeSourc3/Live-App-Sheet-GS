class InternListRepository {
  constructor() {
    this.intern = Config.config.internSheet;
  }
  /**
   * 
   */
  getData(id) {
    
    if (!id) {
      const values = this.intern.getDataRange().getValues();
      let objects = [];
      for (let i = 1; i < values.length; i++) {
        objects.push(Intern.fromArray(values[i]));
      }
      return objects;
    } else {
      return Intern.fromArray(this.intern.getDataRange().getValues()[id]);
    }
    
    //return {data: 'Data from InternListRepository'};
  }

  postData(data) {
    if (Array.isArray(data)) {
      const intern = Intern.fromArray(data);
      intern.id = this.intern.getLastRow() + 1;
      this.intern.appendRow(intern.toArray());
    } else {
      let values = [];
      if (typeof(data) === 'string') {
        let obj = JSON.parse(data);
        let intern = Intern.fromObject(obj);
        intern.id = this.intern.getLastRow() + 1;
        Logger.log('From String: ' + intern);
        values = intern.toArray();
      } else if (typeof(data) === 'object') {
        let intern = Intern.fromObject(data);
        intern.id = this.intern.getLastRow() + 1;
        Logger.log('From object: ' + intern);
        values = intern.toArray();
      } else {
        return {success: false};
      }
      Logger.log('Data: ' + values);
      // ensure too much data can't be appended.
      this.intern.appendRow(values);
    }
    return {success: true};
  }

  putData(id, data) {
    const range = `Interns!B${id+1}:${Rows[Intern.propertiesLength]}${id+1}`;
    // data has to be Object[][]
    if (id < 1) {
      // could throw an Error instead.
      return {error: `${id} is less than 1`};
    } else {
      delete data['internId'];
      let values = Object.values(data);
      this.intern.getRange(range).setValues([values]);
      // make sure it actually set the values
      return {success: `Id: ${id} was updated`};
    }
  }

  deleteData(id) {
    this.intern.deleteRow(id+1);
    return {success: true};
  }
}

function testInternListRepository() {
  const repo = new InternListRepository();
  Logger.log(repo.getData());
  repo.getData();
  Logger.log(Intern.propertiesLength);
}

function testInternListRepositoryPut() {
  const repo = new InternListRepository();
  Logger.log(repo.putData(3, {taskId: 3, taskDescription: 'Altered', taskStatus: TaskStatus.UNCOMPLETED, internId: 1}))
}
