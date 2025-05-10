// Binary rain effect
function createBinaryRain() {
  const container = document.getElementById('binaryRain');
  const digits = '01';
  const columns = Math.floor(window.innerWidth / 15);
  
  for (let i = 0; i < columns * 15; i++) {
    const digit = document.createElement('div');
    digit.className = 'binary-digit';
    digit.textContent = digits.charAt(Math.floor(Math.random() * digits.length));
    digit.style.left = `${Math.random() * 100}%`;
    digit.style.top = `${-Math.random() * 100}%`;
    digit.style.animationDuration = `${5 + Math.random() * 10}s`;
    digit.style.animationDelay = `${Math.random() * 5}s`;
    digit.style.opacity = Math.random() * 0.5 + 0.1;
    digit.style.fontSize = `${Math.random() * 10 + 12}px`;
    container.appendChild(digit);
  }
}

// Attack loaders
function loadNoSQLAttack(attack, description) {
  document.getElementById('nosql-username').value = attack;
  document.getElementById('nosql-password').value = 'any';
  addTerminalLine(`> Loaded attack pattern: ${description || attack}`);
}

// Query simulator
function simulateNoSQLQuery() {
  const user = document.getElementById('nosql-username').value;
  const pass = document.getElementById('nosql-password').value;
  const responseDiv = document.getElementById('nosql-response');
  
  addTerminalLine(`> Executing: db.users.find({ username: ${user}, password: "${pass}" })`);

  let result = '';
  if (user.includes('$ne') || user.includes('$or') || 
      user.includes('$regex') || user.includes('$where') || 
      user.includes('$gt') || user === 'admin') {
    result = `
      <span style="color: var(--warning-red)">[!] NoSQL INJECTION DETECTED</span><br><br>
      <span style="color: var(--hacker-green)">Bypassed authentication!</span><br>
      <span style="color: var(--cyber-blue)">Returned documents:</span><br><br>
      { "_id": 1, "username": "admin", "password": "hashed_admin", "role": "superuser", "email": "admin@cybersec.lab" }<br>
      { "_id": 2, "username": "guest", "password": "hashed_guest", "role": "user", "email": "guest@cybersec.lab" }<br>
      { "_id": 3, "username": "service", "password": "hashed_service", "role": "service", "email": "service@cybersec.lab" }
    `;
    document.querySelector('.cyber-terminal').classList.add('breach-effect');
    setTimeout(() => {
      document.querySelector('.cyber-terminal').classList.remove('breach-effect');
    }, 1500);
  } else if (user === '' || pass === '') {
    result = "<span style='color: var(--warning-red)'>Error: Empty username or password</span>";
  } else {
    result = "<span style='color: var(--matrix-green)'>No documents found. Access denied.</span>";
  }

  responseDiv.innerHTML = result;
}

// Add line to terminal
function addTerminalLine(text) {
  const terminal = document.getElementById('terminalOutput');
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.textContent = text;
  terminal.appendChild(line);
  setTimeout(() => {
    line.style.opacity = '1';
  }, 100);
  terminal.scrollTop = terminal.scrollHeight;
}

// Reset form
function resetForm() {
  document.getElementById('nosql-username').value = '';
  document.getElementById('nosql-password').value = '';
  document.getElementById('nosql-response').innerHTML = 'Awaiting query execution...';
  addTerminalLine('> Form reset to default state');
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  createBinaryRain();
  
  // Attack buttons
  document.getElementById('bypassBtn').addEventListener('click', () => {
    loadNoSQLAttack('{ "username": { "$ne": null } }', 'Bypass Attack (Non-Equal Comparison)');
  });

  document.getElementById('trueBtn').addEventListener('click', () => {
    loadNoSQLAttack('{ "$or": [ {}, { "a": "a" } ] }', 'Always True (OR Condition)');
  });

  document.getElementById('regexBtn').addEventListener('click', () => {
    loadNoSQLAttack('{ "username": { "$regex": "^a" } }', 'Regex Attack (Pattern Matching)');
  });

  document.getElementById('jsInjectionBtn').addEventListener('click', () => {
    loadNoSQLAttack('{ "$where": "this.username == \'admin\'" }', 'JavaScript Injection ($where clause)');
  });

  document.getElementById('nullAttackBtn').addEventListener('click', () => {
    loadNoSQLAttack('{ "username": { "$gt": "" } }', 'Greater Than Attack (Empty String Comparison)');
  });

  document.getElementById('adminBtn').addEventListener('click', () => {
    document.getElementById('nosql-username').value = 'admin';
    document.getElementById('nosql-password').value = 'secret';
    addTerminalLine('> Loaded admin credentials (legitimate login attempt)');
  });

  document.getElementById('resetBtn').addEventListener('click', resetForm);
  document.getElementById('executeBtn').addEventListener('click', simulateNoSQLQuery);

  // Allow pressing Enter to execute query
  document.getElementById('nosql-password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      simulateNoSQLQuery();
    }
  });

  // Initial terminal animation
  const terminalLines = document.querySelectorAll('.terminal-line');
  terminalLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
    }, index * 500);
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  document.getElementById('binaryRain').innerHTML = '';
  createBinaryRain();
});