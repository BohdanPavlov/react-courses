export function transformCreationDate(date: string): string {
  return date.replace(/\//gi, '.');
}
