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

function initRecordedResourcesScrollbars() {
  const containers = document.querySelectorAll('.video-scroll-container');
  if (!containers.length) return;

  containers.forEach(container => {
    if (container.querySelector('.video-scroll-inner')) return;

    const inner = document.createElement('div');
    inner.className = 'video-scroll-inner';

    while (container.firstChild) {
      inner.appendChild(container.firstChild);
    }

    const track = document.createElement('div');
    track.className = 'custom-scrollbar';

    const thumb = document.createElement('div');
    thumb.className = 'custom-scrollbar-thumb';

    track.appendChild(thumb);
    container.appendChild(inner);
    container.appendChild(track);

    const updateThumb = () => {
      const scrollHeight = inner.scrollHeight;
      const clientHeight = inner.clientHeight;
      const trackHeight = track.clientHeight;
      const maxScroll = Math.max(scrollHeight - clientHeight, 0);
      const minThumbHeight = 28;
      const calculatedThumb = (clientHeight / Math.max(scrollHeight, 1)) * trackHeight;
      const thumbHeight = Math.max(calculatedThumb, minThumbHeight);
      const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);
      const thumbTop = maxScroll === 0 ? 0 : (inner.scrollTop / maxScroll) * maxThumbTop;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    inner.addEventListener('scroll', updateThumb, { passive: true });

    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(updateThumb);
      resizeObserver.observe(inner);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', updateThumb);
    }

    window.addEventListener('load', updateThumb);
    updateThumb();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecordedResourcesScrollbars);
} else {
  initRecordedResourcesScrollbars();
}

// === Content Data Loader (Phase 3) ===
// Loads repo JSON content for future runtime rendering. This phase only fetches
// and validates; it does not modify the rendered DOM. See docs/content-schema.md
// for the full contract.
(function () {
  var CONTENT_PATHS = {
    programSlots: 'data/program-slots.json',
    events: 'data/events.json',
    videos: 'data/videos.json',
    meta: 'data/meta.json'
  };
  var CONTENT_FETCH_TIMEOUT_MS = 8000;
  var LOG_PREFIX = '[ashrafiyya-content]';

  function fetchJsonWithTimeout(url, timeoutMs) {
    if (timeoutMs == null) timeoutMs = CONTENT_FETCH_TIMEOUT_MS;
    if (typeof fetch !== 'function') {
      return Promise.reject(new Error('Fetch API is not available in this browser'));
    }
    if (typeof AbortController !== 'function') {
      return new Promise(function (resolve, reject) {
        var didTimeout = false;
        var timer = setTimeout(function () {
          didTimeout = true;
          reject(new Error('Timed out fetching ' + url));
        }, timeoutMs);
        fetch(url, { credentials: 'omit', cache: 'no-store' })
          .then(function (response) {
            if (didTimeout) return;
            clearTimeout(timer);
            if (!response.ok) {
              reject(new Error('HTTP ' + response.status + ' ' + url));
              return;
            }
            response.json().then(resolve, reject);
          })
          .catch(function (err) {
            if (didTimeout) return;
            clearTimeout(timer);
            reject(err);
          });
      });
    }
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs);
    return fetch(url, {
      credentials: 'omit',
      cache: 'no-store',
      signal: controller.signal
    }).then(function (response) {
      clearTimeout(timer);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ' ' + url);
      }
      return response.json();
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  function isPlainObject(v) {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }

  function validateProgramSlots(data) {
    var errors = [];
    if (!isPlainObject(data)) {
      errors.push('program-slots.json: root must be an object');
      return { ok: false, errors: errors, slots: [] };
    }
    if (data.schema_version !== 1) {
      errors.push('program-slots.json: unsupported schema_version ' + data.schema_version);
    }
    if (!Array.isArray(data.slots)) {
      errors.push('program-slots.json: slots must be an array');
      return { ok: false, errors: errors, slots: [] };
    }
    var seen = {};
    var validSlots = [];
    data.slots.forEach(function (slot, idx) {
      if (!isPlainObject(slot)) {
        errors.push('slot[' + idx + ']: not an object');
        return;
      }
      if (typeof slot.slot_id !== 'string' || !slot.slot_id) {
        errors.push('slot[' + idx + ']: slot_id missing');
        return;
      }
      if (seen[slot.slot_id]) {
        errors.push('slot[' + idx + ']: duplicate slot_id ' + slot.slot_id);
        return;
      }
      seen[slot.slot_id] = true;
      if (typeof slot.branch !== 'string' || !slot.branch) {
        errors.push('slot ' + slot.slot_id + ': branch missing');
        return;
      }
      if (typeof slot.title !== 'string' || !slot.title) {
        errors.push('slot ' + slot.slot_id + ': title missing');
        return;
      }
      if (typeof slot.sort_order !== 'number') {
        errors.push('slot ' + slot.slot_id + ': sort_order missing');
        return;
      }
      validSlots.push(slot);
    });
    return { ok: errors.length === 0, errors: errors, slots: validSlots };
  }

  function validateEvents(data) {
    var errors = [];
    if (!isPlainObject(data)) {
      errors.push('events.json: root must be an object');
      return { ok: false, errors: errors, events: [] };
    }
    if (data.schema_version !== 1) {
      errors.push('events.json: unsupported schema_version ' + data.schema_version);
    }
    if (!Array.isArray(data.events)) {
      errors.push('events.json: events must be an array');
      return { ok: false, errors: errors, events: [] };
    }
    var seen = {};
    var validEvents = [];
    data.events.forEach(function (evt, idx) {
      if (!isPlainObject(evt)) {
        errors.push('event[' + idx + ']: not an object');
        return;
      }
      if (typeof evt.event_id !== 'string' || !evt.event_id) {
        errors.push('event[' + idx + ']: event_id missing');
        return;
      }
      if (seen[evt.event_id]) {
        errors.push('event[' + idx + ']: duplicate event_id ' + evt.event_id);
        return;
      }
      seen[evt.event_id] = true;
      if (typeof evt.branch !== 'string' || !evt.branch) {
        errors.push('event ' + evt.event_id + ': branch missing');
        return;
      }
      if (typeof evt.title !== 'string' || !evt.title) {
        errors.push('event ' + evt.event_id + ': title missing');
        return;
      }
      if (typeof evt.visible !== 'boolean') {
        errors.push('event ' + evt.event_id + ': visible missing');
        return;
      }
      validEvents.push(evt);
    });
    return { ok: errors.length === 0, errors: errors, events: validEvents };
  }

  function validateVideos(data) {
    var errors = [];
    if (!isPlainObject(data)) {
      errors.push('videos.json: root must be an object');
      return { ok: false, errors: errors, videos: [] };
    }
    if (data.schema_version !== 1) {
      errors.push('videos.json: unsupported schema_version ' + data.schema_version);
    }
    if (!Array.isArray(data.videos)) {
      errors.push('videos.json: videos must be an array');
      return { ok: false, errors: errors, videos: [] };
    }
    var seen = {};
    var validVideos = [];
    data.videos.forEach(function (video, idx) {
      if (!isPlainObject(video)) {
        errors.push('video[' + idx + ']: not an object');
        return;
      }
      if (typeof video.video_id !== 'string' || !video.video_id) {
        errors.push('video[' + idx + ']: video_id missing');
        return;
      }
      if (seen[video.video_id]) {
        errors.push('video[' + idx + ']: duplicate video_id ' + video.video_id);
        return;
      }
      seen[video.video_id] = true;
      if (typeof video.branch !== 'string' || !video.branch) {
        errors.push('video ' + video.video_id + ': branch missing');
        return;
      }
      if (typeof video.title !== 'string' || !video.title) {
        errors.push('video ' + video.video_id + ': title missing');
        return;
      }
      if (typeof video.embed_url !== 'string' || !video.embed_url) {
        errors.push('video ' + video.video_id + ': embed_url missing');
        return;
      }
      validVideos.push(video);
    });
    return { ok: errors.length === 0, errors: errors, videos: validVideos };
  }

  function logErrors(errors) {
    if (!errors || !errors.length) return;
    errors.forEach(function (e) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(LOG_PREFIX + ' ' + e);
      }
    });
  }

  function safeFetch(key, validator) {
    return fetchJsonWithTimeout(CONTENT_PATHS[key]).then(function (raw) {
      var result = validator(raw);
      logErrors(result.errors);
      return result;
    }, function (err) {
      var msg = err && err.message ? err.message : String(err);
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(LOG_PREFIX + ' failed to load ' + CONTENT_PATHS[key] + ': ' + msg);
      }
      return { ok: false, errors: [msg], slots: [], events: [], videos: [] };
    });
  }

  function loadContentData() {
    return Promise.all([
      safeFetch('programSlots', validateProgramSlots),
      safeFetch('events', validateEvents),
      safeFetch('videos', validateVideos),
      fetchJsonWithTimeout(CONTENT_PATHS.meta).then(function (raw) { return raw; }, function (err) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(LOG_PREFIX + ' failed to load meta.json: ' + (err && err.message ? err.message : err));
        }
        return null;
      })
    ]).then(function (results) {
      var state = {
        programSlots: results[0].slots || [],
        events: results[1].events || [],
        videos: results[2].videos || [],
        meta: results[3] || null,
        validation: {
          programSlots: results[0],
          events: results[1],
          videos: results[2]
        }
      };
      if (window.AshrafiyyaContent) {
        window.AshrafiyyaContent.state = state;
      }
      return state;
    });
  }

  window.AshrafiyyaContent = {
    paths: CONTENT_PATHS,
    fetchJsonWithTimeout: fetchJsonWithTimeout,
    validateProgramSlots: validateProgramSlots,
    validateEvents: validateEvents,
    validateVideos: validateVideos,
    loadContentData: loadContentData,
    state: null
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { loadContentData(); });
  } else {
    loadContentData();
  }
})();

