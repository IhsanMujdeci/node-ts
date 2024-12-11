import { printEnv } from './imported';

export function add(a: number, b: number) {
  return a + b;
}
printEnv();

console.log(add(1, 1));
