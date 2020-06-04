import * as parsers from './parsers';

describe('nonNegativeInteger', () => {
  const happyCases = [
    ['zero', '0', 0],
    ['one', '1', 1],
    ['max', '9007199254740991', 9007199254740991],
  ] as const;

  it.each(happyCases)('parses %s', (_, input, output) =>
    expect(parsers.nonNegativeInteger(input)).toBe(output),
  );

  const sadCases = [
    ['< min', '-9007199254740992'],
    ['min', '-9007199254740991'],
    ['negative one', '-1'],
    ['negative zero', '-0'],
    ['padded negative zero', '   -0   '],
    ['positive zero', '+0'],
    ['padded one', '   1   '],
    ['> max', '9007199254740992'],
    ['NaN', 'NaN'],
    ['string', 'string'],
    ['decimal', '1.1'],
    ['empty string', ''],
    ['whitespace string', '     '],
    ['infinity', 'Infinity'],
  ] as const;

  it.each(sadCases)('throws on %s', (_, input) =>
    expect(() => parsers.nonNegativeInteger(input)).toThrow(),
  );
});

describe('noop', () => {
  it('passes through value', () => expect(parsers.noop('abc')).toBe('abc'));
});

describe('oneOf', () => {
  const parse = parsers.oneOf(['local', 'prod']);

  it('passes through value in list', () => expect(parse('prod')).toBe('prod'));

  it('throws on value not in list', () =>
    expect(() => parse('dev')).toThrowErrorMatchingInlineSnapshot(
      `"not a supported choice: 'dev'"`,
    ));
});
