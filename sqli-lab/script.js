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
  
  // Switch between attack tabs
  function openTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Deactivate all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Activate selected tab
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
  }
  
  // Load predefined attack
  function loadAttack(attack) {
    document.getElementById('username').value = attack;
    document.getElementById('password').value = 'password';
    addTerminalLine(`> Loaded attack pattern: ${attack}`);
  }
  
  // Execute the SQL query simulation
  function executeQuery() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    addTerminalLine(`> Executing: SELECT * FROM users WHERE username='${username}' AND password='${password}'`);
    
    // Simulate different responses based on input
    let response = "";
    const responseArea = document.getElementById('responseContent');
    const terminal = document.getElementById('terminalOutput');
    
    // Check for different types of attacks
    if (username.includes("' OR '1'='1") || 
        username.includes("' --") || 
        username.includes("1=1") ||
        username.includes("' OR 1=1 --")) {
      // Login bypass attacks
      response = `
        <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
        <span style="color: var(--hacker-green)">Query executed successfully!</span><br>
        <span style="color: var(--cyber-blue)">Returned all user records:</span><br><br>
        ID: 1 | Username: admin | Password: S3cr3tP@ss<br>
        ID: 2 | Username: user1 | Password: password123<br>
        ID: 3 | Username: test | Password: test123<br>
      `;
      addTerminalLine(`> <span style="color: var(--warning-red)">SECURITY BREACH!</span> Database records exposed`);
    } 
    else if (username.includes("UNION SELECT")) {
      // Data extraction attacks
      if (username.includes("information_schema.tables")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Database tables exposed:</span><br><br>
          users<br>
          products<br>
          orders<br>
          customers<br>
          system_logs<br>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">DATABASE STRUCTURE LEAKED!</span> Table names extracted`);
      }
      else if (username.includes("information_schema.columns")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Table columns exposed:</span><br><br>
          users.id<br>
          users.username<br>
          users.password<br>
          users.email<br>
          users.is_admin<br>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">DATABASE STRUCTURE LEAKED!</span> Column names extracted`);
      }
      else if (username.includes("FROM users")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">User credentials dumped:</span><br><br>
          admin:S3cr3tP@ss<br>
          user1:password123<br>
          test:test123<br>
          backup:Backup@123<br>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">CRITICAL BREACH!</span> User credentials extracted`);
      }
      else {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">UNION attack successful</span><br>
          Columns count: 3<br>
          Vulnerable columns: 1, 2, 3<br>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">INJECTION SUCCESSFUL!</span> UNION attack worked`);
      }
    }
    else if (username.includes("DROP TABLE") || 
             username.includes("UPDATE users") || 
             username.includes("INSERT INTO users") ||
             username.includes("xp_cmdshell")) {
      // Database exploitation attacks
      if (username.includes("DROP TABLE")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Table dropped successfully!</span><br>
          The 'users' table has been deleted from the database.<br>
          <span style="color: var(--warning-red)">All user data lost!</span>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">DESTRUCTIVE ATTACK!</span> Table dropped`);
      }
      else if (username.includes("UPDATE users")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Data modified successfully!</span><br>
          Admin password changed to 'hacked'.<br>
          <span style="color: var(--warning-red)">System compromised!</span>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">DATA MODIFIED!</span> Admin credentials changed`);
      }
      else if (username.includes("INSERT INTO users")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">New user created!</span><br>
          Added user 'attacker' with password 'pwned'.<br>
          <span style="color: var(--warning-red)">Backdoor installed!</span>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">UNAUTHORIZED ACCESS!</span> New user added`);
      }
      else if (username.includes("xp_cmdshell")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Command executed!</span><br>
          System command 'calc.exe' launched on server.<br>
          <span style="color: var(--warning-red)">RCE achieved!</span>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">REMOTE CODE EXECUTION!</span> Calculator opened on server`);
      }
      else if (username.includes("WAITFOR DELAY")) {
        response = `
          <span style="color: var(--warning-red)">[!] SQL INJECTION DETECTED</span><br><br>
          <span style="color: var(--hacker-green)">Time delay detected!</span><br>
          The server responded after 5 seconds delay.<br>
          <span style="color: var(--warning-red)">Blind SQLi possible!</span>
        `;
        addTerminalLine(`> <span style="color: var(--warning-red)">BLIND INJECTION!</span> Time delay detected`);
      }
    }
    else if (username === 'admin' && password === 'password') {
      // Normal login
      response = `
        <span style="color: var(--hacker-green)">Login successful!</span><br>
        Welcome back, admin.
      `;
      addTerminalLine(`> Authentication successful for user: admin`);
    } else {
      // Failed login
      response = `
        <span style="color: var(--warning-red)">Login failed!</span><br>
        Invalid username or password.
      `;
      addTerminalLine(`> Authentication failed for provided credentials`);
    }
    
    responseArea.innerHTML = response;
    
    // Add breach effect for any successful injection
    if (response.includes("[!] SQL INJECTION DETECTED")) {
      document.querySelector('.cyber-terminal').classList.add('breach-effect');
      setTimeout(() => {
        document.querySelector('.cyber-terminal').classList.remove('breach-effect');
      }, 1500);
    }
    
    // Auto-scroll terminal
    terminal.scrollTop = terminal.scrollHeight;
  }
  
  // Add line to terminal
  function addTerminalLine(text) {
    const terminal = document.getElementById('terminalOutput');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `> ${text}`;
    terminal.appendChild(line);
  }
  
  // Initialize on load
  window.addEventListener('load', () => {
    createBinaryRain();
    
    // Add initial terminal lines with delay
    setTimeout(() => {
      addTerminalLine("System ready");
      addTerminalLine("Type commands or test the login form below");
    }, 1500);
  });