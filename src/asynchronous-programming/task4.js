const urlIsGetData = 'http://www.json-generator.com/api/json/get/cfQCylRjuG';
const urlUsersData = 'http://www.json-generator.com/api/json/get/cfVGucaXPC';

function getUsers() {
  fetch(urlIsGetData)
    .then(response => response.json())
    .then(({ getUsersData }) => {
      if (getUsersData) {
        fetch(urlUsersData)
          .then(response => response.json())
          .then(result => console.log(result));
      }
    });
}

getUsers();
