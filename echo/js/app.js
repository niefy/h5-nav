window.app = window.app || {};

(function() {
  'use strict';

  /* ========== Echo Ripple — signature animation ========== */
  app.spawnEchoRipple = function() {
    var greeting = document.querySelector('.greeting-card');
    if (!greeting) return;

    // Remove existing ripple if any
    var existing = greeting.querySelector('.echo-ripple');
    if (existing) existing.remove();

    var ripple = document.createElement('div');
    ripple.className = 'echo-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 3; i++) {
      var ring = document.createElement('div');
      ring.className = 'ring';
      ripple.appendChild(ring);
    }
    greeting.appendChild(ripple);

    // Clean up after animation completes
    setTimeout(function() {
      if (ripple.parentNode) ripple.remove();
    }, 3200);
  };

  /* ========== Intersection Observer — scroll reveals ========== */
  app.initScrollReveal = function() {
    if (app._scrollObserver) app._scrollObserver.disconnect();

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    app._scrollObserver = observer;
    return observer;
  };

  app.observeScrollItems = function(containerSelector, itemSelector) {
    var container = document.querySelector(containerSelector);
    if (!container) return;
    var observer = app.initScrollReveal();
    var items = container.querySelectorAll(itemSelector);
    items.forEach(function(item) {
      observer.observe(item);
    });
  };

  /* ========== Router ========== */
  app.switchTab = function(tab) {
    var pages = document.querySelectorAll('.page');
    var targetPage = document.querySelector('.page[data-page="' + tab + '"]');

    // Deactivate all pages
    pages.forEach(function(p) {
      if (p !== targetPage) p.classList.remove('active');
    });

    // Activate target with a tiny delay for transition to fire
    if (targetPage) {
      // Force reflow
      targetPage.offsetHeight;
      targetPage.classList.add('active');
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var nav = document.querySelector('.nav-item[data-tab="' + tab + '"]');
    if (nav) nav.classList.add('active');

    // Hide bottom nav on chat/detail pages
    var bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      bottomNav.style.display = (tab === 'chat' || tab === 'detail') ? 'none' : '';
    }

    // Page-specific render
    if (tab === 'home') {
      app.renderHome();
      // Spawn echo ripple on home page
      setTimeout(function() { app.spawnEchoRipple(); }, 150);
    }
    if (tab === 'ai') app.renderAvatars();
    if (tab === 'chat') app.renderChat();
    if (tab === 'notes') app.renderNotes();
    if (tab === 'profile') app.renderProfile();
  };

  /* ========== Init ========== */
  app.init = function() {
    var state = app.state;

    // Migration: remove legacy "me" avatar
    state.avatars = state.avatars.filter(function(a) { return a.id !== 'me'; });

    // Seed pet1 messages if needed
    var pet1 = state.avatars.find(function(a) { return a.id === 'pet1'; });
    if (pet1 && (!pet1.messages || pet1.messages.length === 0)) {
      pet1.messages = [
        { from: 'avatar', text: '主人今天过得怎么样？要记得多喝水哦！', time: '14:20' },
        { from: 'me', text: '刚开完会，有点累。', time: '14:22' },
        { from: 'avatar', text: '辛苦啦！要不要趴一会儿？我可以给你讲个冷笑话。', time: '14:23' },
        { from: 'me', text: '好啊，讲一个吧。', time: '14:24' },
        { from: 'avatar', text: '为什么小狗不会说谎？因为它一开口就是"汪汪"真～', time: '14:25' }
      ];
      app.saveState();
    }

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', state.theme === 'warm' ? '' : state.theme);
    if (state.largeText) document.body.classList.add('large-text');

    // Notes tab click handlers
    document.querySelectorAll('.notes-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.notes-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        app.renderNotes(btn.dataset.tab);
      });
    });

    // Initial render
    app.renderHome();
    app.renderAvatars();
    app.renderNotes();
    app.renderProfile();

    // Spawn echo ripple on initial load
    setTimeout(function() { app.spawnEchoRipple(); }, 300);
  };

})();

document.addEventListener('DOMContentLoaded', app.init);
