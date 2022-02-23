const thumbWar = require('../thumb-war');
const utils = require('../utils');

function fn(impl) {
  const mockFn = (...args) => {
    mock.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = {calls: []};
  return mockFn;
}

test('returns winner', () => {
  const originalGetWinner = utils.getWinner;
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
  expect(winner).toBe('Kent C. Dodds');
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler');
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    'Kent C. Dodds',
    'Ken Wheeler'
  );
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    'Kent C. Dodds',
    'Ken Wheeler'
  );
  // cleanup
  utils.getWinner = originalGetWinner;
});
