import * as path from 'path';
import { chMod } from './chmod.util';
import { Logger } from '@nestjs/common';

export const ensureBinary: (binariesPath: string) => string | Error = (
  binariesPath,
) => {
  const logger = new Logger('fn() ensureBinary');

  try {
    logger.log(`Ensuring cli binary exists in "${binariesPath}"`);
    const platformBinaries = {
      darwin: 'ookla-speedtest-1.2.0-macosx-universal/speedtest',
      win32: 'ookla-speedtest-1.2.0-win64/speedtest.exe',
      linux: 'ookla-speedtest-1.2.0-linux-x86_64/speedtest',
    };

    const platform = process.platform;
    const binFile = platformBinaries[platform];

    if (!binFile) {
      const exception = new Error(`Unsupported platform: ${platform}`);
      logger.error(exception);

      return exception;
    }

    const binFilePath = path.join(binariesPath, binFile);
    chMod(binFilePath, 0o755);
    logger.log(`Successfully ensured cli binary exists `);

    return binFilePath;
  } catch (error) {
    const exception = new Error(`Error getting binary: ${error.message}`);
    logger.error(exception);

    return exception;
  }
};
