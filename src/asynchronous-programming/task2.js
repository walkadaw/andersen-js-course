function parseJSON(jsonStr, success, failure) {
  try {
    const result = JSON.parse(jsonStr);
    success(result);
  } catch (error) {
    failure(error);
  }
}
function successCb(result) {
  console.log('Success parse!');
  console.log(result);
}

function failureCb(error) {
  console.log('Failure parse!');
  console.log(error);
}

parseJSON('{"x": 10}', successCb, failureCb);
parseJSON('{x}', successCb, failureCb);
