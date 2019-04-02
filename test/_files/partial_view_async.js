({
  greeting: function () {
    return "Welcome";
  },
  farewell: async function () {
    return "Fair enough, right?";
  },
  name: async () => "Chris",
  value: 10000,
  taxed_value: async function () {
    return this.value - (this.value * 0.4);
  },
  in_ca: true
})
