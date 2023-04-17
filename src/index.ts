import { printEnv } from '@app/imported';
import lol from 'jest'

export function add(a: number, b: number) {
  return a + b;
}
printEnv();

console.log(add(1, 1));
