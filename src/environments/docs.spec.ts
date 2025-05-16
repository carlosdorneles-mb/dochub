import {docs} from './docs';

describe('environment IDs', () => {
  it('should not have duplicated IDs', () => {
    const ids = docs.map(doc => doc.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });
});
