export const formatLine = (stream, onLine) => {
  let rest = '';

  stream.setEncoding('utf8');

  stream.on('data', (data) => {
    rest += data;
    let match;

    while ((match = /(^.*?)(\r)?\n/.exec(rest))) {
      onLine(match[1]);
      rest = rest.slice(match[0].length);
    }
  });

  stream.on('end', () => {
    if (rest) onLine(rest);
  });
};
