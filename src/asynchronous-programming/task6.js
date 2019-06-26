const errorText = 'Ошибка';
function getResolvedPromise(value) {
  return Promise.resolve(value);
}
getResolvedPromise(500)
  .then(value => {
    if (value > 300) {
      throw errorText;
    }
  })
  .catch(error => console.log(error))
  .finally(() => console.log('This is Finally!'));

export default getResolvedPromise;
