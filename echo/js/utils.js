window.app = window.app || {};

(function() {
  'use strict';

  /* ========== Default State ========== */
  app.defaultState = {
    user: {
      name: '用户09174',
      id: '@982837',
      avatar: './images/human1.png'
    },
    theme: 'warm',
    largeText: false,
    cards: [
      { id: 'heartRate', category: 'numeric', title: '心率', value: '72', unit: 'bpm', icon: 'heart', accent: false, data: [
        { date: '2026-06-24', value: '70' }, { date: '2026-06-25', value: '73' },
        { date: '2026-06-26', value: '71' }, { date: '2026-06-27', value: '75' },
        { date: '2026-06-28', value: '72' }, { date: '2026-06-29', value: '74' }, { date: '2026-06-30', value: '72' }
      ]},
      { id: 'bloodPressure', category: 'numeric', title: '血压', value: '118/78', unit: 'mmHg', icon: 'pressure', accent: true, data: [
        { date: '2026-06-24', value: '120/80' }, { date: '2026-06-25', value: '119/79' },
        { date: '2026-06-26', value: '118/78' }, { date: '2026-06-27', value: '117/77' },
        { date: '2026-06-28', value: '118/78' }, { date: '2026-06-29', value: '120/80' }, { date: '2026-06-30', value: '118/78' }
      ]},
      { id: 'bloodSugar', category: 'numeric', title: '血糖', value: '5.4', unit: 'mmol/L', icon: 'drop', accent: false, data: [
        { date: '2026-06-24', value: '5.3' }, { date: '2026-06-25', value: '5.5' },
        { date: '2026-06-26', value: '5.2' }, { date: '2026-06-27', value: '5.6' },
        { date: '2026-06-28', value: '5.4' }, { date: '2026-06-29', value: '5.3' }, { date: '2026-06-30', value: '5.4' }
      ]},
      { id: 'bloodLipid', category: 'numeric', title: '血脂', value: '正常', unit: '', icon: 'lipid', accent: true, data: [
        { date: '2026-06-24', value: '正常' }, { date: '2026-06-25', value: '正常' },
        { date: '2026-06-26', value: '偏高' }, { date: '2026-06-27', value: '正常' },
        { date: '2026-06-28', value: '正常' }, { date: '2026-06-29', value: '正常' }, { date: '2026-06-30', value: '正常' }
      ]},
      { id: 'weight', category: 'numeric', title: '体重', value: '62.5', unit: 'kg', icon: 'weight', accent: false, data: [
        { date: '2026-06-24', value: '62.8' }, { date: '2026-06-25', value: '62.7' },
        { date: '2026-06-26', value: '62.6' }, { date: '2026-06-27', value: '62.5' },
        { date: '2026-06-28', value: '62.4' }, { date: '2026-06-29', value: '62.5' }, { date: '2026-06-30', value: '62.5' }
      ]},
      { id: 'water', category: 'timeline', title: '喝水记录', value: '4 杯', unit: '', icon: 'water', accent: false, data: [
        { time: '08:30', content: '晨起一杯温水' }, { time: '10:00', content: '工作间隙补水' },
        { time: '14:20', content: '午饭后一杯水' }, { time: '16:45', content: '下午茶配水' }
      ]},
      { id: 'medication', category: 'reminder', title: '用药提醒', value: '每日 1 次', unit: '', icon: 'pill', accent: true, data: {
        config: { name: '维生素 C', dose: '1 片', time: '08:00', frequency: '每天' },
        records: [
          { date: '2026-06-30', status: '已服用' }, { date: '2026-06-29', status: '已服用' },
          { date: '2026-06-28', status: '已服用' }
        ]
      }},
      { id: 'mood', category: 'other', title: '今日心情', value: '😊', unit: '', icon: 'smile', accent: false, data: [
        { date: '2026-06-24', value: '😄' }, { date: '2026-06-25', value: '😊' },
        { date: '2026-06-26', value: '😔' }, { date: '2026-06-27', value: '😌' },
        { date: '2026-06-28', value: '😊' }, { date: '2026-06-29', value: '😄' }, { date: '2026-06-30', value: '😊' }
      ]}
    ],
    avatars: [
      { id: 'pet1', name: '派派', type: 'pet', avatar: './images/pet1.png', birthday: '2022-03-10', personality: '活泼、粘人', messages: [
        { from: 'avatar', text: '主人今天过得怎么样？要记得多喝水哦！', time: '14:20' },
        { from: 'me', text: '刚开完会，有点累。', time: '14:22' },
        { from: 'avatar', text: '辛苦啦！要不要趴一会儿？我可以给你讲个冷笑话。', time: '14:23' },
        { from: 'me', text: '好啊，讲一个吧。', time: '14:24' },
        { from: 'avatar', text: '为什么小狗不会说谎？因为它一开口就是"汪汪"真～', time: '14:25' }
      ]}
    ],
    notes: [
      { id: 1, date: '2026-06-30', content: '今天天气很好，去公园散步了半小时，心情不错。', type: 'text', ai: false },
      { id: 2, date: '2026-06-29', content: '晚餐做了喜欢的菜。', type: 'image', mediaUrl: './images/human2.png', ai: false },
      { id: 3, date: '2026-06-29', content: '根据今天的聊天记录与健康数据，你的情绪整体平稳，建议保持规律作息。', type: 'text', ai: true },
      { id: 4, date: '2026-06-28', content: '一段语音记录', type: 'audio', ai: false }
    ],
    settings: {
      inactiveAlert: false,
      sos: false,
      emergencyContacts: [
        { name: '妈妈', phone: '138****1234' }
      ]
    }
  };

  /* ========== Icon SVGs ========== */
  app.icons = {
    heart: '<i class="iconfont icon-jiankang"></i>',
    pressure: '<i class="iconfont icon-kangya"></i>',
    drop: '<i class="iconfont icon-jiankangzhi"></i>',
    lipid: '<i class="iconfont icon-guanzhuangdongmai"></i>',
    weight: '<i class="iconfont icon-shentijineng"></i>',
    water: '<i class="iconfont icon-huxishuju"></i>',
    pill: '<i class="iconfont icon-mianyibingdu"></i>',
    smile: '<i class="iconfont icon-a-045_dianzan-23"></i>',
    diary: '<i class="iconfont icon-a-045_shuben"></i>',
    age: '<i class="iconfont icon-jiankang"></i>',
    walk: '<i class="iconfont icon-shentijineng"></i>'
  };

  /* ========== Card Templates ========== */
  app.cardTemplates = [
    { id: 'heartRate', category: 'numeric', title: '心率', unit: 'bpm', icon: 'heart' },
    { id: 'bloodPressure', category: 'numeric', title: '血压', unit: 'mmHg', icon: 'pressure' },
    { id: 'bloodSugar', category: 'numeric', title: '血糖', unit: 'mmol/L', icon: 'drop' },
    { id: 'bloodLipid', category: 'numeric', title: '血脂', unit: '', icon: 'lipid' },
    { id: 'weight', category: 'numeric', title: '体重', unit: 'kg', icon: 'weight' },
    { id: 'height', category: 'numeric', title: '身高', unit: 'cm', icon: 'age' },
    { id: 'water', category: 'timeline', title: '喝水记录', icon: 'water' },
    { id: 'sleep', category: 'timeline', title: '睡眠记录', icon: 'age' },
    { id: 'medication', category: 'reminder', title: '用药提醒', icon: 'pill' },
    { id: 'mood', category: 'other', title: '今日心情', icon: 'smile' }
  ];

  /* ========== Sample Data Generator ========== */
  app.getSampleData = function(category, title) {
    var today = new Date();
    var formatDate = function(d) { return d.toISOString().split('T')[0]; };
    var dates = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      dates.push(formatDate(d));
    }
    if (category === 'numeric') {
      if (title === '心率') return dates.map(function(d) { return { date: d, value: String(70 + Math.floor(Math.random() * 8)) }; });
      if (title === '血压') return dates.map(function(d) { return { date: d, value: (115 + Math.floor(Math.random() * 10)) + '/' + (75 + Math.floor(Math.random() * 8)) }; });
      if (title === '血糖') return dates.map(function(d) { return { date: d, value: (5.0 + Math.random() * 0.8).toFixed(1) }; });
      if (title === '血脂') return dates.map(function(d) { return { date: d, value: Math.random() > 0.2 ? '正常' : '偏高' }; });
      if (title === '体重') return dates.map(function(d) { return { date: d, value: (61 + Math.random() * 2).toFixed(1) }; });
      if (title === '身高') return dates.map(function(d) { return { date: d, value: '170' }; });
      return dates.map(function(d) { return { date: d, value: String(Math.floor(Math.random() * 100)) }; });
    }
    if (category === 'timeline') {
      if (title.indexOf('喝水') !== -1) return [
        { time: '08:30', content: '晨起一杯温水' },
        { time: '10:00', content: '工作间隙补水' },
        { time: '14:20', content: '午饭后一杯水' },
        { time: '16:45', content: '下午茶配水' }
      ];
      if (title.indexOf('睡眠') !== -1) return [
        { time: '23:00', content: '入睡' },
        { time: '07:00', content: '醒来，夜间醒来 1 次' }
      ];
      return [
        { time: '08:30', content: '记录 1' },
        { time: '12:00', content: '记录 2' },
        { time: '18:30', content: '记录 3' }
      ];
    }
    if (category === 'reminder') {
      return {
        config: { name: title === '用药提醒' ? '维生素 C' : '示例事项', dose: '1 片', time: '08:00', frequency: '每天' },
        records: dates.slice(-3).map(function(d) { return { date: d, status: '已服用' }; })
      };
    }
    if (category === 'other') {
      var moods = ['😄', '😊', '😐', '😔', '😌', '😄', '😊'];
      return dates.map(function(d, i) { return { date: d, value: moods[i % moods.length] }; });
    }
    return [];
  };

  /* ========== State ========== */
  app.currentDetailId = null;
  app.noteMedia = null;
  app.noteMediaType = 'text';
  app.newAvatarPhoto = null;

  app.loadState = function() {
    try {
      var raw = localStorage.getItem('echo_me_state');
      return raw ? Object.assign({}, app.defaultState, JSON.parse(raw)) : JSON.parse(JSON.stringify(app.defaultState));
    } catch (e) {
      return JSON.parse(JSON.stringify(app.defaultState));
    }
  };

  app.saveState = function() {
    localStorage.setItem('echo_me_state', JSON.stringify(app.state));
  };

  app.state = app.loadState();

  /* ========== Utilities ========== */
  app.$ = function(sel) { return document.querySelector(sel); };

  app.getGreeting = function() {
    var hour = new Date().getHours();
    if (hour < 6) return '凌晨好，';
    if (hour < 12) return '早上好，';
    if (hour < 18) return '下午好，';
    return '晚上好，';
  };

  app.toast = function(msg) {
    var t = app.$('#toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function() { t.classList.remove('show'); }, 2000);
  };

  app.openModal = function(title, html) {
    app.$('#modal').classList.add('show');
    app.$('#modalContent').innerHTML =
      '<div class="drag-handle"></div>\n' +
      '<button class="icon-btn modal-close" onclick="app.closeModal()" aria-label="关闭">\n' +
      '  <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\n' +
      '</button>\n' +
      '<h3 class="modal-title">' + title + '</h3>\n' +
      html;
  };

  app.closeModal = function() {
    app.$('#modal').classList.remove('show');
    app.noteMedia = null;
    app.noteMediaType = 'text';
  };

})();
