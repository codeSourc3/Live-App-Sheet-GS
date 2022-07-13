function route(method, path, data) {
  const routes = Routes();
  //Logger.log(routes);
  if (!path) return {error: 'You will have to be a bit more specific...'};
  const routingPath = path.split('/');
  if (!routes[routingPath[0]]) return {error: 'That route does not exist.', routingPath: routingPath};
  try {
    //Logger.log('Before returning: ' + routes[routingPath[0]][method + 'Data'](routingPath[1], {data: data, path: path}));
    //Logger.log('Routing to resource: ' + routes[routingPath[0]]);
    return routes[routingPath[0]][method+ 'Data'](routingPath[1], {data: data, path: path});
  } catch (e) {
    Logger.log('Routing failed: ' + e);
    return e;
  }
}

function testGetInternsRoute() {
  const result = route('get', 'interns', null);
  
  Logger.log('Result from Get Interns Route: ' + result);
}

function testGetBinsRoute() {
  const result = route('get', 'bins', {});
  Logger.log('Result from Get Bins Route: ' + result);
}

function testGetTasksRoute() {
  const result = route('get', 'tasks', null);
  Logger.log(Array.isArray(result));
  Logger.log('Result from testGetTasksRoute: ' + result);
}
