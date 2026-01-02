import { hasExceededMaxSize } from './has-exceeded-max-size';

//~ <Unit of work> (Class or function)
describe('hasExceededMaxSize', () => {
  //~ Follow the order of appearance
  describe('when value is empty', () => {
    it('should return false if value is null', () => {
      expect(hasExceededMaxSize(null, 10)).toBe(false);
    });

    it('should return false if value is undefined', () => {
      expect(hasExceededMaxSize(undefined, 10)).toBe(false);
    });
  });

  //~These prior two are similar, so they could be parameterized
  describe('when value is empty (parameterized)', () => {
    it.each([null, undefined])(
      'should return false if value is %s',
      (value) => {
        expect(hasExceededMaxSize(value, 10)).toBe(false);
      },
    );
  });

  //~ Avoid nesting to many describes to facilitate readability
  describe('when value exists', () => {
    //~ <should <Expected behaviour> when <Condition>
    it('should return false if value size is within limit', () => {
      //~ Arrange
      //+ Sets up the <Condition>
      const value = { key: 'value' };
      const maxSize = 100;

      //~ Act
      //+ Run the <Unit of work>
      const result = hasExceededMaxSize(value, maxSize);

      //~ Assert
      //+ Check the <Expected behaviour>
      expect(result).toBe(false);
    });

    it('should return true if value size exceeds maxSize', () => {
      const value = { key: 'a'.repeat(100) };
      const maxSize = 50;

      expect(hasExceededMaxSize(value, maxSize)).toBe(true);
    });
  });
});
