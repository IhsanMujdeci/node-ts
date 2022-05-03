import { print } from '@app/imported';

export function add(a: number, b: number) {
  return a + b;
}

print();
console.log(add(1, 2));
