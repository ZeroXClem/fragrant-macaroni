import { exec } from "child_process";

/**
 * Execute simple shell command (async wrapper).
 * @param {string} cmd
 * @return {Object} { stdout: String, stderr: String }
 */

export async function sh(
  cmd: string,
  panic: boolean = true
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err && panic) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}
