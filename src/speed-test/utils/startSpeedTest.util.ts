import * as childProcess from 'child_process';
import { Logger } from '@nestjs/common';

export const startSpeedTest =
  (serverDetails?: boolean) =>
  (
    binary: string | Error,
  ): childProcess.ChildProcessWithoutNullStreams | Error => {
    const logger = new Logger('fn() startSpeedTest');
    try {
      logger.log('Triggering speed test');
      if (binary instanceof Error) return binary;

      const args = ['-p', '--accept-license', '--accept-gdpr', '--format=json'];

      serverDetails && args.push('--selection-details');

      const process = childProcess.spawn(binary, args);
      logger.log('Successfully triggered speed test');

      return process;
    } catch (error) {
      const exception = new Error(
        `Error starting speed test. Original message: ${error.message}`,
      );

      logger.error(exception);
      return exception;
    }
  };
