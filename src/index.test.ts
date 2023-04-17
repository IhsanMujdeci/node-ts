import { add } from './index';

describe('Index test', () => {
  it('Should be able to add 1 and 1', () => {
    expect(add(1, 1)).toEqual(2);
  });
});

describe('Environment test', () => {
  it('Should be get test env variable', () => {
    expect(process.env['HELLO']).toEqual('test');
  });
});
