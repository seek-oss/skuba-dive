import * as presets from './presets';

describe('presets', () => {
  test('nonNegativeInteger', () => {
    process.env.SKUBA_DIVE = '123';

    expect(presets.nonNegativeInteger('SKUBA_DIVE')).toBe(123);
  });

  test('oneOf', () => {
    process.env.SKUBA_DIVE = '123';

    expect(presets.oneOf(['123', '456'])('SKUBA_DIVE')).toBe('123');
  });

  test('string', () => {
    process.env.SKUBA_DIVE = '123';

    expect(presets.string('SKUBA_DIVE')).toBe('123');
  });
});
