// Cross-browser compatibility utilities
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Smooth scroll for nav links with cross-browser support
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Check if smooth scrolling is supported
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback for older browsers
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      }
    }
  });
});

// Universal layout fix for all devices and viewport changes
let layoutFixTimeout;
function fixLayoutIssues() {
  // Clear any existing timeout
  clearTimeout(layoutFixTimeout);
  
  // Force layout recalculation after any viewport change
  layoutFixTimeout = setTimeout(function() {
    // Trigger a reflow by accessing offsetHeight
    document.body.offsetHeight;
    
    // Force recalculation of program cards
    const programCards = document.querySelectorAll('.program-card-v2, .program-card-v4');
    programCards.forEach(card => {
      card.style.height = 'auto';
      card.style.minHeight = 'auto';
      // Trigger reflow
      card.offsetHeight;
    });
    
    // Force recalculation of program grid
    const programGrids = document.querySelectorAll('.program-grid');
    programGrids.forEach(grid => {
      grid.style.alignItems = 'stretch';
      // Trigger reflow
      grid.offsetHeight;
    });
    
    // Force recalculation of programs list
    const programsLists = document.querySelectorAll('.programs-list');
    programsLists.forEach(list => {
      list.style.height = 'auto';
      // Trigger reflow
      list.offsetHeight;
    });
  }, 100);
}

// Handle orientation changes (mobile devices)
if (window.addEventListener) {
  window.addEventListener('orientationchange', fixLayoutIssues);
}

// Handle resize events (all devices)
if (window.addEventListener) {
  window.addEventListener('resize', fixLayoutIssues);
}

// Handle window focus events (when switching between tabs/apps)
if (window.addEventListener) {
  window.addEventListener('focus', fixLayoutIssues);
}

// Handle DOM content loaded to ensure initial layout is correct
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fixLayoutIssues);
}

// Handle load event to catch any late layout issues
if (window.addEventListener) {
  window.addEventListener('load', fixLayoutIssues);
}

// Additional cross-browser compatibility fixes
function addCrossBrowserSupport() {
  // Fix for IE11 and older browsers that don't support CSS Grid
  if (isIE || !CSS.supports('display', 'grid')) {
    const grids = document.querySelectorAll('.program-grid, .branches-intro');
    grids.forEach(grid => {
      grid.style.display = 'flex';
      grid.style.flexWrap = 'wrap';
      
      const children = grid.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.flex = '1 1 300px';
        children[i].style.margin = '15px';
      }
    });
  }
  
  // Fix for browsers that don't support gap property
  if (!CSS.supports('gap', '1rem')) {
    const elementsWithGap = document.querySelectorAll('.program-grid, .social-buttons, .branches-intro');
    elementsWithGap.forEach(element => {
      const children = element.children;
      for (let i = 0; i < children.length; i++) {
        children[i].style.margin = '15px';
      }
    });
  }
  
  // Fix for Safari flexbox issues
  if (isSafari) {
    const flexContainers = document.querySelectorAll('.programs-list, .social-buttons');
    flexContainers.forEach(container => {
      container.style.display = 'flex';
      if (container.classList.contains('programs-list')) {
        container.style.flexDirection = 'column';
      }
      if (container.classList.contains('social-buttons')) {
        container.style.justifyContent = 'center';
      }
    });
  }
}

// Apply cross-browser fixes when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addCrossBrowserSupport);
} else {
  addCrossBrowserSupport();
}

// Fix for touch devices
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
  
  // Add touch-specific event listeners
  const touchElements = document.querySelectorAll('.social-button, .insta-link, .branch-intro-item');
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}

// Ensure proper font loading
if ('fonts' in document) {
  document.fonts.ready.then(function() {
    // Fonts are loaded, trigger layout recalculation
    fixLayoutIssues();
  });
}

// Expandable description functionality
function initExpandableDescriptions() {
  const expandableDescriptions = document.querySelectorAll('.expandable-description');
  
  expandableDescriptions.forEach(function(container) {
    const content = container.querySelector('.description-content');
    const btn = container.querySelector('.read-more-btn');
    
    if (!content || !btn) return;
    
    // Initialize as collapsed
    content.classList.add('collapsed');
    
    btn.addEventListener('click', function() {
      if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        btn.textContent = 'Collapse';
      } else {
        // Collapse
        content.classList.add('collapsed');
        btn.textContent = 'Read More';
      }
    });
  });
}

// Initialize expandable descriptions when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExpandableDescriptions);
} else {
  initExpandableDescriptions();
}
