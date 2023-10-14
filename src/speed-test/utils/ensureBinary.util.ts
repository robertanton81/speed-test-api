import path from 'path';
import { chMod } from './chmod.util';

export const ensureBinary = async () => {
  const binaryLocation =
    'https://install.speedtest.net/app/cli/ookla-speedtest-$v-$p';
  // const found = platforms.find(
  //   (p) => p.platform === platform && p.arch === arch,
  // );
  // if (!found) throw new Error(`${platform} on ${arch} not supported`);
  const binDir = path.join(__dirname, 'binaries');
  // await mkdirp(binDir);
  // const binFileName = appendFileName(found.bin, `-${binaryVersion}`);
  // const binPath = path.join(binDir, binFileName);
  // if (!(await fileExists(binPath))) {
  //   const pkgDir = path.join(__dirname, 'pkg');
  //   await mkdirp(pkgDir);
  //   const pkgFileName = appendFileName(found.pkg, `-${binaryVersion}`);
  //   const pkgPath = path.join(pkgDir, pkgFileName);
  //   if (!(await fileExists(pkgPath))) {
  //     const url = binaryLocation
  //       .replace('$v', binaryVersion)
  //       .replace('$p', found.pkg);
  //     try {
  //       await download(url, pkgDir, { filename: pkgFileName });
  //     } catch (err) {
  //       throw new Error(
  //         `Error downloading speedtest CLI executable from ${url}: ${err.message}`,
  //       );
  //     }
  //   }
  //   const fileSha = await sha256File(pkgPath);
  //   if (binaryVersion === defaultBinaryVersion && fileSha !== found.sha) {
  //     throw new Error(
  //       `SHA mismatch ${pkgFileName}, found "${fileSha}", expected "${found.sha}"`,
  //     );
  //   }
  //   // noinspection JSUnusedGlobalSymbols
  //   await decompress(pkgPath, binDir, {
  //     plugins: [
  //       decompressTar(),
  //       decompressTarbz2(),
  //       decompressTargz(),
  //       decompressUnzip(),
  //       decompressTarXz(),
  //     ],
  //     filter: (file) => {
  //       return /(^|\/)speedtest(.exe)?$/.test(file.path);
  //     },
  //     map: (file) => {
  //       file.path = binFileName;
  //       return file;
  //     },
  //   });
  //   if (!(await fileExists(binPath))) {
  //     throw new Error(`Error decompressing package "${pkgPath}"`);
  //   }
  // await chMod(binPath, 0o755);
  // }
  // return binPath;
};
