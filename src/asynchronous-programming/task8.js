const getUsers = url => fetch(url);

async function foo(url) {
  try {
    const response = await getUsers(url);
    const [user] = await response.json();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

foo('https://jsonplaceholder.typicode.com/users');
foo('tps://jsonplaceholder.typicode.com/users');
