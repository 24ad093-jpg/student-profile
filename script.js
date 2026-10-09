// Student Profile Dashboard interactions

const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const searchBox = document.getElementById('searchBox');
const photoInput = document.getElementById('photoInput');
const heroPhoto = document.querySelector('.hero-photo');
const cards = document.querySelectorAll('.detail-card, .progress-card, .table-section');
let uploadedPhotoUrl = null;

const updateHeroPhoto = (url) => {
  if (!url) return;
  if (uploadedPhotoUrl) URL.revokeObjectURL(uploadedPhotoUrl);
  uploadedPhotoUrl = url;
  heroPhoto.classList.remove('placeholder-photo');
  heroPhoto.innerHTML = `
    <img src="${url}" alt="Profile photo" />
    <label for="photoInput" class="upload-button upload-button--overlay">
      <i class="fa-solid fa-camera"></i> Change Photo
    </label>
  `;
};

photoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) return;
  updateHeroPhoto(URL.createObjectURL(file));
});

// Theme toggle
const applyTheme = (darkMode) => {
  body.classList.toggle('dark-mode', darkMode);
  themeToggle.innerHTML = darkMode
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('student-theme', darkMode ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('student-theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else {
  applyTheme(false);
}

themeToggle.addEventListener('click', () => {
  const isDarkMode = body.classList.contains('dark-mode');
  applyTheme(!isDarkMode);
});

// Search filter
searchBox.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const matches = text.includes(query);
    card.classList.toggle('hidden-card', !matches && query !== '');
  });
});

// Animate progress bars on page load
window.addEventListener('load', () => {
  document.querySelector('.attendance-bar').style.width = '92%';
  document.querySelector('.cgpa-bar').style.width = '89%';
});
