//const config = Config.getConfig();
// ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);

// ?q={tableInLowerCase}/{id}&action={action}




function doGet(e) {
  const result = route('get', e.parameter['q']);
  return respond(JSON.stringify(result, 0, 2));
}

function respond(response) {
  return ContentService.createTextOutput(response).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  Logger.log(e);
  const result = handleWrite_(e);
  //console.log('doPost', JSON.stringify(e));
  const response = JSON.stringify(result);
  return respondWithText(response);
}

function respondWithText(response) {
  return ContentService.createTextOutput(response);
}

function handleWrite_(e) {
  const contents = JSON.parse(e.postData.contents);
  Logger.log('Contents: ' + JSON.stringify(contents, 0, 2));
  let result;
  switch (e.parameter['action']) {
    case 'post': 
    result = route('post', e.parameter['q'], contents); 
    break;
    case 'put': 
      result = route('put', e.parameter['q'], contents); 
      break;
    case 'delete':
      result = route('delete', e.parameter['q'], contents);
      break;

    default:
      result = {error: `${e.parameter['action']} is not a valid action`};
  }
  Logger.log('Result from handleWrite: ' + JSON.stringify(result, 0, 2));
  return result;
}

function testWrite() {
  const json = JSON.stringify(new Intern(4, 'Jameson', 'Jones'));
  let error = handleWrite_({
    postData: {
      contents: json
    }, 
    parameter: {
      q: 'interns',
      action: 'post'
    }
  });
  Logger.log(JSON.stringify(error, 0, 2));
}

function testPost() {
  const json = JSON.stringify(new Intern(4, 'Jameson', 'Jones'));
  let error = {
    postData: {
      contents: json
    }, 
    parameter: {
      q: 'interns',
      action: 'post'
    }
  };
  const result = doPost(error);
  Logger.log('Is Post successful? ' + result);
}




