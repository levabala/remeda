import { equals } from './equals';
import { isString } from './guards';
import { purry } from './purry';

/**
 * Returns true if the specified value is equal, in R.equals terms,
 * to at least one element of the given list; false otherwise. Works also with strings.
 *
 * @param source the array
 * @param item the value to test
 *    // TODO: need to provide @signature?
 * @example
 *    R.includes({ a: 1, b: 2 }, 1) // => true
 *    R.includes([1, 2, 3, 4], 3) // => true
 *    R.includes('some text', 'ex') // => true
 *
 *    // TODO: add R.pipe example
 * @data_first
 * @pipeable
 * @category Array
 * @category String
 *    // TODO: check if multiple categories are supported
 */
export function includes(source: string, item: string): boolean;
export function includes<T>(source: T[], item: T): boolean;
export function includes<T>(item: T): (source: T[]) => boolean;
export function includes(item: string): (source: string) => boolean;

export function includes() {
  return purry(_includes, arguments);
}

function _includes<T>(source: string | T[], item: string | T): boolean {
  if (isString(source)) {
    if (!isString(item)) {
      throw new TypeError('item must be string if source is string');
    }

    return _includesString(source, item);
  } else {
    // assuming source is Array
    return _includesArray(source, item);
  }
}

function _includesString(stringMain: string, stringSub: string): boolean {
  return stringMain.includes(stringSub);
}

function _includesArray<T>(source: T[], item: T): boolean {
  return source.some(v => equals(v, item));
}
