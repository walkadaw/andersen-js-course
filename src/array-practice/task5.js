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

export function createGenerator( arr ){
	let index = 0;

	return {
		next() {
			return console.log(
				index < arr.length ? 
					arr[index++] : 
					"Complete!"
				);
		}
	}
}

/*
* Не получилось решить таким методом. Можно ли как то указать дефолтное значение для yield->value 
*/ 
// export function *createGenerator( arr ){

// 	yield* arr;

// 	return "Complete!";
// }