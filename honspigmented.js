let currentStep = 1;
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
const submitButton = document.querySelector('#submit-button');
const confirmationMessage = document.querySelector('#confirmation-message');
const formContainer = document.querySelector('#form-container');

function showStep(step) {
  steps.forEach((stepDiv, index) => {
    stepDiv.classList.remove("active");
    stepDiv.style.display = "none";

    if (index === step - 1) {
      stepDiv.classList.add("active");
      stepDiv.style.display = "block";
    }
  });

  currentStep = step;
}

showStep(currentStep);


nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length) {
      showStep(currentStep + 1);
    }
  });
});


prevButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });
});


submitButton.addEventListener("click", () => {
  formContainer.style.display = "none";
  confirmationMessage.style.display = "block";
});
