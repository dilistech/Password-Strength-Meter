const passwordInput = document.getElementById('password');
const strengthBar = document.querySelector('.strength-bar .bar');
const strengthText = document.getElementById('strength-text');
const togglePasswordButton = document.getElementById('toggle-password');
const toggleIcon = togglePasswordButton.querySelector('i');


passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const strength = calculateStrength(password);

  
  strengthBar.style.width = `${strength.percent}%`;
  strengthBar.style.backgroundColor = strength.color;

 
  strengthText.textContent = strength.text;
  strengthText.className = `strength-text ${strength.class}`;
});


togglePasswordButton.addEventListener('click', () => {
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  toggleIcon.className = isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash';
});


function calculateStrength(password) {
  let score = 0;

  if (password.length > 6) score++;
  if (password.length > 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  const strength = {
    percent: 0,
    text: 'Start typing...',
    color: '#ccc',
    class: '',
  };

  switch (score) {
    case 1:
    case 2:
      strength.percent = 25;
      strength.text = 'Weak';
      strength.color = '#ff4b4b';
      strength.class = 'weak';
      break;
    case 3:
    case 4:
      strength.percent = 50;
      strength.text = 'Medium';
      strength.color = '#ffa534';
      strength.class = 'medium';
      break;
    case 5:
      strength.percent = 75;
      strength.text = 'Strong';
      strength.color = '#4caf50';
      strength.class = 'strong';
      break;
    case 6:
      strength.percent = 100;
      strength.text = 'Very Strong';
      strength.color = '#00e676';
      strength.class = 'very-strong';
      break;
    default:
      strength.percent = 0;
      strength.text = 'Too short';
      strength.color = '#ccc';
      strength.class = '';
  }

  return strength;
}
