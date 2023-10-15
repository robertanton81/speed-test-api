import * as childProcess from 'child_process';

export const startSpeedTest = (
  binary: string | Error,
): childProcess.ChildProcessWithoutNullStreams | Error => {
  try {
    if (binary instanceof Error) return binary;

    const args = ['-p', '--accept-license', '--accept-gdpr', '--format=json'];

    return childProcess.spawn(binary, args);
  } catch (error) {
    return new Error(
      `Error starting speed test. Original message: ${error.message}`,
    );
  }
};
