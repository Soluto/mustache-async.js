({
  name: "Chris",
  value: 10000,
  taxed_value: async function () {
    return new Promise(resolve => setTimeout(() => resolve(this.value - (this.value * 0.4)), 10));
  },
  in_ca: true
})
