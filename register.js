// istanbul ignore if
/**
 * @see {@link https://github.com/kulshekhar/ts-jest/issues/727#issuecomment-422743605}
 */
if (typeof jest === 'undefined') {
  require('source-map-support/register');
}

const { addAlias } = require('module-alias');

addAlias('src', module.parent.path);
