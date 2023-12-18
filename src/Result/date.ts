export function date(dateTime: string) {
  return dateTime.replace(/T.*/, '').split('-').reverse().join('-');
}