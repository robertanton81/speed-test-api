import * as childProcess from 'child_process';

export const startSpeedTest = async (binary: Promise<string>) => {
  try {
    const args = ['-p', '--accept-license', '--accept-gdpr', '--format=json'];
    return childProcess.spawn(await binary, args);
  } catch (e) {
    console.error(e);

    throw new Error(
      `Error starting speed test. Original message: ${e.message}`,
    );
  }
};
