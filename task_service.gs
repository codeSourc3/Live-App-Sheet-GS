class TaskListService {
  constructor() {
    this.taskRepo = new TaskListRepository();
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.putData = this.putData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getData(id, data) {
    if (!id) {
      return this.taskRepo.getData(null, data);
    } else {
      return this.taskRepo.getData(id, data);
    }
  }

  postData(id, data) {
    // Do not use id
    if (!id) {
      return this.taskRepo.postData(data.data);
    } else {
      return {error: `Can't have an id for a POST request.`};
    }
  }

  putData(id, data) {
    if (!id) {
      return {error: 'Must have an ID for a PUT request'};
    } else {
      return this.taskRepo.putData(Number(id), data.data);
    }
  }

  deleteData(id) {
    if (!id) {
      return {error: 'Must have an ID for a DELETE request'};
    } else {
      
      return this.taskRepo.deleteData(Number(id));
    }
  }
}

function testTaskService() {
  const service = new TaskListService();
  let results = service.deleteData(3);
  Logger.log(JSON.stringify(results, 0, 2));
}

function testTaskServiceGet() {
  const service = new TaskListService();
  let results = service.getData();
  Logger.log(JSON.stringify(results, 0, 2));
}

