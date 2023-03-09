import { print } from '@app/imported';
import config from 'config';

export function add(a: number, b: number) {
  return a + b;
}

print();
console.log(add(1, 1));
