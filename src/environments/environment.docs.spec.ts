import {environment} from './environment.docs';

describe('environment IDs', () => {
  it('should not have duplicated IDs', () => {
    const ids = environment.map(doc => doc.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });
});
