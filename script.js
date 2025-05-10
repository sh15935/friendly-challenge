// Create binary rain effect
function createBinaryRain() {
  const container = document.getElementById('binaryRain');
  const digits = '01';
  const count = Math.floor(window.innerWidth / 15);
  
  for (let i = 0; i < count; i++) {
    const digit = document.createElement('div');
    digit.className = 'binary-digit';
    digit.textContent = digits.charAt(Math.floor(Math.random() * digits.length));
    
    // Random properties for each digit
    const left = Math.random() * 100;
    const animationDuration = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    const opacity = 0.1 + Math.random() * 0.3;
    
    digit.style.left = `${left}%`;
    digit.style.animationDuration = `${animationDuration}s`;
    digit.style.animationDelay = `${delay}s`;
    digit.style.opacity = opacity;
    
    // Change digits periodically
    setInterval(() => {
      digit.textContent = digits.charAt(Math.floor(Math.random() * digits.length));
    }, 100 + Math.random() * 900);
    
    container.appendChild(digit);
  }
}

// Show loading screen and redirect
function loadLab(labType) {
  const terminalEffect = document.getElementById('terminalEffect');
  const loadingText = document.getElementById('loadingText');
  
  // Show loading screen
  terminalEffect.classList.add('active');
  
  // Change loading text based on lab type
  if (labType === 'sql') {
    loadingText.textContent = "LOADING SQL INJECTION LAB...";
    setTimeout(() => {
      window.location.href = "sqli-lab/index.html";
    }, 2000);
  } else {
    loadingText.textContent = "LOADING NoSQL INJECTION LAB...";
    setTimeout(() => {
      window.location.href = "nosqli-lab/index.html";
    }, 2000);
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  createBinaryRain();
  
  // Add click handlers to lab boxes
  document.getElementById('sqlLab').addEventListener('click', () => {
    loadLab('sql');
  });
  
  document.getElementById('nosqlLab').addEventListener('click', () => {
    loadLab('nosql');
  });
  
  // Add click handlers to buttons (in case event doesn't bubble)
  document.querySelectorAll('.lab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const box = e.target.closest('.sql-box') ? 'sql' : 'nosql';
      loadLab(box);
    });
  });
});