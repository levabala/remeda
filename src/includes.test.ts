import { includes } from './includes';

describe('includes', function () {
  it('returns true if an element is in a list', function () {
    expect(includes([1, 2, 3, 9, 8, 7, 100, 200, 300], 7)).toEqual(true);
  });

  it('returns false if an element is not in a list', function () {
    expect(includes([1, 2, 3, 9, 8, 7, 100, 200, 300], 99)).toEqual(false);
  });

  it('returns false for the empty list', function () {
    expect(includes([], 1)).toEqual(false);
  });

  it('has R.equals semantics', function () {
    expect(
      includes([[{ a: 'a' }, { b: 'b' }]], [{ a: 'a' }, { b: 'b' }])
    ).toEqual(true);
    expect(
      includes([[{ a: 'a' }, { b: 'b' }]], [{ a: 'a' }, { b: 'c' }])
    ).toEqual(false);
    expect(includes([NaN], NaN)).toEqual(true);
  });

  it('returns true if substring is part of string', function () {
    expect(includes('banana', 'ba')).toEqual(true);
  });

  it('throws an error if a source is string but an item is not ("any" case)', function () {
    // @ts-expect-error -- cannot find object in string
    expect(() => includes('banana', { a: 'a' })).toThrow(
      new TypeError('item must be string if source is string')
    );
    // @ts-expect-error -- cannot find number in string
    expect(() => includes('123', 1)).toThrow(
      new TypeError('item must be string if source is string')
    );
    expect(includes('123', '1')).toEqual(true);
  });
});
