const asyncBar = async () => 'Some string!';

async function foo() {
  console.log(await asyncBar());
}

foo();

// function fooThen() {
//   asyncBar().then(value => console.log(value));
// }
// fooThen();
