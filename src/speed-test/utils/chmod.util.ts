import * as fs from 'fs/promises';

export const chMod = async (file, mode) => {
  try {
    await fs.chmod(file, mode);
  } catch (error) {
    throw new Error(
      `Error changing permissions for "${file}". Original message: ${error.message}`,
    );
  }
};
