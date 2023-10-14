import * as childProcess from 'child_process';

export const startSpeedTest = async (binary: string) => {
  try {
    const args = ['-p', '--accept-license', '--accept-gdpr', '--format=json'];
    return childProcess.spawn(binary, args);
  } catch (e) {
    console.error(e);
    return new Error(
      `Error starting speed test. Original message: ${e.message}`,
    );
  }
};
