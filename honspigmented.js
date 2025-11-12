let currentStep = 1;
const steps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.prev-button');
const submitButton = document.querySelector('#submit-button');
const confirmationMessage = document.querySelector('#confirmation-message');
const formContainer = document.querySelector('#form-container');

const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');

const imageDrop = document.getElementById('image-drop');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

const docDrop = document.getElementById('doc-drop');
const docInput = document.getElementById('doc-input');
const docPreview = document.getElementById('doc-preview');


const statesByCountry = {
  Nigeria: ['Lagos', 'Abuja', 'Kano', 'Rivers','Oyo', 'Kaduna', 'Ondo', 'Ekiti', 'Delta', 'Anambra' , 'Imo', 'Enugu', 'Ogun' , 'Osun', 'Kwara', 'Bauchi', 'Benue', 'Cross River', 'Ebonyi', 'Edo', 'FCT'],
  USA: ['California', 'Texas', 'New York', 'Florida'],
  Canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Germany: ['Bavaria', 'Berlin', 'Hamburg', 'Hesse'],
  India: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu'],
};


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


function validateStep(step) {
  let valid = true;
  const stepDiv = steps[step - 1];
  const inputs = stepDiv.querySelectorAll('input, select');

  inputs.forEach(input => {
    const errorMsg = input.nextElementSibling;
    if (!errorMsg) return;
    errorMsg.textContent = '';

    if ((input.type !== 'file') && !input.value.trim()) {
      errorMsg.textContent = "This field is required";
      valid = false;
    }

    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        errorMsg.textContent = "Invalid email";
        valid = false;
      }
    }

    if (input.type === 'tel') {
      const phoneRegex = /^\+?\d{7,15}$/;
      if (!phoneRegex.test(input.value.trim())) {
        errorMsg.textContent = "Invalid phone number";
        valid = false;
      }
    }

    if (input.type === 'file') {
      if (!input.files || input.files.length === 0) {
        errorMsg.textContent = "Please upload a file";
        valid = false;
      }
    }
  });

  return valid;
}
nextButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        showStep(currentStep + 1);
        if (currentStep === 5) generateSummary();
      }
    }
  });
});


prevButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (currentStep > 1) showStep(currentStep - 1);
  });
});


countrySelect.addEventListener('change', () => {
  stateSelect.innerHTML = '<option value="">Select State/Province</option>';
  const selectedCountry = countrySelect.value;
  if (statesByCountry[selectedCountry]) {
    statesByCountry[selectedCountry].forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });
  }
});

imageDrop.addEventListener('click', () => imageInput.click());
imageDrop.addEventListener('dragover', e => { e.preventDefault(); imageDrop.classList.add('dragover'); });
imageDrop.addEventListener('dragleave', e => { e.preventDefault(); imageDrop.classList.remove('dragover'); });
imageDrop.addEventListener('drop', e => {
  e.preventDefault();
  imageDrop.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    imageInput.files = e.dataTransfer.files;
    showPreview(file);
  } else alert("Please drop a valid image file.");
});
imageInput.addEventListener('change', () => {
  if (imageInput.files && imageInput.files[0]) showPreview(imageInput.files[0]);
});
function showPreview(file) {
  const reader = new FileReader();
  reader.onload = e => {
    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:150px; max-height:150px;">`;
  };
  reader.readAsDataURL(file);
}


docDrop.addEventListener('click', () => docInput.click());
docDrop.addEventListener('dragover', e => { e.preventDefault(); docDrop.classList.add('dragover'); });
docDrop.addEventListener('dragleave', e => { e.preventDefault(); docDrop.classList.remove('dragover'); });
docDrop.addEventListener('drop', e => {
  e.preventDefault();
  docDrop.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && (file.type === "application/pdf" || file.type.includes("word"))) {
    docInput.files = e.dataTransfer.files;
    showDocName(file);
  } else alert("Please drop a valid document (.pdf, .doc, .docx).");
});
docInput.addEventListener('change', () => {
  if (docInput.files && docInput.files[0]) showDocName(docInput.files[0]);
});
function showDocName(file) {
  docPreview.textContent = `Selected file: ${file.name}`;
}


function generateSummary() {
  const summaryDiv = document.getElementById('summary');
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phoneNumber').value;
  const country = countrySelect.value;
  const state = stateSelect.value;
  const city = document.getElementById('city').value;
  const zip = document.getElementById('zipCode').value;
  
  const imageFile = imageInput.files[0];
  const imageHTML = imageFile ? `<img src="${URL.createObjectURL(imageFile)}" style="max-width:150px; display:block; margin-bottom:10px;">` : 'None';
  
  const docFile = docInput.files[0];
  const docHTML = docFile ? docFile.name : 'None';

  summaryDiv.innerHTML = `
    <h3>Personal Information</h3>
    <p>Name: ${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <h3>Address Information</h3>
    <p>Country: ${country}</p>
    <p>State: ${state}</p>
    <p>City: ${city}</p>
    <p>Zip: ${zip}</p>
    <h3>Uploaded Image</h3>
    ${imageHTML}
    <h3>Uploaded Document</h3>
    <p>${docHTML}</p>
  `;
}


submitButton.addEventListener('click', () => {
  if (!validateStep(currentStep)) return;
  formContainer.style.display = 'none';
  confirmationMessage.style.display = 'block';
});
