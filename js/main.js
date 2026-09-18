/**
 * Main Interactive Application Script: Thimira Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initNavigation();
  initStatsCounter();
  initSkillsMatrix();
  initProjects();
  initProjectModal();
  initContactForm();
  initAudioBeep();
});

/* -------------------------------------------------------------
 * 1. Cyber Mesh / Packet Canvas Background
 * ----------------------------------------------------------- */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? '#00f5a0' : (Math.random() > 0.5 ? '#00d2ff' : '#6366f1')
    });
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.strokeStyle = `rgba(0, 245, 160, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      const mdx = nodes[i].x - mouse.x;
      const mdy = nodes[i].y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 160) {
        const mAlpha = (1 - mdist / 160) * 0.4;
        ctx.strokeStyle = `rgba(0, 210, 255, ${mAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Draw and move nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0) node.x = width;
      if (node.x > width) node.x = 0;
      if (node.y < 0) node.y = height;
      if (node.y > height) node.y = 0;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = node.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

/* -------------------------------------------------------------
 * 2. Navigation & Mobile Drawer & Active Spy
 * ----------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('main-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 3. Animated Stat Counters
 * ----------------------------------------------------------- */
function initStatsCounter() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer || !PORTFOLIO_DATA.stats) return;

  statsContainer.innerHTML = PORTFOLIO_DATA.stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon-wrapper">
        <span class="stat-glyph">${getStatIcon(s.icon)}</span>
      </div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function getStatIcon(icon) {
  switch (icon) {
    case 'code':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    case 'shield':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    case 'server':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
    case 'cpu':
      return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`;
    default:
      return `●`;
  }
}

/* -------------------------------------------------------------
 * 4. Technical Skills Matrix
 * ----------------------------------------------------------- */
function initSkillsMatrix() {
  const container = document.getElementById('skills-matrix-grid');
  if (!container || !PORTFOLIO_DATA.skillsMatrix) return;

  const categories = Object.keys(PORTFOLIO_DATA.skillsMatrix);

  container.innerHTML = categories.map(cat => {
    const items = PORTFOLIO_DATA.skillsMatrix[cat];
    const itemsHtml = items.map(skill => `
      <div class="skill-row">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: ${skill.level}%;"></div>
        </div>
      </div>
    `).join('');

    return `
      <div class="skill-category-card">
        <div class="skill-cat-header">
          <span class="cyber-dot"></span>
          <h3 class="skill-cat-title">${cat}</h3>
        </div>
        <div class="skill-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');
}

/* -------------------------------------------------------------
 * 5. Repository Filtering & Rendering
 * ----------------------------------------------------------- */
let currentCategory = 'all';
let currentSearch = '';

function initProjects() {
  const grid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('repo-search-input');
  const countDisplay = document.getElementById('repo-count-badge');

  if (!grid || !PORTFOLIO_DATA.projects) return;

  function render() {
    let filtered = PORTFOLIO_DATA.projects;

    if (currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === currentCategory);
    }

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      );
    }

    if (countDisplay) {
      countDisplay.textContent = `SHOWING ${filtered.length} OF ${PORTFOLIO_DATA.projects.length} REPOSITORIES`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-projects">
          <div class="no-proj-icon">⚠️</div>
          <h3>No matching repositories found</h3>
          <p>Try refining your search keyword or switching category filter.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <div class="project-card ${p.featured ? 'featured-card' : ''}" data-id="${p.id}">
        <div class="card-glow"></div>
        <div class="card-header">
          <span class="cat-badge cat-${p.category}">${p.categoryName}</span>
          ${p.featured ? '<span class="feat-badge"><span class="pulse-dot"></span>FEATURED ARCHITECTURE</span>' : ''}
        </div>
        <h3 class="card-title">${p.name}</h3>
        <h4 class="card-subtitle">${p.title}</h4>
        <p class="card-summary">${p.summary}</p>
        
        <div class="tech-stack">
          ${p.tech.slice(0, 5).map(t => `<span class="tech-pill">${t}</span>`).join('')}
          ${p.tech.length > 5 ? `<span class="tech-pill more">+${p.tech.length - 5}</span>` : ''}
        </div>

        <div class="card-actions">
          <a href="${p.github}" target="_blank" rel="noopener" class="btn-card-gh">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>Source</span>
          </a>
          
          ${p.live ? `
            <a href="${p.live}" target="_blank" rel="noopener" class="btn-card-live">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Demo</span>
            </a>
          ` : ''}

          <button class="btn-card-modal" onclick="openProjectModal('${p.id}')">
            <span>Dossier</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Filter button click handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      render();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      render();
    });
  }

  render();
}

/* -------------------------------------------------------------
 * 6. Project Architecture Dossier Modal
 * ----------------------------------------------------------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const overlay = document.getElementById('modal-backdrop');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  window.openProjectModal = function(id) {
    const proj = PORTFOLIO_DATA.projects.find(p => p.id === id);
    if (!proj) return;

    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalBody = document.getElementById('modal-content-area');
    const modalGh = document.getElementById('modal-gh-link');
    const modalLive = document.getElementById('modal-live-link');

    if (modalTitle) modalTitle.textContent = proj.name;
    if (modalSubtitle) modalSubtitle.textContent = proj.title;

    if (modalGh) {
      modalGh.href = proj.github;
      modalGh.style.display = 'inline-flex';
    }

    if (modalLive) {
      if (proj.live) {
        modalLive.href = proj.live;
        modalLive.style.display = 'inline-flex';
      } else {
        modalLive.style.display = 'none';
      }
    }

    let archHtml = '';
    if (proj.architecture) {
      archHtml = `
        <div class="modal-section">
          <h4 class="modal-sec-title">PROBLEM STATEMENT</h4>
          <p class="modal-sec-text">${proj.architecture.problem || proj.summary}</p>
        </div>

        <div class="modal-section">
          <h4 class="modal-sec-title">ENGINEERING & SECURITY ARCHITECTURE</h4>
          <ul class="modal-highlights">
            ${(proj.architecture.highlights || []).map(h => `<li><span class="bullet-glyph">▹</span><span>${h}</span></li>`).join('')}
          </ul>
        </div>
      `;
    } else {
      archHtml = `
        <div class="modal-section">
          <h4 class="modal-sec-title">PROJECT SUMMARY</h4>
          <p class="modal-sec-text">${proj.summary}</p>
        </div>
      `;
    }

    const techHtml = `
      <div class="modal-section">
        <h4 class="modal-sec-title">SYSTEM TECH STACK</h4>
        <div class="modal-tech-pills">
          ${proj.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
        </div>
      </div>
    `;

    if (modalBody) {
      modalBody.innerHTML = archHtml + techHtml;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
}

/* -------------------------------------------------------------
 * 7. Contact Form & Clipboard Copy
 * ----------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const copyBtns = document.querySelectorAll('.copy-trigger');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('c-name')?.value;
      const email = document.getElementById('c-email')?.value;
      const subject = document.getElementById('c-subject')?.value || 'Engineering Inquiry';
      const msg = document.getElementById('c-message')?.value;

      // Construct mailto
      const bodyText = `From: ${name} (${email})\n\n${msg}`;
      const mailtoUrl = `mailto:thimirapanditha20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      showToast("Launching default mail client...");
      window.location.href = mailtoUrl;
    });
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${textToCopy} to clipboard!`);
        });
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }
}

/* -------------------------------------------------------------
 * 8. Optional Subtle Audio Feedback (Synthesized Web Audio)
 * ----------------------------------------------------------- */
function initAudioBeep() {
  let audioCtx = null;

  function playCyberClick() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio not supported or blocked, ignore gracefully
    }
  }

  // Bind subtle click to buttons and chips
  document.querySelectorAll('button, .term-chip, .filter-btn').forEach(elem => {
    elem.addEventListener('click', playCyberClick);
  });
}
