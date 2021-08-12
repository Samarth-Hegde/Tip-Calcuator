const billInput = document.querySelector(".bill-input");
const tipButton = document.querySelectorAll(".tip-button button");
const tipCustom = document.querySelector("#custom");
const noOfPeople = document.querySelector(".people-input");
const resetButton = document.querySelector(".reset-button");
const totaltipOutput = document.querySelector(".total-tip-amount");
const totalAmount = document.querySelector(".total-amount");
let custom;

const tipCalculator = function (tipPercentage, bill, peopleCount) {
  const totalTip = (bill * tipPercentage) / 100;
  const tipPerPerson = totalTip / peopleCount;
  return tipPerPerson;
};
console.log(tipCalculator(50, 555, 8));
const totalCalculator = function (bill, peopleCount, tipPerPerson) {
  const total = bill / peopleCount + tipPerPerson;
  return total;
};
console.log(totalCalculator(555, 8, tipCalculator(50, 555, 8)));

const reset = function () {
  billInput.addEventListener("input", function () {
    resetButton.classList.add("reset-active");
  });
  noOfPeople.addEventListener("input", function () {
    resetButton.classList.add("reset-active");
  });

  resetButton.classList.add("reset-active");
  if (
    billInput.value ||
    tipCustom.value ||
    noOfPeople.value ||
    totalAmount.textContent ||
    totaltipOutput.textContent
  ) {
    resetButton.addEventListener("click", function () {
      totalAmount.textContent = "$0.00";
      totaltipOutput.textContent = "$0.00";
      billInput.value = "";
      tipCustom.value = "";
      noOfPeople.value = "";
      resetButton.classList.remove("reset-active");
    });
  }
};
reset();

tipButton.forEach(function (button) {
  button.addEventListener("click", function () {
    if (noOfPeople.value > 0) {
      totaltipOutput.textContent = `$${tipCalculator(
        Number(button.value),
        billInput.value,
        noOfPeople.value
      ).toFixed(2)}`;
      totalAmount.textContent = `$${totalCalculator(
        billInput.value,
        noOfPeople.value,
        tipCalculator(button.value, billInput.value, noOfPeople.value)
      ).toFixed(2)}`;
      document.querySelector(".ifZero").style.display = "none";
      document.querySelector(".people-input").classList.remove("whenZero");
      button.classList.add("active");
    } else {
      document.querySelector(".ifZero").style.display = "block";
      document.querySelector(".people-input").classList.add("whenZero");
    }
  });
});

tipCustom.addEventListener("input", function () {
  custom = document.getElementById("custom").value;
  if (noOfPeople.value > 0) {
    totaltipOutput.textContent = `$${tipCalculator(
      Number(custom),
      billInput.value,
      noOfPeople.value
    ).toFixed(2)}`;
    totalAmount.textContent = `$${totalCalculator(
      billInput.value,
      noOfPeople.value,
      tipCalculator(custom, billInput.value, noOfPeople.value)
    ).toFixed(2)}`;
    document.querySelector(".ifZero").style.display = "none";
    document.querySelector(".people-input").classList.remove("whenZero");
  } else {
    document.querySelector(".ifZero").style.display = "block";
    document.querySelector(".people-input").classList.add("whenZero");
  }
});
