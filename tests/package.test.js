const { test, expect } = require('@jest/globals');

test('Can require @notionhq/client', () => {
  expect(() => require('@notionhq/client')).not.toThrow();
});
