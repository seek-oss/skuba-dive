import { create } from './create';

describe('create', () => {
  const VAR = 'ABC_123_DEF_456';

  beforeEach(() => delete process.env[VAR]);

  describe('with default', () => {
    it('maps a set environment variable', () => {
      process.env[VAR] = '123';
      expect(create<number>(JSON.parse)(VAR, { default: undefined })).toBe(123);
    });

    it('throws on parsing error', () => {
      process.env[VAR] = '}';
      expect(() =>
        create(JSON.parse)(VAR, { default: undefined }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected token } in JSON at position 0"`,
      );
    });

    it('defaults on unset environment variable', () =>
      expect(create(JSON.parse)(VAR, { default: undefined })).toBeUndefined());
  });

  describe('without default', () => {
    it('maps a set environment variable', () => {
      process.env[VAR] = '123';
      expect(create<number>(JSON.parse)(VAR)).toBe(123);
    });

    it('throws on parsing error', () => {
      process.env[VAR] = '}';
      expect(() => create(JSON.parse)(VAR)).toThrowErrorMatchingInlineSnapshot(
        `"Unexpected token } in JSON at position 0"`,
      );
    });

    it('throws on unset environment variable', () =>
      expect(() => create(JSON.parse)(VAR)).toThrowErrorMatchingInlineSnapshot(
        `"process.env.ABC_123_DEF_456 not set"`,
      ));
  });
});
