import * as fs from 'fs';

export const chMod = (file, mode): void | Error => {
  try {
    fs.chmodSync(file, mode);
  } catch (error) {
    return new Error(
      `Error changing permissions for "${file}". Original message: ${error.message}`,
    );
  }
};
