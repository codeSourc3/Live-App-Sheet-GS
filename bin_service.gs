class BinListService {
  constructor() {
    this.binRepo = new BinListRepository();
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.putData = this.putData.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  getData(id, data) {
    if (!id) {
      return this.binRepo.getData(null, data);
    } else {
      return this.binRepo.getData(id, data);
    }
  }

  postData(id, data) {
    // Do not use id
    if (!id) {
      return this.binRepo.postData(data.data);
    } else {
      return {error: `Can't have an id for a POST request.`};
    }
  }

  putData(id, data) {
    if (!id) {
      return {error: 'Must have an ID for a PUT request'};
    } else {
      return this.binRepo.putData(Number(id), data.data);
    }
  }

  deleteData(id, data) {
    if (!id) {
      return {error: 'Must have an ID for a DELETE request'};
    } else {
      return this.binRepo.deleteData(id);
    }
  }
}
