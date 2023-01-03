function GetBalance(transactions) {
  return {
    balance: transactions
      .filter((d) => d.isDeleted === false)
      .reduce((prev, curr) => prev + curr.amount * curr.sign, 0),
    income: transactions
      .filter((d) => d.sign === 1 && d.isDeleted === false)
      .reduce((prev, curr) => prev + curr.amount, 0),
    outcome: transactions
      .filter((d) => d.sign === -1 && d.isDeleted === false)
      .reduce((prev, curr) => prev + curr.amount, 0),
  };
}

export { GetBalance };
