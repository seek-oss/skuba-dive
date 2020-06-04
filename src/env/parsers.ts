export const nonNegativeInteger = (input: string): number => {
  const int = parseInt(input, 10);

  if (int < 0 || !Number.isSafeInteger(int) || input !== String(int)) {
    throw Error(`not a non-negative integer: '${input}'`);
  }

  return int;
};

export const noop = <T>(input: T): T => input;

export const oneOf = <T>(choices: ReadonlyArray<T>) => {
  const isChoice = (value: unknown): value is typeof choices[number] =>
    new Set<unknown>(choices).has(value);

  return (input: unknown): typeof choices[number] => {
    if (!isChoice(input)) {
      throw Error(`not a supported choice: '${input}'`);
    }

    return input;
  };
};
