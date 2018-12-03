({
  bold: function () {
    return async function (text, render) {
      return '<b>' + await render(text) + '</b>';
    };
  },
  person: { name: 'Jonas' }
});
