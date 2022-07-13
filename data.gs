const BinStatus = {
  IN_TRANSIT: 'In Transit',
  LOST: 'Lost',
  UNKNOWN: 'Unknown'
};

const Rows = {
  1:'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  10: 'J',
  11: 'K',
  12: 'L',
  13: 'M',
  14: 'N',
  15: 'O',
  16: 'P',
  17: 'Q',
  18: 'R',
  19: 'S',
  20: 'T',
  21: 'U',
  22: 'V',
  23: 'W',
  24: 'X',
  25: 'Y',
  26: 'Z'
};

class Bin {
  constructor(id, weight=0.0, status=BinStatus.IN_TRANSIT) {
    this.binId = id;
    this.binWeight = weight;
    this.binStatus = status;
  }

  static fromArray(array) {
    return new Bin(array[0], array[1], array[2]);
  }

  static fromObject(obj) {
    const {binId, binWeight = 0.0, binStatus = BinStatus.IN_TRANSIT} = obj;
    return new Bin(binId, binWeight, binStatus);
  }

  set weight(value) {
    if (value > 0) {
      this.binWeight = value;
    } else {
      this.binWeight = 0.0;
    }
  }

  set status(value) {
    if (BinStatus[value]) {
      this.binStatus = value;
    } else {
      this.binStatus = BinStatus.UNKNOWN;
    }
  }

  get id() {
    return this.binId;
  }

  set id(value) {
    this.binId = value;
  }

  get weight() {
    return this.binWeight;
  }

  get status() {
    return this.binStatus;
  }

  static get propertiesLength() {
    const data = new Bin(1);
    return data.toArray().length;
  }

  toString() {
    return `${this.binId}, ${this.binWeight}, ${this.binStatus}`;
  }

  toArray() {
    return [this.binId, this.binWeight, this.binStatus];
  }
}

// Testing function for ensuring class behaves as expected.
function testBinClass() {
  const bin = new Bin(1);
  Logger.log(bin.toArray());
}

const TaskStatus = {
  COMPLETED: 'Completed',
  UNCOMPLETED: 'Uncompleted'
};

class Task {
  constructor(id, description='No description', dateCreated=new Date(), status=TaskStatus.UNCOMPLETED) {
    this.taskId = id;
    this.taskDescription = description;
    this.createdOn = dateCreated;
    this.taskStatus = status;
    this.internId = -1;
  }

  static fromObject(obj) {
    const {taskId, taskDescription='No description', createdOn = new Date(), taskStatus=TaskStatus.UNCOMPLETED, internId = -1} = obj;
    const task = new Task(taskId, taskDescription, createdOn, taskStatus);
    if (internId !== -1) {
      task.status = internId;
    }
    return task;
  }

  static fromArray(array) {
    const task = new Task(array[0], array[1], array[2], array[3]);
    if (array[4] != -1) {
      task.intern = array[4];
    }
    return task;
  }

  static get propertiesLength() {
    const values = new Task(1);
    return values.toArray().length;
  }

  get id() {
    return this.taskId;
  }

  set id(value) {
    this.taskId = value;
  }

  set status(value) {
    if (TaskStatus[value]) {
      this.taskStatus = value;
    } else {
      this.taskStatus = TaskStatus.UNCOMPLETED;
    }
  }

  set description(value) {
    if (typeof(value) === 'string') {
      this.taskDescription = value;
    } else {
      this.taskDescription = String(value);
    }
  }

  get description() {
    return this.taskDescription;
  }

  set intern(internIdValue) {
    if (internIdValue < 0) {
      throw new Error('Intern id can\'t be negative');
    }
    this.internId = internIdValue;
  }

  get intern() {
    return this.internId;
  }

  get isAssigned() {
    return this.internId != -1;
  }

  toString() {
    return `Task Id: ${this.taskId}, Description: ${this.taskDescription}, Created: ${this.createdOn}, Status: ${this.taskStatus}, Intern Id: ${this.internId}`;
  }

  toArray() {
    return [this.taskId, this.taskDescription, this.createdOn, this.taskStatus, this.internId];
  }
}

class Intern {
  constructor(id, first='', last='') {
    this.internId = id;
    this.firstName = first;
    this.lastName = last;
    //this.tasks = [];
  }

  static fromObject(obj) {
    const {internId, firstName='', lastName = ''} = obj;
    return new Intern(internId, firstName, lastName);
  }

  get id() {
    return this.internId;
  }

  set id(value) {
    this.internId = value;
  }
  
  // /**
  //  * Can't claim a task that's already been claimed.
  //  * 
  //  * @param {Task} task the task to claim.
  //  */
  // claimTask(task) {
  //   if (task.intern == -1) {
  //     task.intern = this.internId;
  //     this.tasks.push(task);
  //   } 
  // }
  
  static get propertiesLength() {
    const intern = new Intern(1);
    return intern.toArray().length;
  }

  static fromArray(array) {
    return new Intern(array[0], array[1], array[2]);
  }

  toString() {
    return `Intern Id: ${this.internId}, First Name: ${this.firstName}, Last Name: ${this.lastName}`;
  }

  toArray() {
    return [this.internId, this.firstName, this.lastName]
  }

}

function testIntern() {
  const intern = new Intern(1, 'Enzo', 'Mayo');
  const task1 = new Task(1, 'Pick up bin 1');
  const task2 = new Task(2, 'Do thing');
  //intern.claimTask(task1);
  //intern.claimTask(task2);
  Logger.log(JSON.stringify(intern,0, 2));
  Logger.log('Size: ' + Intern.propertiesLength);
}
