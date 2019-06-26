function foo(x, cb) {
  if (x > 10) {
    console.log('x > 10');
    cb();
  } else {
    console.log('x <= 10');
  }
}

function createCb(str) {
  return () => console.log(str);
}

foo(15, createCb('cb'));
foo(5, createCb('cb'));
