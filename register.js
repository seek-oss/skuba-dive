// istanbul ignore if
/**
 * @see {@link https://github.com/kulshekhar/ts-jest/issues/727#issuecomment-422743605}
 */
if (typeof jest === 'undefined') {
  require('source-map-support/register');
}

/**
 * @see {@link https://nodejs.org/api/deprecations.html#DEP0144}
 */
const [firstModuleParent] = Object.values(require.cache).filter((m) =>
  m.children.includes(module),
);

if (typeof firstModuleParent !== 'undefined') {
  const { addAlias } = require('module-alias');

  addAlias('src', firstModuleParent.path);
}
