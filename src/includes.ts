import { equals } from './equals';
import { isString } from './guards';
import { purry } from './purry';

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
