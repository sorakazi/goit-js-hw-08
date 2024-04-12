import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

// Function to save form state to localStorage
const saveFormState = throttle(() => {
  const email = form.querySelector('input[name="email"]').value;
  const message = form.querySelector('textarea[name="message"]').value;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email, message })
  );
}, 500);

// Event listener for input event on the form fields
form.addEventListener('input', saveFormState);
// Function to load form state from localStorage
const loadFormState = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const { email, message } = JSON.parse(storedState);
    form.querySelector('input[name="email"]').value = email;
    form.querySelector('textarea[name="message"]').value = message;
  }
};

// Call loadFormState on page load
document.addEventListener('DOMContentLoaded', loadFormState);
// Event listener for form submission
form.addEventListener('submit', event => {
  event.preventDefault();

  // Get form data
  const email = form.querySelector('input[name="email"]').value;
  const message = form.querySelector('textarea[name="message"]').value;

  // Clear storage and form fields
  localStorage.removeItem('feedback-form-state');
  form.reset();

  // Display form data in console
  console.log('Form Data:', { email, message });
});
