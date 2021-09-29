
it('should calculate the monthly rate correctly', function () {
  const exampleValues = {
    amount: 8,
    years: 8,
    rate: 3,
  };
  expect(calculateMonthlyPayment(exampleValues)).toEqual('0.09');
});


it("should return a result with 2 decimal places", function() {
  const exampleValues = {
    amount: 50000,
    years: 30,
    rate: 4.7,
  };
  expect(calculateMonthlyPayment(exampleValues)).toEqual('259.32');
});

/// etc
