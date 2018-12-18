require('./helper');

const renderHelper = require('./render-helper');

const tests = renderHelper.getTests();

describe('Mustache.render', function () {
  beforeEach(function () {
    Mustache.clearCache();
  });

  it('requires template to be a string', async () => {
    await assert.isRejected(Mustache.render(['dummy template'], ['foo', 'bar']), TypeError, 'Invalid template! Template should be a "string" but ' +
                  '"array" was given as the first argument ' +
                  'for mustache#render(template, view, partials)');
  });

  describe('custom tags', () => {
    it('uses tags argument instead of Mustache.tags when given', async () => {
      const template = '<<placeholder>>bar{{placeholder}}';

      Mustache.tags = ['{{', '}}'];
      assert.equal(await Mustache.render(template, { placeholder: 'foo' }, {}, ['<<', '>>']), 'foobar{{placeholder}}');
    });

    it('uses tags argument instead of Mustache.tags when given, even when it previous rendered the template using Mustache.tags', async () => {
      const template = '((placeholder))bar{{placeholder}}';

      Mustache.tags = ['{{', '}}'];
      Mustache.render(template, { placeholder: 'foo' });
      assert.equal(await Mustache.render(template, { placeholder: 'foo' }, {}, ['((', '))']), 'foobar{{placeholder}}');
    });

    it('uses tags argument instead of Mustache.tags when given, even when it previous rendered the template using different tags', async () => {
      const template = '[[placeholder]]bar<<placeholder>>';

      Mustache.render(template, { placeholder: 'foo' }, {}, ['<<', '>>']);
      assert.equal(await Mustache.render(template, { placeholder: 'foo' }, {}, ['[[', ']]']), 'foobar<<placeholder>>');
    });

    it('does not mutate Mustache.tags when given tags argument', function() {
      const correctMustacheTags = ['{{', '}}'];
      Mustache.tags = correctMustacheTags;

      Mustache.render('((placeholder))', { placeholder: 'foo' }, {}, ['((', '))']);

      assert.equal(Mustache.tags, correctMustacheTags);
      assert.deepEqual(Mustache.tags, ['{{', '}}']);
    });

    it('uses provided tags when rendering partials', async () => {
      const output = await Mustache.render('<%> partial %>', { name: 'Santa Claus' }, {
        partial: '<% name %>'
      }, ['<%', '%>']);

      assert.equal(output, 'Santa Claus');
    });
  })

  tests.forEach(async (test) => {
    const view = eval(test.view);
    it('knows how to render ' + test.name, async () => {
      let output;
      if (test.partial) {
        output = await Mustache.render(test.template, view, { partial: test.partial });
      } else {
        output = await Mustache.render(test.template, view);
      }

      output.should.equal(test.expect);
    });

  });
});
