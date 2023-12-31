const { execSync } = require('child_process');

function runNpmInstall() {
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error executing "npm install":', error);
  }
}

runNpmInstall();
