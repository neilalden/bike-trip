export const truncateString = (str: string, num: number): string => {
  if (str && str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
};
