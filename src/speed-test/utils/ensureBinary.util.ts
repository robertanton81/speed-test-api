import path from 'path';
import { chMod } from './chmod.util';

export const ensureBinary: () => Promise<string | Error> = async () => {
  try {
    const platformBinaries = {
      darwin: 'ookla-speedtest-1.2.0-macosx-universal/speedtest',
      win32: 'ookla-speedtest-1.2.0-win64/speedtest.exe',
      linux: 'ookla-speedtest-1.2.0-linux-x86_64/speedtest',
    };

    const platform = process.platform;
    const binFile = platformBinaries[platform];

    if (!binFile) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const binFilePath = path.join(__dirname, 'binaries', binFile);
    await chMod(binFilePath, 0o755);

    return binFilePath;
  } catch (error) {
    return new Error(
      `Error getting binary. Original message: ${error.message}`,
    );
  }
};
