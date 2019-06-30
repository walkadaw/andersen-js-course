const listUrls = [
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
];

function parallelLoad(urls) {
  const data = urls.map(url => fetch(url).then(response => response.json()));

  Promise.all(data).then(result => console.log(result));
}

function sequentialLoad(urls) {
  const data = urls.reduce((acc, url) => {
    return acc.then(dataArray =>
      fetch(url)
        .then(response => response.json())
        .then(result => [...dataArray, result])
    );
  }, Promise.resolve([]));

  data.then(dataArray => {
    console.log(dataArray);
  });
}

parallelLoad(listUrls);
sequentialLoad(listUrls);
