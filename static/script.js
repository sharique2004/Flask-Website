// Enhanced Interactive Logic with Mobile Support and Backend /ask Integration

let isStarted = false;
let pressedKeys = new Set();
let isMobile = window.innerWidth <= 768;

// Fit the desktop gaming setup to current viewport by adjusting --setup-scale
function fitSetupToViewport() {
  try {
    // Skip on mobile layout (we render a different UI there)
    if (window.innerWidth <= 768) {
      document.documentElement.style.setProperty('--setup-scale', '1');
      return;
    }

    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const px = (name) => parseFloat(cs.getPropertyValue(name)) || 0;

    // Base scene dimensions from CSS variables (must match styles.css calc)
    const baseWidth  = px('--monitor-w') + px('--mousepad-gap-x') + px('--mousepad-w') + 80;
    const baseHeight = px('--monitor-h') + px('--periph-gap-y') + px('--keyboard-h') + 120;

    // Leave a small margin so shadows/blur aren’t clipped
    const availW = Math.max(0, window.innerWidth  - 24);
    const availH = Math.max(0, window.innerHeight - 24);

    const scaleX = availW / baseWidth;
    const scaleY = availH / baseHeight;
    const scale = Math.min(1, scaleX, scaleY);

    root.style.setProperty('--setup-scale', scale.toFixed(3));
  } catch (e) {
    // No-op on any unexpected error; default scale is 1
  }
}

// -------- Knowledge base (fallback for /ask) --------
const knowledgeBase = {
  skills: "I'm proficient in Python, Java, C, C++, C#, SQL, JavaScript, HTML/CSS. I work with React, Node.js, .NET, Django, Flask, and have experience with Azure DevOps, Docker, Git, MongoDB, and PostgreSQL. In AI/ML, I use LangChain, OpenAI API, Cohere, and TensorFlow.",
  experience: "I'm currently a Software Engineering Intern at WellX AI, modernizing systems with Python and SQL. Previously, I was a Data Science Intern at Forth Square working with Azure and AI APIs. I also grade CS assignments at Penn State and led teams at Starbucks.",
  education: "I'm pursuing a B.S. in Computer Science with a Cybersecurity minor at Penn State (graduating May 2026). I maintain a 3.6 GPA and have been on the Dean's List multiple times. I graduated from high school in Dubai with a 3.8 GPA.",
  projects: "Key projects: AI-Powered Travel Planner (React + LangChain), Smart Recipe Generator (ChatGPT API), YouTube Transcriber, custom compiler components (lexer/parser), and this interactive portfolio.",
  internships: "Penn State ORIS (DevOps, current) with C# .NET and Azure DevOps; Forth Square (Data Science) with cloud and AI app development.",
  achievements: "Runner-up for Most Innovative Idea at EXPO 2020 Dubai; multiple Dean's List awards; bilingual in English and Hindi; Azure Fundamentals (in progress).",
  contact: "Reach me at sharique.khatri@gmail.com or (814) 769-0678. Based in State College, PA during the academic year.",
  background: "Originally from Dubai, UAE. Passionate about AI, full-stack, and creative problem-solving.",
  future: "Open to SWE roles in AI/ML apps, full-stack, or DevOps at companies building cutting-edge tech.",
  languages: "Fluent in English and Hindi. Programming: strongest in Python and JS; also Java, C, C++, C#, SQL."
};

// Check if mobile on resize
function checkMobile() {
  const wasMobile = isMobile;
  // Keep the breakpoint consistent with CSS media query (<=768px)
  isMobile = window.innerWidth <= 768;
  
  if (wasMobile !== isMobile && isStarted) {
    // Re-initialize for new screen size
    setTimeout(() => {
      if (!isMobile) {
        initializeKeyboard();
        initMouseMapping();
        // Reset timeline accordion when switching to desktop
        resetMobileTimelineAccordion();
      } else {
        // Initialize timeline accordion when switching to mobile
        initMobileTimelineAccordion();
      }
    }, 100);
  }

  // Always recompute scale on resize/orientation change
  fitSetupToViewport();
}

// Reset timeline accordion for desktop view
function resetMobileTimelineAccordion() {
  const timelineContainer = document.querySelector('.timeline-container');
  if (!timelineContainer) return;
  
  // Remove accordion class
  timelineContainer.classList.remove('mobile-accordion');
  
  // Show all timeline items
  const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.classList.remove('mobile-visible');
  });
  
  // Remove toggle button if it exists
  const toggleButton = timelineContainer.querySelector('.mobile-timeline-toggle');
  if (toggleButton) {
    toggleButton.remove();
  }
}

window.addEventListener('resize', checkMobile);
window.addEventListener('orientationchange', () => {
  setTimeout(checkMobile, 100);
});

// Initial scale computation
window.addEventListener('load', fitSetupToViewport);

function startExperience() {
  isStarted = true;
  const startScreen = document.getElementById('startScreen');
  const gamingSetup = document.getElementById('gamingSetup');

  if (isMobile) {
    if (startScreen) startScreen.style.display = 'none';
    gamingSetup.classList.add('visible');
  } else {
    startScreen.classList.add('hidden');
  }
  setTimeout(() => {
    gamingSetup.classList.add('visible');
    
    // Initialize desktop features only if not mobile
    if (!isMobile) {
      initializeKeyboard();
      initMouseMapping();
      // Ensure the setup fits after becoming visible (desktop only)
      fitSetupToViewport();
    }
    
    // Initialize time display for both desktop and mobile
    updateTime();
    setInterval(updateTime, 1000);
  }, 400);
}

function initializeKeyboard() {
  if (isMobile) return; // Skip on mobile
  
  const keyboard = document.getElementById('keyboard');
  if (!keyboard) return;
  
  // Clear existing content
  keyboard.innerHTML = '';
  
  const rows = [
    ['ESC','1','2','3','4','5','6','7','8','9','0','-','='],
    ['TAB','Q','W','E','R','T','Y','U','I','O','P','[',']'],
    ['CAPS','A','S','D','F','G','H','J','K','L',';',"'"],
    ['SHIFT','Z','X','C','V','B','N','M',',','.','/','SHIFT']
  ];
  
  rows.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    
    row.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'key';
      keyDiv.textContent = key;
      keyDiv.dataset.key = key.toLowerCase();
      
      if (['TAB','CAPS','SHIFT'].includes(key)) {
        keyDiv.style.width = '60px';
      }
      if (key === 'ESC') {
        keyDiv.style.width = '50px';
      }
      
      rowDiv.appendChild(keyDiv);
    });
    
    keyboard.appendChild(rowDiv);
  });
  
  // Add spacebar
  const spaceRow = document.createElement('div');
  spaceRow.className = 'keyboard-row';
  const space = document.createElement('div');
  space.className = 'key space';
  space.textContent = 'SPACE';
  space.dataset.key = ' ';
  spaceRow.appendChild(space);
  keyboard.appendChild(spaceRow);
}

// Enhanced Mouse mapping with better mobile detection
function initMouseMapping() {
  if (isMobile) return; // Skip on mobile
  
  const screen = document.getElementById('screen');
  const pad = document.getElementById('mousepad');
  const vMouse = document.getElementById('virtualMouse');
  const follower = document.querySelector('.cursor-follower');
  
  if (!screen || !pad || !vMouse || !follower) return;

  // Show follower and hide OS cursor only over the screen on desktop
  screen.addEventListener('pointerenter', () => {
    if (!isMobile) {
      document.body.classList.add('screen-hover');
    }
  });
  
  screen.addEventListener('pointerleave', () => {
    document.body.classList.remove('screen-hover');
  });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // Virtual mouse position (for the mousepad)
  let vMouseTarget = { x: 10, y: 10 };
  let vMouseCurrent = { x: 10, y: 10 };
  
  // Cursor follower position (on screen)
  let followerTarget = { x: 0, y: 0 };
  let followerCurrent = { x: 0, y: 0 };

  // Animation loop - smooth interpolation for both cursors
  function animate() {
    // Smooth virtual mouse movement (higher factor = more responsive)
    vMouseCurrent.x += (vMouseTarget.x - vMouseCurrent.x) * 0.4;
    vMouseCurrent.y += (vMouseTarget.y - vMouseCurrent.y) * 0.4;

    // Preserve 3D lift so it doesn't "pop" under other elements
    vMouse.style.transform = 
      `translate(${vMouseCurrent.x}px, ${vMouseCurrent.y}px) translateZ(calc(var(--scene-z-lift) + 1px))`;
    
    // Smooth cursor follower movement (very responsive)
    followerCurrent.x += (followerTarget.x - followerCurrent.x) * 0.5;
    followerCurrent.y += (followerTarget.y - followerCurrent.y) * 0.5;
    
    follower.style.transform = `translate(${followerCurrent.x}px, ${followerCurrent.y}px)`;
    
    requestAnimationFrame(animate);
  }
  animate();

  screen.addEventListener('pointermove', (e) => {
    if (isMobile) return; // Skip on mobile
    
    // Update cursor follower target (using transform for smoothness)
    followerTarget.x = e.clientX - 15;
    followerTarget.y = e.clientY - 15;

    // Normalize cursor inside the monitor screen
    const s = screen.getBoundingClientRect();
    const nx = clamp((e.clientX - s.left) / s.width, 0, 1);
    const ny = clamp((e.clientY - s.top) / s.height, 0, 1);

    // Pad inner bounds
    const w = pad.clientWidth;
    const h = pad.clientHeight;
    const cs = getComputedStyle(pad);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padT = parseFloat(cs.paddingTop) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    const padB = parseFloat(cs.paddingBottom) || 0;

    const vmW = vMouse.offsetWidth || 50;
    const vmH = vMouse.offsetHeight || 70;

    const minX = padL;
    const maxX = w - padR - vmW;
    const minY = padT;
    const maxY = h - padB - vmH;

    vMouseTarget.x = clamp(minX + nx * (maxX - minX), minX, maxX);
    vMouseTarget.y = clamp(minY + ny * (maxY - minY), minY, maxY);
  });

  screen.addEventListener('pointerdown', () => {
    if (!isMobile) vMouse.classList.add('clicked');
  });
  
  screen.addEventListener('pointerup', () => {
    vMouse.classList.remove('clicked');
  });
}

// Key press visuals (desktop only)
document.addEventListener('keydown', (e) => {
  if (!isStarted || isMobile) return;
  
  let k = e.key.toLowerCase();
  if (e.key === ' ') k = ' ';
  else if (e.key === 'Enter') k = 'enter';
  else if (e.key === 'Backspace') k = 'backspace';
  else if (e.key === 'Tab') k = 'tab';
  else if (e.key === 'CapsLock') k = 'caps';
  else if (e.key === 'Shift') k = 'shift';
  else if (e.key === 'Escape') k = 'esc';
  
  const el = document.querySelector(`[data-key="${k}"]`);
  if (el && !pressedKeys.has(k)) {
    el.classList.add('pressed');
    pressedKeys.add(k);
  }
});

document.addEventListener('keyup', (e) => {
  if (!isStarted || isMobile) return;
  
  let k = e.key.toLowerCase();
  if (e.key === ' ') k = ' ';
  else if (e.key === 'Enter') k = 'enter';
  else if (e.key === 'Backspace') k = 'backspace';
  else if (e.key === 'Tab') k = 'tab';
  else if (e.key === 'CapsLock') k = 'caps';
  else if (e.key === 'Shift') k = 'shift';
  else if (e.key === 'Escape') k = 'esc';
  
  const el = document.querySelector(`[data-key="${k}"]`);
  if (el) {
    el.classList.remove('pressed');
    pressedKeys.delete(k);
  }
});

// Clock function with mobile support
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  // Update desktop time display
  const desktopTime = document.getElementById('timeDisplay');
  if (desktopTime) desktopTime.textContent = timeString;
  
  // Update mobile time display
  const mobileTime = document.getElementById('mobileTimeDisplay');
  if (mobileTime) mobileTime.textContent = timeString;
}

// Enhanced app window management with mobile support
function openApp(name) {
  // Mobile: sections are always visible; navigate via anchors
  if (isMobile) {
    const target = document.getElementById(`${name}-app`);
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  // Desktop window behavior
  // Ensure app container lives inside the monitor screen
  const appContainer = document.querySelector('.app-container');
  const screenEl = document.getElementById('screen');
  if (appContainer && screenEl && appContainer.parentElement !== screenEl) {
    screenEl.appendChild(appContainer);
    appContainer.style.position = 'absolute';
    appContainer.style.inset = '0';
    appContainer.style.zIndex = '2';
  }

  document.querySelectorAll('.app-window').forEach(w => w.style.display = 'none');
  const icons = document.querySelector('.app-icons');
  if (icons) icons.style.display = 'none';
  if (appContainer) appContainer.style.pointerEvents = 'auto';

  const appWindow = document.getElementById(`${name}-app`);
  if (appWindow) {
    appWindow.style.display = 'flex';
    appWindow.classList.remove('window-enter');
    void appWindow.offsetWidth; // Force reflow
    appWindow.classList.add('window-enter');
    if (name === 'ai') {
      setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) chatInput.focus();
      }, 300);
    }
  }
}

function closeApp() {
  if (isMobile) return; // No-op in single-page mobile layout

  // Desktop: close floating window
  document.querySelectorAll('.app-window').forEach(w => {
    w.style.animation = 'window-close .3s ease';
    setTimeout(() => {
      w.style.display = 'none';
      w.style.animation = '';
    }, 300);
  });
  const icons = document.querySelector('.app-icons');
  if (icons) {
    setTimeout(() => { icons.style.display = 'grid'; }, 300);
  }
  const appContainer = document.querySelector('.app-container');
  if (appContainer) appContainer.style.pointerEvents = 'none';
}

// Close animation styles
const closeAnimationStyle = document.createElement('style');
closeAnimationStyle.textContent = `
  @keyframes window-close {
    from {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
    to {
      transform: scale(.8) translateY(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(closeAnimationStyle);

// Backend Q&A with enhanced error handling
async function askBackend(query) {
  try {
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    if (data && data.answer) {
      return data.answer;
    }
    
    throw new Error('Malformed response');
  } catch (error) {
    console.warn('Falling back to local AI:', error.message || error);
    return generateAIResponse(query);
  }
}

// Enhanced local AI response generation
function generateAIResponse(query) {
  const q = (query || '').toLowerCase();
  
  // Check for multiple keywords and provide more comprehensive responses
  if (q.includes('skill') || q.includes('tech') || q.includes('programming') || q.includes('language')) {
    return knowledgeBase.skills;
  }
  
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('professional')) {
    return knowledgeBase.experience;
  }
  
  if (q.includes('intern')) {
    return knowledgeBase.internships;
  }
  
  if (q.includes('education') || q.includes('school') || q.includes('university') || q.includes('gpa') || q.includes('degree') || q.includes('penn state')) {
    return knowledgeBase.education;
  }
  
  if (q.includes('project') || q.includes('build') || q.includes('portfolio') || q.includes('github')) {
    return knowledgeBase.projects;
  }
  
  if (q.includes('achievement') || q.includes('award') || q.includes('expo') || q.includes('dean')) {
    return knowledgeBase.achievements;
  }
  
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire')) {
    return knowledgeBase.contact;
  }
  
  if (q.includes('background') || q.includes('about') || q.includes('dubai') || q.includes('personal')) {
    return knowledgeBase.background;
  }
  
  if (q.includes('future') || q.includes('opportunity') || q.includes('goal') || q.includes('career')) {
    return knowledgeBase.future;
  }
  
  if (q.includes('language') && (q.includes('speak') || q.includes('fluent') || q.includes('hindi') || q.includes('english'))) {
    return knowledgeBase.languages;
  }
  
  // Greeting responses
  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greet')) {
    return "Hello! I'm Sharique's AI assistant. I can tell you about his skills, experience, projects, education, and more. What would you like to know?";
  }
  
  if (q.includes('thank')) {
    return "You're welcome! Is there anything else you'd like to know about Sharique?";
  }
  
  // Default response
  return "I'm Sharique's AI assistant. I can help you learn about his skills, projects, work experience, education, or background. What specific area interests you?";
}

// Enhanced chat functionality with mobile optimizations
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = (input.value || '').trim();
  
  if (!message) return;
  
  const chatMessages = document.getElementById('chatMessages');
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <strong>You:</strong> ${escapeHtml(message)}
    </div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Clear input
  input.value = '';
  
  // Add typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'message ai-message typing-indicator';
  typingIndicator.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <strong>AI Assistant:</strong> 
      <span class="typing-dots">
        <span></span><span></span><span></span>
      </span>
    </div>
  `;
  chatMessages.appendChild(typingIndicator);
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  try {
    // Get AI response
    const reply = await askBackend(message);
    
    // Remove typing indicator
    typingIndicator.remove();
    
    // Add AI response
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <strong>AI Assistant:</strong> ${formatAIResponse(reply)}
      </div>
    `;
    chatMessages.appendChild(aiMessage);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
  } catch (error) {
    // Remove typing indicator and show error
    typingIndicator.remove();
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message ai-message';
    errorMessage.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <strong>AI Assistant:</strong> Sorry, I'm having trouble processing your request right now. Please try again.
      </div>
    `;
    chatMessages.appendChild(errorMessage);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Function to format AI response (convert markdown to HTML)
function formatAIResponse(text) {
  // First escape HTML
  let formatted = escapeHtml(text);
  
  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Convert numbered lists (1. 2. etc) to line breaks
  formatted = formatted.replace(/(\d+\.\s)/g, '<br>$1');
  
  // Convert bullet points (- or •) to line breaks
  formatted = formatted.replace(/(\n|^)([-•]\s)/g, '<br>$2');
  
  // Remove leading <br> if present
  formatted = formatted.replace(/^<br>/, '');
  
  // Convert newlines to <br>
  formatted = formatted.replace(/\n/g, '<br>');
  
  return formatted;
}

// Enhanced chat input handling
function handleChatEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
}

// Mobile-specific touch event handlers
function addMobileTouchSupport() {
  if (!isMobile) return;
  
  // Add touch feedback for interactive elements
  const touchElements = document.querySelectorAll('.nav-app, .app-icon, .close-btn, .suggestion-chip, button, .mobile-topbar .navlink, .btn-primary, .btn-secondary');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
    
    element.addEventListener('touchcancel', function() {
      this.style.transform = '';
    }, { passive: true });
  });
}

// Handle back button on mobile
function handleMobileBack() {
  if (isMobile) {
    // Check if any app is open
    const openApps = document.querySelectorAll('.app-window[style*="flex"]');
    if (openApps.length > 0) {
      closeApp();
      return true;
    }
  }
  return false;
}

// Add mobile back button support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMobile) {
    handleMobileBack();
  }
});

// Prevent zoom on double tap for better mobile experience
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Set up start button
  const startScreen = document.getElementById('startScreen');
  // Click anywhere on the overlay to enter
  if (startScreen) {
    startScreen.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'startBtn') return;
      startExperience();
    });

    startScreen.addEventListener('keydown', (e) => {
      if (e.key === 'Enter', 'Return') startExperience();
    });
  }
  // Click anywhere on the overlay to enter
  if (startScreen) {
    startScreen.addEventListener('click', (e) => {
      // avoid double-trigger if they click the button itself
      if (e.target && e.target.id === 'startBtn') return;
      startExperience();
    });

    // Press Enter to enter (since we set tabindex in HTML)
    startScreen.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') startExperience();
    });
  }
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startExperience();
    });
  }
  
  // Initialize mobile support
  checkMobile();
  addMobileTouchSupport();
  
  // Initialize mobile timeline accordion
  if (isMobile) {
    initMobileTimelineAccordion();
  }

  // Move the app container into the monitor screen on desktop so windows don't
  // overlay the entire page. Disable pointer events by default so clicks
  // pass through to the icons until an app is opened. When an app opens,
  // pointer events will be re-enabled in openApp(), and disabled again in closeApp().
  const appContainer = document.querySelector('.app-container');
  const screenEl = document.getElementById('screen');
  if (!isMobile && appContainer && screenEl) {
    screenEl.appendChild(appContainer);
    appContainer.style.position = 'absolute';
    appContainer.style.inset = '0';
    appContainer.style.zIndex = '2';
    appContainer.style.pointerEvents = 'none';
  } else if (isMobile && appContainer) {
    // Mobile single-page: use normal flow and interactivity
    appContainer.style.position = 'static';
    appContainer.style.inset = '';
    appContainer.style.zIndex = '';
    appContainer.style.pointerEvents = 'auto';
  }
  
  // Add viewport height fix for mobile browsers
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 100);
  });

  // Auto-start on mobile (no overlay)
  if (isMobile) startExperience();

  // Mobile scroll spy for topbar links + scroll progress indicator
  if (isMobile) {
    const links = Array.from(document.querySelectorAll('.mobile-navlinks .navlink'));
    const sections = links.map(a => ({ id: a.getAttribute('href').slice(1), el: document.getElementById(a.getAttribute('href').slice(1)), link: a }));
    const activate = (id) => links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    const scrollProgress = document.getElementById('scrollProgress');
    
    const onScroll = () => {
      // Scroll spy
      let current = sections[0]?.id;
      const offset = 90;
      for (const s of sections) {
        if (!s.el) continue;
        const rect = s.el.getBoundingClientRect();
        if (rect.top <= offset) current = s.id;
      }
      if (current) activate(current);
      
      // Scroll progress indicator
      if (scrollProgress) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = scrollPercent + '%';
      }
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});

// Mobile Timeline Accordion functionality
function initMobileTimelineAccordion() {
  const timelineContainer = document.querySelector('.timeline-container');
  if (!timelineContainer) return;
  
  // Check if already initialized
  if (timelineContainer.classList.contains('mobile-accordion')) return;
  
  const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
  if (timelineItems.length === 0) return;
  
  // Add accordion class to container
  timelineContainer.classList.add('mobile-accordion');
  
  // Show only the first (most recent) item initially
  timelineItems.forEach((item, index) => {
    if (index === 0) {
      item.classList.add('mobile-visible');
    } else {
      item.classList.remove('mobile-visible');
    }
  });
  
  // Check if toggle button already exists
  let toggleButton = timelineContainer.querySelector('.mobile-timeline-toggle');
  if (!toggleButton) {
    // Create and add the "Show More" button
    toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-timeline-toggle';
    toggleButton.innerHTML = '<span>Show More Experience</span><span class="toggle-icon">▼</span>';
    toggleButton.setAttribute('aria-expanded', 'false');
    
    // Track expansion state
    let isExpanded = false;
    
    toggleButton.addEventListener('click', () => {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        // Show all timeline items
        timelineItems.forEach(item => {
          item.classList.add('mobile-visible');
        });
        toggleButton.innerHTML = '<span>Show Less</span><span class="toggle-icon">▼</span>';
        toggleButton.classList.add('expanded');
        toggleButton.setAttribute('aria-expanded', 'true');
      } else {
        // Show only the first item
        timelineItems.forEach((item, index) => {
          if (index === 0) {
            item.classList.add('mobile-visible');
          } else {
            item.classList.remove('mobile-visible');
          }
        });
        toggleButton.innerHTML = '<span>Show More Experience</span><span class="toggle-icon">▼</span>';
        toggleButton.classList.remove('expanded');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Append button after the timeline items
    timelineContainer.appendChild(toggleButton);
  }
}

// Service worker registration for mobile PWA capabilities (optional)
if ('serviceWorker' in navigator && isMobile) {
  window.addEventListener('load', () => {
    // You can add service worker registration here if you create one
    console.log('Mobile PWA features available');
  });
}

// Performance optimization for mobile
if (isMobile) {
  // Reduce animation intensity on mobile for better performance
  document.documentElement.style.setProperty('--reduced-motion', '1');
  
  // Add class to body for mobile-specific optimizations
  document.body.classList.add('mobile-device');
}

// ===== Fullscreen Toggle (desktop only - hidden on mobile) =====
window.addEventListener('DOMContentLoaded', () => {
  const zoomToggle = document.getElementById('zoom-toggle');
  if (!zoomToggle) return;

  // Hide zoom toggle on mobile
  function updateZoomToggleVisibility() {
    if (window.innerWidth <= 768) {
      zoomToggle.style.display = 'none';
    } else {
      zoomToggle.style.display = 'flex';
    }
  }
  
  updateZoomToggleVisibility();
  window.addEventListener('resize', updateZoomToggleVisibility);

  let isFullscreen = false;

  function setFullscreen(state) {
    // Don't allow fullscreen on mobile
    if (window.innerWidth <= 768) return;
    
    isFullscreen = state;
    
    // Add/remove class with a slight delay for smoother transition
    if (isFullscreen) {
      document.body.classList.add('zoomed-in');
      // Disable body scroll when in fullscreen
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('zoomed-in');
      document.body.style.overflow = '';
    }
    
    const icon = zoomToggle.querySelector('.zoom-icon');
    if (icon) icon.textContent = isFullscreen ? '⊟' : '⊞';
    
    if ('vibrate' in navigator) navigator.vibrate(30);
  }

  zoomToggle.addEventListener('click', () => setFullscreen(!isFullscreen));

  // Keyboard shortcut: F or Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullscreen && window.innerWidth > 768) {
      setFullscreen(false);
    } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && isStarted && window.innerWidth > 768) {
      // Only toggle if not typing in an input
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        setFullscreen(!isFullscreen);
      }
    }
  });
});
