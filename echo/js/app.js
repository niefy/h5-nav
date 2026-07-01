window.app = window.app || {};

(function() {
  'use strict';

  /* ========== Router ========== */
  app.switchTab = function(tab) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.querySelector('.page[data-page="' + tab + '"]').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var nav = document.querySelector('.nav-item[data-tab="' + tab + '"]');
    if (nav) nav.classList.add('active');

    // 聊天页和详情页不展示底部导航栏
    var bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
      bottomNav.style.display = (tab === 'chat' || tab === 'detail') ? 'none' : '';
    }

    if (tab === 'home') app.renderHome();
    if (tab === 'ai') app.renderAvatars();
    if (tab === 'chat') app.renderChat();
    if (tab === 'notes') app.renderNotes();
    if (tab === 'profile') app.renderProfile();
  };

  /* ========== Init ========== */
  app.init = function() {
    var state = app.state;

    // 迁移：移除旧版中的"我"形象
    state.avatars = state.avatars.filter(function(a) { return a.id !== 'me'; });
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

    document.documentElement.setAttribute('data-theme', state.theme === 'warm' ? '' : state.theme);
    if (state.largeText) document.body.classList.add('large-text');

    document.querySelectorAll('.notes-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.notes-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        app.renderNotes(btn.dataset.tab);
      });
    });

    app.renderHome();
    app.renderAvatars();
    app.renderNotes();
    app.renderProfile();
  };

})();

document.addEventListener('DOMContentLoaded', app.init);
