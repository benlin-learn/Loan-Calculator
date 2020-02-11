const loanForm = document.querySelector('#loan-form');

loanForm.addEventListener('submit', function(e) {
  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Show loader
  document.querySelector('#loader').style.display = 'block';
  setTimeout(calculate, 2000);

  e.preventDefault();
});
// 每月應還本息金額之平均攤還率
// ＝{[(1＋月利率)^月數]×月利率}÷{[(1＋月利率)^月數]－1}
// (公式中：月利率 ＝ 年利率／12 ； 月數=貸款年期 ｘ 12)

function calculate() {
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  // 月利率 monthlyInterest
  const monthlyInterest = parseFloat(interest.value / 100 / 12);
  // 總共有幾個月 totalNumOfMonths
  const totalNumOfMonths = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + monthlyInterest, totalNumOfMonths);
  // monthly : 每月應繳
  const monthly = (principal * x * monthlyInterest) / (x - 1);
  const total = monthly * totalNumOfMonths;
  // console.log(
  //   `amount : ${amount},
  //   interest : ${interest},
  //   years : ${years},
  //   monthlyPayment : ${monthlyPayment},
  //   totalPayment : ${totalPayment},
  //   totalInterest : ${totalInterest},
  //   principal : ${principal},
  //   monthlyInterest : ${monthlyInterest},
  //   totalNumOfMonths : ${totalNumOfMonths},
  //   x : ${x},
  //   monthly : ${monthly}
  //   total : ${total}
  //   `
  // );
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * totalNumOfMonths).toFixed(2);
    totalInterest.value = (monthly * totalNumOfMonths - principal).toFixed(2);
    // show results
    document.querySelector('#results').style.display = 'block';

    // hide loader
    document.querySelector('#loader').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }

  // e.preventDefault();
}

function showError(error) {
  // show results
  document.querySelector('#results').style.display = 'none';

  // hide loader
  document.querySelector('#loader').style.display = 'none';

  // Create Div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Add <class></class>
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to errorDiv
  errorDiv.appendChild(document.createTextNode(error));

  // Insert errorDiv after card before heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 secs
  setTimeout(removeError, 3000);

  // console.log(errorDiv);
}

function removeError() {
  document.querySelector('.alert').remove();
}
