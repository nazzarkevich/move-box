// import Game from './Game';
// import Board from './Board';

jest.mock('./Game.js');

describe('Board', () => {

  it('one', () => {
    const one = 1;

    expect(one).toBe(1);
  });
});
