/**
 * Реализовать функцию createGenerator в этом файле, и экспортировать ее.
 *
 * При каждом вызове метода .next() происходит возврат следующего значения из массива
 * Когда все элементы будут возвращены,
 * следующие вызовы метода .next() должны возвращать строку 'Complete!'
 *
 * const generator = createGenerator([1, '6', 3, 2]);
 * generator.next(); -> 1
 * generator.next(); -> '6'
 * generator.next(); -> 3
 * generator.next(); -> 2
 * generator.next(); -> 'Complete!'
 * generator.next(); -> 'Complete!'
 */

export function createGenerator(arr) {
  let index = 0;

  return {
    next() {
      let result = 'Complete!';

      if (index < arr.length) {
        result = arr[index];
        index += 1;
      }

      return result;
    },
  };
}

export function createGeneratorTwo(arr) {
  // Реализация через генератор
  // const arrayGenerator = (function*() {
  //   yield* arr;
  // })();
  const arrayGenerator = arr[Symbol.iterator]();

  return {
    next() {
      const { done, value } = arrayGenerator.next();
      return done ? 'Complete!' : value;
    },
  };
}
