({
  name: "Tater",
  helper: "To tinker?",
  bolder: function () {
    return async function (text, render) {
      return text + ' => <b>' + await render(text) + '</b> ' + this.helper;
    }
  }
})
