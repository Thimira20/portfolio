/**
 * Interactive Security Terminal Emulator: /dev/thimira
 * SecOps & Distributed Systems Engineering CLI
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const terminalForm = document.getElementById('terminal-form');
  const terminalChips = document.querySelectorAll('.term-chip');

  if (!terminalBody || !terminalInput || !terminalForm) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<div class="term-response">
  <div class="term-title">AVAILABLE COMMANDS:</div>
  <div class="term-grid">
    <span class="cmd-name">about</span><span class="cmd-desc">Display profile summary & engineering background</span>
    <span class="cmd-name">skills</span><span class="cmd-desc">List technical competencies across SecOps & Backend</span>
    <span class="cmd-name">repos</span><span class="cmd-desc">List featured repositories & architectures</span>
    <span class="cmd-name">scan</span><span class="cmd-desc">Initiate simulated security audit & protocol check</span>
    <span class="cmd-name">netstat</span><span class="cmd-desc">Inspect active network daemons & service ports</span>
    <span class="cmd-name">architecture</span><span class="cmd-desc">Display core architectural tenets & design patterns</span>
    <span class="cmd-name">contact</span><span class="cmd-desc">Fetch direct contact channels & social coordinates</span>
    <span class="cmd-name">whoami</span><span class="cmd-desc">Print current session role & permissions</span>
    <span class="cmd-name">clear</span><span class="cmd-desc">Clear the terminal screen buffer</span>
  </div>
</div>`,

    about: () => `
<div class="term-response">
  <div class="term-accent">═══ [ DOSSIER: T.N. PANDITHA ] ═══</div>
  <p><strong>Handle:</strong> Thimira20</p>
  <p><strong>Affiliation:</strong> Department of Computer Engineering</p>
  <p><strong>Specialization:</strong> Backend Developer | Network Security Engineer | Systems Programmer</p>
  <p class="term-dim">Engineering fault-tolerant distributed backends, robust network infrastructures, and zero-trust security architectures. Experienced with Apache Kafka event streaming, Ansible & Netmiko network automation, and SDVN cryptographic protocols.</p>
</div>`,

    skills: () => `
<div class="term-response">
  <div class="term-accent">═══ [ TECHNICAL CAPABILITY MATRIX ] ═══</div>
  <div class="term-sec">
    <div class="term-tag">[ NETWORK & SECURITY ENGINEERING ]</div>
    <div>• Protocols: TCP/IP, VLAN, L3 SVI, NAT, BGP/OSPF fundamentals</div>
    <div>• Automation: Ansible Playbooks, Netmiko Python Scripts</div>
    <div>• Perimeter: Access Control Lists (ACLs), Segmented Subnets, Zabbix Telemetry</div>
    <div>• Research: Software-Defined Vehicular Networks (SDVN), Cryptographic Handshakes</div>
  </div>
  <div class="term-sec">
    <div class="term-tag">[ DISTRIBUTED BACKEND & CLOUD ]</div>
    <div>• Streaming: Apache Kafka, Apache Avro Schemas, Pub-Sub Messaging</div>
    <div>• DevOps: Docker, Docker Compose, Jenkins CI/CD Pipelines</div>
    <div>• Web & Sockets: Node.js, Express, TypeScript, WebSockets, RESTful APIs</div>
  </div>
  <div class="term-sec">
    <div class="term-tag">[ SYSTEMS & DATA ]</div>
    <div>• Core Languages: Python, Java, C++, JavaScript, TypeScript, Dart, SQL</div>
    <div>• Systems: Custom Data Structures in native C++, Multithreaded Sockets, Linux</div>
  </div>
</div>`,

    repos: () => {
      const items = PORTFOLIO_DATA.projects.slice(0, 6).map(p => `
        <div class="repo-item">
          <span class="repo-n"><a href="${p.github}" target="_blank" rel="noopener">${p.name}</a></span>
          <span class="repo-c">[${p.categoryName}]</span>
          <div class="repo-d">${p.summary}</div>
        </div>
      `).join('');
      return `
<div class="term-response">
  <div class="term-accent">═══ [ TOP FEATURED REPOSITORIES (github.com/Thimira20) ] ═══</div>
  <div class="repo-list">${items}</div>
  <div class="term-dim">Type <em>open [repo-name]</em> or explore all 36+ repositories below!</div>
</div>`;
    },

    scan: () => `
<div class="term-response">
  <div class="term-accent">═══ [ EXECUTING SEC-AUDIT // TARGET: LOCALHOST ] ═══</div>
  <div class="term-log"><span class="log-ok">[OK]</span> TLS 1.3 Handshake: Validated (AES-256-GCM)</div>
  <div class="term-log"><span class="log-ok">[OK]</span> Port Segmentation: Strict ACL enforcement active</div>
  <div class="term-log"><span class="log-ok">[OK]</span> Schema Drift Check: Apache Avro contracts validated</div>
  <div class="term-log"><span class="log-ok">[OK]</span> Container Hardening: Docker non-root users configured</div>
  <div class="term-log"><span class="log-ok">[OK]</span> Telemetry: Zabbix SNMP Polling Active</div>
  <div class="term-highlight">AUDIT RESULT: 0 Critical Vulnerabilities · Zero-Trust Posture Compliant</div>
</div>`,

    netstat: () => `
<div class="term-response">
  <div class="term-accent">═══ [ ACTIVE NETWORK PROTOCOL SOCKETS ] ═══</div>
  <pre class="term-code">
Proto  Local Address          Foreign Address        State       Service
TCP    0.0.0.0:9092           0.0.0.0:*              LISTEN      kafka-broker
TCP    0.0.0.0:8080           0.0.0.0:*              LISTEN      docker-result-api
TCP    0.0.0.0:10050          0.0.0.0:*              LISTEN      zabbix-agentd
TCP    0.0.0.0:5000           0.0.0.0:*              LISTEN      sdvn-crypto-daemon
TCP    0.0.0.0:3000           0.0.0.0:*              LISTEN      websocket-hub
TCP    192.168.10.1:22        192.168.10.254:54321   ESTABLISHED netmiko-automation
  </pre>
</div>`,

    architecture: () => `
<div class="term-response">
  <div class="term-accent">═══ [ ARCHITECTURAL PRINCIPLES ] ═══</div>
  <p>1. <strong>Decoupled Asynchrony:</strong> Use event buses (Kafka) to decouple high-volume producers from ingestion bottlenecks.</p>
  <p>2. <strong>Zero-Trust Perimeter:</strong> Explicit ACLs and micro-segmentation across L2/L3 boundaries.</p>
  <p>3. <strong>Immutable Data Contracts:</strong> Avro schemas ensure downstream services never ingest malformed payloads.</p>
  <p>4. <strong>Infrastructure as Code:</strong> Ansible playbooks guarantee idempotent, drift-free network deployments.</p>
</div>`,

    contact: () => `
<div class="term-response">
  <div class="term-accent">═══ [ SECURE CHANNELS ] ═══</div>
  <p><strong>Email:</strong> <a href="mailto:thimirapanditha20@gmail.com" class="term-link">thimirapanditha20@gmail.com</a></p>
  <p><strong>GitHub:</strong> <a href="https://github.com/Thimira20" target="_blank" rel="noopener" class="term-link">https://github.com/Thimira20</a></p>
  <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/thimira-panditha" target="_blank" rel="noopener" class="term-link">https://linkedin.com/in/thimira-panditha</a></p>
  <p class="term-dim">PGP Key ID: 0x4E9B19C8 · Fingerprint: 7F4A C0D9 8B21 34E2 91A0</p>
</div>`,

    whoami: () => `
<div class="term-response">
  <span class="term-highlight">guest@thimira-secops-node</span> (UID=1001, GID=1001, Groups=recruiters,engineers,guests)
</div>`,

    sudo: () => `
<div class="term-response term-warn">
  [SECURITY ALERT] Incident reported to SecOps monitoring. Just kidding! User 'thimira' holds root authority.
</div>`,

    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Append user input line
    const inputLine = document.createElement('div');
    inputLine.className = 'term-line term-cmd-line';
    inputLine.innerHTML = `
      <span class="term-prompt">thimira@secops:~$</span>
      <span class="term-cmd-text">${escapeHtml(cmd)}</span>
    `;
    terminalBody.appendChild(inputLine);

    // Process command
    const lower = cmd.toLowerCase().trim();
    let responseHtml = '';

    if (COMMANDS[lower]) {
      responseHtml = COMMANDS[lower]();
    } else if (lower.startsWith('open ')) {
      const target = lower.replace('open ', '').trim();
      const proj = PORTFOLIO_DATA.projects.find(p => p.name.toLowerCase() === target || p.id.toLowerCase() === target);
      if (proj) {
        window.open(proj.github, '_blank');
        responseHtml = `<div class="term-response term-highlight">Opening repository ${proj.name} in new browser tab...</div>`;
      } else {
        responseHtml = `<div class="term-response term-warn">Repository '${target}' not found. Type 'repos' to see valid names.</div>`;
      }
    } else if (lower.startsWith('cat ')) {
      responseHtml = `<div class="term-response term-dim">Read-access granted. File content displayed in dossier section.</div>`;
    } else {
      responseHtml = `
        <div class="term-response term-warn">
          bash: ${escapeHtml(cmd)}: command not found. Type <span class="term-chip-inline">help</span> for valid commands.
        </div>
      `;
    }

    if (responseHtml) {
      const outputLine = document.createElement('div');
      outputLine.className = 'term-line term-output';
      outputLine.innerHTML = responseHtml;
      terminalBody.appendChild(outputLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = terminalInput.value;
    terminalInput.value = '';
    executeCommand(val);
  });

  // History navigation with Arrow keys
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Quick chips click
  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Initial welcome message
  const welcome = document.createElement('div');
  welcome.className = 'term-line term-output';
  welcome.innerHTML = `
    <div class="term-response">
      <div class="term-ascii">
   _____ _     _           _            ____               ___             
  |_   _| |__ (_)_ __ ___ (_)_ __ __ _ / ___|  ___  ___   / _ \\ _ __  ___  
    | | | '_ \\| | '_ \` _ \\| | '__/ _\` |\\___ \\ / _ \\/ __| | | | | '_ \\/ __| 
    | | | | | | | | | | | | | | | (_| | ___) |  __/ (__  | |_| | |_) \\__ \\ 
    |_| |_| |_|_|_| |_| |_|_|_|  \\__,_| |____/ \\___|\\___|  \\___/| .__/|___/ 
                                                                 |_|        
      </div>
      <p class="term-dim">SecOps Kernel v6.8.2-generic | Terminal session established.</p>
      <p>Welcome to Thimira's Interactive Security Console. Type <span class="term-chip-inline">help</span> or click the chips below to query system metrics.</p>
    </div>
  `;
  terminalBody.appendChild(welcome);
});
