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
    state: null,
    loadingPromise: null
  };

  function kickoffLoad() {
    if (!window.AshrafiyyaContent.loadingPromise) {
      window.AshrafiyyaContent.loadingPromise = loadContentData();
    }
    return window.AshrafiyyaContent.loadingPromise;
  }
  window.AshrafiyyaContent.kickoffLoad = kickoffLoad;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kickoffLoad);
  } else {
    kickoffLoad();
  }
})();

// === Slot Renderer Helpers (Phase 4) ===
// Pure DOM builders for current-program slot markup. They never touch the live
// page by default. A flag-controlled test mount renders The Heart of Care into
// a hidden container so generated markup can be compared against the existing
// hard-coded HTML. See docs/content-schema.md for the contract.
(function () {
  if (!window.AshrafiyyaContent) return;

  var ALLOWED_BUTTON_STYLES = { 'insta-link-light': true, 'insta-link': true };
  var DEFAULT_BUTTON_STYLE = 'insta-link-light';
  var TEST_MOUNT_ID = 'ashrafiyya-content-test-mount';
  var LOG_PREFIX = '[ashrafiyya-content]';

  function safeText(value) {
    return value == null ? '' : String(value);
  }

  function isSafeHref(href) {
    if (typeof href !== 'string' || !href) return false;
    if (/^javascript:/i.test(href)) return false;
    if (href === '#') return true;
    if (/^https?:\/\//i.test(href)) return true;
    if (/^mailto:/i.test(href)) return true;
    if (/^[a-zA-Z0-9_./\-?#]/.test(href)) return true;
    return false;
  }

  function createDetailRow(label, value) {
    var row = document.createElement('div');
    row.className = 'detail-row';
    var strong = document.createElement('strong');
    strong.textContent = safeText(label);
    var span = document.createElement('span');
    // Leading space matches the legacy hard-coded markup pattern
    // <strong>Status</strong><span> More Coming Soon</span>.
    span.textContent = ' ' + safeText(value);
    row.appendChild(strong);
    row.appendChild(span);
    return row;
  }

  function createEventDetails(details) {
    if (!details || !details.length) return null;
    var wrap = document.createElement('div');
    wrap.className = 'event-details';
    details.forEach(function (d) {
      if (!d) return;
      wrap.appendChild(createDetailRow(d.label, d.value));
    });
    return wrap;
  }

  function createButton(button) {
    if (!button) return null;
    var a = document.createElement('a');
    var style = ALLOWED_BUTTON_STYLES[button.style] ? button.style : DEFAULT_BUTTON_STYLE;
    a.className = 'insta-link ' + style;
    var href = isSafeHref(button.href) ? button.href : '#';
    a.setAttribute('href', href);
    if (button.target) a.setAttribute('target', safeText(button.target));
    if (button.rel) a.setAttribute('rel', safeText(button.rel));
    // is_placeholder stays in the data as semantic intent; the renderer does
    // not auto-disable the button so generated markup matches the existing
    // hard-coded "Coming Soon" button. An explicit is_disabled flag wires up
    // the .insta-link-deactivated style.
    if (button.is_disabled === true) {
      a.classList.add('insta-link-deactivated');
    }
    a.textContent = safeText(button.text);
    return a;
  }

  function createButtonContainer(button) {
    var node = createButton(button);
    if (!node) return null;
    var wrap = document.createElement('div');
    wrap.className = 'button-container';
    wrap.appendChild(node);
    return wrap;
  }

  function createProgramItem(slot, event) {
    var src = event ? event : slot;
    var item = document.createElement('div');
    item.className = 'program-item';
    if (slot && slot.slot_id) {
      item.setAttribute('data-slot-id', slot.slot_id);
    }

    var h4 = document.createElement('h4');
    h4.textContent = safeText(src && src.title || (slot && slot.title));
    item.appendChild(h4);

    var description = src && src.description != null
      ? src.description
      : (slot && slot.description);
    if (description) {
      var p = document.createElement('p');
      p.textContent = safeText(description);
      item.appendChild(p);
    }

    var details = src && src.details ? src.details : (slot && slot.default_details);
    var detailsNode = createEventDetails(details);
    if (detailsNode) item.appendChild(detailsNode);

    var button = src && src.button ? src.button : (slot && slot.default_button);
    var btnNode = createButtonContainer(button);
    if (btnNode) item.appendChild(btnNode);

    // Always include the divider span. CSS hides it on :last-child, so this
    // keeps the renderer markup identical regardless of position.
    var divider = document.createElement('span');
    divider.className = 'divider';
    divider.textContent = '\u25c6';
    item.appendChild(divider);

    return item;
  }

  function isTestRenderEnabled() {
    try {
      if (window.location && window.location.search &&
          window.location.search.indexOf('ashrafiyya-test-render=1') !== -1) {
        return true;
      }
      if (window.localStorage &&
          window.localStorage.getItem('ashrafiyya:test-render') === '1') {
        return true;
      }
    } catch (e) { /* sandboxed storage / cross-origin frames */ }
    return false;
  }

  function findSlotById(state, slotId) {
    if (!state || !state.programSlots) return null;
    for (var i = 0; i < state.programSlots.length; i++) {
      if (state.programSlots[i].slot_id === slotId) return state.programSlots[i];
    }
    return null;
  }

  function runTestRender(state) {
    if (!document || !document.body) return;
    var slot = findSlotById(state, 'health_heart_of_care');
    if (!slot) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(LOG_PREFIX + ' test render skipped: health_heart_of_care slot not found');
      }
      return;
    }
    var existing = document.getElementById(TEST_MOUNT_ID);
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

    var mount = document.createElement('div');
    mount.id = TEST_MOUNT_ID;
    mount.setAttribute('hidden', '');
    mount.setAttribute('aria-hidden', 'true');
    mount.style.display = 'none';
    mount.appendChild(createProgramItem(slot, null));
    document.body.appendChild(mount);

    if (typeof console !== 'undefined' && console.info) {
      console.info(LOG_PREFIX + ' test render mounted at #' + TEST_MOUNT_ID +
        ' (use DevTools to inspect; remove [hidden] to view)');
    }
  }

  window.AshrafiyyaContent.render = {
    createDetailRow: createDetailRow,
    createEventDetails: createEventDetails,
    createButton: createButton,
    createButtonContainer: createButtonContainer,
    createProgramItem: createProgramItem,
    runTestRender: runTestRender,
    isSafeHref: isSafeHref,
    findSlotById: findSlotById
  };

  function tryTestRender() {
    if (!isTestRenderEnabled()) return;
    var api = window.AshrafiyyaContent;
    if (!api) return;
    var doRender = function (state) {
      try { runTestRender(state); }
      catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(LOG_PREFIX + ' test render failed: ' + (e && e.message || e));
        }
      }
    };
    if (api.state) {
      doRender(api.state);
    } else if (api.loadingPromise) {
      api.loadingPromise.then(doRender);
    } else if (typeof api.kickoffLoad === 'function') {
      api.kickoffLoad().then(doRender);
    } else if (typeof api.loadContentData === 'function') {
      api.loadContentData().then(doRender);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryTestRender);
  } else {
    tryTestRender();
  }
})();

// === Slot Mount (Phase 5) ===
// Renders any element marked with data-program-slot from repo JSON. Each mount
// keeps its existing children as a non-blank fallback; once data loads, the
// children are replaced with rendered output. If loading or rendering fails,
// the legacy fallback content remains visible.
(function () {
  if (!window.AshrafiyyaContent || !window.AshrafiyyaContent.render) return;

  var api = window.AshrafiyyaContent;
  var render = api.render;
  var LOG_PREFIX = '[ashrafiyya-content]';

  function findActiveEventForSlot(state, slotId, now) {
    if (!state || !state.events || !state.events.length) return null;
    var nowMs = now ? +now : Date.now();
    var active = null;
    var activeStartMs = -Infinity;
    state.events.forEach(function (evt) {
      if (!evt || evt.visible !== true) return;
      if (evt.slot_id !== slotId) return;
      if (typeof evt.start !== 'string' || typeof evt.end !== 'string') return;
      var startMs = Date.parse(evt.start);
      var endMs = Date.parse(evt.end);
      if (isNaN(startMs) || isNaN(endMs)) return;
      if (startMs <= nowMs && nowMs <= endMs) {
        if (startMs > activeStartMs) {
          active = evt;
          activeStartMs = startMs;
        }
      }
    });
    return active;
  }

  function mountProgramSlot(target, state, slotId) {
    if (!target || !state) return false;
    var slot = render.findSlotById(state, slotId);
    if (!slot) return false;
    if (slot.is_enabled === false) {
      while (target.firstChild) target.removeChild(target.firstChild);
      target.setAttribute('hidden', '');
      return true;
    }
    var event = findActiveEventForSlot(state, slotId);
    var fresh = render.createProgramItem(slot, event);
    if (!fresh) return false;

    while (target.firstChild) target.removeChild(target.firstChild);
    while (fresh.firstChild) target.appendChild(fresh.firstChild);
    if (!target.classList.contains('program-item')) {
      target.classList.add('program-item');
    }
    target.setAttribute('data-slot-id', slotId);
    target.removeAttribute('hidden');
    return true;
  }

  function mountAllProgramSlots(state) {
    if (!document || typeof document.querySelectorAll !== 'function') return;
    var els = document.querySelectorAll('[data-program-slot]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var slotId = el.getAttribute('data-program-slot');
      if (!slotId) continue;
      try {
        var ok = mountProgramSlot(el, state, slotId);
        if (!ok && typeof console !== 'undefined' && console.warn) {
          console.warn(LOG_PREFIX + ' slot "' + slotId + '" did not mount; legacy fallback retained');
        }
      } catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(LOG_PREFIX + ' failed to mount slot "' + slotId + '": ' + (e && e.message || e));
        }
      }
    }
  }

  api.findActiveEventForSlot = findActiveEventForSlot;
  api.mountProgramSlot = mountProgramSlot;
  api.mountAllProgramSlots = mountAllProgramSlots;

  function start() {
    var doMount = function (state) {
      try { mountAllProgramSlots(state); }
      catch (e) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn(LOG_PREFIX + ' mountAllProgramSlots failed: ' + (e && e.message || e));
        }
      }
    };
    if (api.state) {
      doMount(api.state);
    } else if (api.loadingPromise) {
      api.loadingPromise.then(doMount);
    } else if (typeof api.kickoffLoad === 'function') {
      api.kickoffLoad().then(doMount);
    } else if (typeof api.loadContentData === 'function') {
      api.loadContentData().then(doMount);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

