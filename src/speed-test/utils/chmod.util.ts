import * as fs from 'fs';
import { Logger } from '@nestjs/common';

export const chMod = (file, mode): void | Error => {
  const logger = new Logger('fn() chMod');
  try {
    logger.log(`Changing permissions for cli binary to "${mode}"`);
    fs.chmodSync(file, mode);
    logger.log(`Successfully changed permissions for cli binary to "${mode}"`);
  } catch (error) {
    const exception = new Error(
      `Error changing permissions for binary. Original message: ${error.message}`,
    );
    logger.error(exception);

    return exception;
  }
};
