const loanForm = document.querySelector('#loan-form');

const clearError = () => {
  document.querySelector('.alert').remove();
}

const showError = (error) => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);
  
  // clear error message after certain time period
  setTimeout(clearError, 3000);
}

const calculateInterest = () => {
  document.querySelector('#results').style.display = 'block';
  document.querySelector('#loading').style.display = 'none';

  const amount = document.querySelector('#amount').value;
  const interest = document.querySelector('#interest').value;
  const years = document.querySelector('#years').value;

  let totalInterest = amount * (interest * 0.01) * years;
  let totalPayment = parseFloat(amount) + parseFloat(totalInterest);  
  let monthlyPayment = totalPayment / (years * 12);
  if(isFinite(monthlyPayment)){
    document.querySelector('#monthly-payment').value = monthlyPayment.toFixed(2);
    document.querySelector('#total-payment').value = totalPayment.toFixed(2);
    document.querySelector('#total-interest').value = totalInterest.toFixed(2);
  } else {
    document.querySelector('#results').style.display = 'none';
    showError('Check your numbers');
  }
}

loanForm.addEventListener('submit', function(e) {
  
  document.querySelector('#results').style.display = 'none';

  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateInterest, 2000);

  e.preventDefault()
});

