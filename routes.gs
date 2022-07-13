/*
Script containing all the routes
@author Enzo Mayo
*/
function Routes() {
  const internListService = new InternListService();
  const binListService = new BinListService();
  const taskListService = new TaskListService();
  return {
    interns: {
      'getData': internListService.getData,
      'postData': internListService.postData,
      'putData' : internListService.putData,
      'deleteData': internListService.deleteData
    },
    bins: {
      'getData': binListService.getData,
      'postData': binListService.postData,
      'putData': binListService.putData,
      'deleteData': binListService.deleteData
    },
    tasks: {
      'getData': taskListService.getData,
      'postData': taskListService.postData,
      'putData': taskListService.putData,
      'deleteData': taskListService.deleteData
    }
  };
}

function testRoutes() {
  const routes = Routes();
  Logger.log(routes.interns.getData());
}
