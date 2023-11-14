import { sum } from "./sum"

describe('adds 1 + 2 to equal 3', () => {
    it('sum is right', () => {
      expect(sum(1, 2)).toBe(3);
    });
});