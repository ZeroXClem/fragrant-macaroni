const assert = require('assert');
const { exec } = require('child_process');

describe('npm install command', () => {
  it('should complete successfully', (done) => {
    exec('npm install', (error, stdout, stderr) => {
      assert.strictEqual(error, null);
      done(error);
    });
  });
});
