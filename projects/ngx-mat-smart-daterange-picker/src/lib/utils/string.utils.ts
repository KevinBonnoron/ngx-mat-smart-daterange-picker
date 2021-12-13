export const matchAll = (string: string, regex: RegExp): RegExpExecArray[] => {
  const matches = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(string))) {
    matches.push(match);
  }
  return matches;
};
