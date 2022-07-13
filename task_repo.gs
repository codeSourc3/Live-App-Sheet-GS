class TaskListRepository {
  constructor() {
    this.sheet = Config.config.taskSheet;
  }

  getData(id) {
    if (!id) {
      // convert Object[][] to Task[].
      const values = this.sheet.getDataRange().getValues();
      let objects = [];
      for (let i = 1; i < values.length; i++) {
        Logger.log("Row " + (i) + ": " + values[i]);
        const object = Task.fromArray(values[i]);
        objects.push(object);
      }
      return objects;
    } else {
      return Task.fromArray(this.sheet.getDataRange().getValues()[id]);
    }
  }

  postData(data) {
    if (Array.isArray(data)) {
      const task = Task.fromArray(data);
      task.id = this.sheet.getLastRow() + 1;
      this.sheet.appendRow(task.toArray());
    } else {
      let values;
      if (typeof(data) === 'string') {
        let obj = JSON.parse(data);
        let task = Task.fromObject(obj);
        task.id = this.sheet.getLastRow() + 1;
        values = task.toArray();
      } else if (typeof(data) === 'object') {
        let task = Task.fromObject(data);
        task.id = this.sheet.getLastRow() + 1;
        values = task.toArray();
      }
      // ensure too much data can't be appended.
      this.sheet.appendRow(values);
    }
  }

  putData(id, data) {
    // TODO: add validation
    const range = `Tasks!B${id+1}:${Rows[Task.propertiesLength]}${id+1}`;
    // data has to be Object[][]
    if (id <= 0) {
      // could throw an Error instead.
      return {error: `${id} is less than or equal to 0`};
    } else {
      delete data['taskId'];
      let values = Object.values(data);
      this.sheet.getRange(range).setValues([values]);
      // make sure it actually set the values
      return {success: `Id: ${id} was updated`};
    }
  }

  deleteData(id) {
    // TODO: add validation
    this.sheet.deleteRow(id + 1);
    return {success: `Row ${id} was deleted`};
  }
}

const formatJson = (data) => {
  return JSON.stringify(data, 0, 2);
};

function testTaskRepositoryListCRUD() {
  const repo = new TaskListRepository();
  Logger.log(`Get all: ${testTaskRepositoryListGetAll(repo)}`);
  Logger.log(`Get by id (1) ${testTaskRepositoryListGetById(repo)}`);
  Logger.log('Post: ' + testTaskRepositoryListPost(repo));
  Logger.log('Put: ' + testTaskRepositoryListPut(repo));
  Logger.log('Delete: ' + testTaskRepositoryListDelete(repo));
}

function testTaskRepositoryListGetAll(repo=new TaskListRepository()) {
  Logger.log(formatJson(repo.getData()))
  return repo.getData();
}

function testTaskRepositoryListGetById_(repo=new TaskListRepository()) {
  const id = 1;
  return repo.getData(id);
}

function testTaskRepositoryListPost_(repo=new TaskListRepository()) {
  const date = new Date();
  date.setFullYear(2003);
  date.setMonth(4);
  date.setDate(15);
  // Post data
  const data = new Task(3, '3rd Task', date);
  return repo.postData(data);
}

function testTaskRepositoryListPut_(repo = new TaskListRepository()) {
  const id = 3;
  
  const data = new Task(id, '3rd Task modified by PUT');
  data.status = TaskStatus.COMPLETED;

  return repo.putData(id, data);
}

function testTaskRepositoryListDelete(repo = new TaskListRepository()) {
  const id = 3;
  return repo.deleteData(id);
}

function testTaskListRepoPut() {
  const repo = new TaskListRepository();
  Logger.log(Task.propertiesLength);
  const obj = JSON.parse('{"taskId":"3","taskDescription":"No Description","internId":"-1","createdOn":"2021-03-14T03:52:31.582Z"}');
  Logger.log(repo.putData(3, obj));
}
