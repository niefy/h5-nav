window.app = window.app || {};

(function() {
  'use strict';

  var getGreeting = app.getGreeting;
  var icons = app.icons;
  var cardTemplates = app.cardTemplates;
  var getSampleData = app.getSampleData;
  var $ = app.$;
  var toast = app.toast;
  var openModal = app.openModal;
  var closeModal = app.closeModal;
  var saveState = app.saveState;

  /* ========== Home Page ========== */
  app.renderHome = function() {
    var state = app.state;
    var _icons = icons;
    app.$('#greetingTime').textContent = getGreeting();
    app.$('#greetingName').textContent = state.user.name;
    app.$('#homeAvatar').src = state.user.avatar;

    var grid = app.$('#homeGrid');
    grid.classList.toggle('edit-mode', !!state.editMode);
    grid.innerHTML = state.cards.map(function(card, idx) {
      return '<div class="grid-card ' + (card.accent ? 'accent' : '') + '"' +
        ' onclick="app.openDetail(\'' + card.id + '\')">' +
        (state.editMode ? '<div class="delete-badge" onclick="event.stopPropagation(); app.deleteCard(\'' + card.id + '\')">×</div>' : '') +
        '<div class="grid-card-top">' +
        '<div class="grid-icon">' + (_icons[card.icon] || _icons.diary) + '</div>' +
        '<span class="grid-value">' + card.value + (card.unit ? '<small style="font-size:12px;font-weight:400">' + card.unit + '</small>' : '') + '</span>' +
        '</div>' +
        '<div class="grid-title">' + card.title + '</div>' +
        '</div>';
    }).join('');
  };

  app.toggleEditMode = function() {
    var state = app.state;
    state.editMode = !state.editMode;
    app.$('#homeGrid').classList.toggle('edit-mode', state.editMode);
    app.renderHome();
    toast(state.editMode ? '点击 × 删除卡片' : '已退出编辑');
  };

  app.deleteCard = function(id) {
    var state = app.state;
    state.cards = state.cards.filter(function(c) { return c.id !== id; });
    saveState();
    app.renderHome();
    toast('已删除');
  };

  app.openAddCard = function() {
    var state = app.state;
    var tpls = cardTemplates;
    var options = tpls.filter(function(t) { return !state.cards.some(function(c) { return c.id === t.id; }); });
    if (options.length === 0) {
      toast('已添加所有卡片');
      return;
    }
    openModal('添加健康卡片',
      '<div class="form-group">' +
      '<label>选择卡片类型</label>' +
      '<select id="newCardType">' +
      options.map(function(t) { return '<option value="' + t.id + '">' + t.title + (t.unit ? ' (' + t.unit + ')' : '') + '</option>'; }).join('') +
      '</select>' +
      '</div>' +
      '<div class="modal-actions">' +
      '<button class="btn-secondary" onclick="app.closeModal()">取消</button>' +
      '<button class="btn-primary" onclick="app.addCard()">添加</button>' +
      '</div>'
    );
  };

  app.addCard = function() {
    var state = app.state;
    var tpls = cardTemplates;
    var typeId = app.$('#newCardType').value;
    var tpl = tpls.find(function(t) { return t.id === typeId; });
    if (!tpl) return;
    var data = getSampleData(tpl.category, tpl.title, tpl.unit);
    var value;
    if (tpl.category === 'numeric') {
      value = data.length ? data[data.length - 1].value : '0';
    } else if (tpl.category === 'timeline') {
      value = data.length + ' 条';
    } else if (tpl.category === 'reminder') {
      value = (data.config.frequency || '') + ' ' + (data.config.time || '');
    } else if (tpl.category === 'other') {
      value = data.length ? data[data.length - 1].value : '😊';
    } else {
      value = '0';
    }
    state.cards.push({
      id: tpl.id,
      category: tpl.category,
      title: tpl.title,
      value: value,
      unit: tpl.unit || '',
      icon: tpl.icon,
      accent: ['bloodPressure', 'bloodLipid', 'medication'].indexOf(tpl.id) !== -1,
      data: data
    });
    saveState();
    app.renderHome();
    closeModal();
    toast('已添加');
  };

  /* ========== Data Detail Page ========== */
  app.openDetail = function(id) {
    var state = app.state;
    if (state.editMode) return;
    app.currentDetailId = id;
    var card = state.cards.find(function(c) { return c.id === id; });
    if (!card) return;

    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    app.$('#detailPage').classList.add('active');
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });

    // 进入详情页时隐藏底部导航
    var bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) bottomNav.style.display = 'none';

    app.$('#detailTitle').textContent = card.title;
    app.renderDetail(card);
  };

  app.renderDetail = function(card) {
    var body = app.$('#detailBody');
    body.innerHTML = '';

    if (card.category === 'numeric') {
      var lastValue = card.data.length ? card.data[card.data.length - 1].value : card.value;
      body.innerHTML =
        '<div class="detail-summary">' +
        '<div class="big-value">' + lastValue + '</div>' +
        '<div class="summary-info"><p>' + card.unit + '</p><p>最近 7 次记录</p></div>' +
        '</div>' +
        '<div class="chart-wrap"><canvas id="detailChart" class="chart-canvas"></canvas></div>' +
        '<div class="detail-list-title">历史记录</div>' +
        '<div class="detail-list">' +
        card.data.slice().reverse().map(function(d) {
          return '<div class="detail-list-item"><span class="time">' + d.date + '</span><span class="value">' + d.value + ' ' + card.unit + '</span></div>';
        }).join('') +
        '</div>';
      setTimeout(function() { app.drawBarChart(card.data, card.unit); }, 50);
    } else if (card.category === 'timeline') {
      body.innerHTML =
        '<div class="detail-summary">' +
        '<div class="big-value">' + card.data.length + '</div>' +
        '<div class="summary-info"><p>条记录</p><p>' + card.title + '</p></div>' +
        '</div>' +
        '<div class="detail-list-title">时间轴</div>' +
        '<div class="timeline">' +
        card.data.slice().reverse().map(function(d) {
          return '<div class="timeline-item"><div class="time">' + (d.time || d.date) + '</div><div class="content">' + d.content + '</div></div>';
        }).join('') +
        '</div>';
    } else if (card.category === 'reminder') {
      var cfg = card.data.config || {};
      body.innerHTML =
        '<div class="reminder-config">' +
        '<h4>当前提醒配置</h4>' +
        '<div class="reminder-row"><span>药品/事项</span><span>' + (cfg.name || '未设置') + '</span></div>' +
        '<div class="reminder-row"><span>剂量</span><span>' + (cfg.dose || '-') + '</span></div>' +
        '<div class="reminder-row"><span>时间</span><span>' + (cfg.time || '-') + '</span></div>' +
        '<div class="reminder-row"><span>频率</span><span>' + (cfg.frequency || '-') + '</span></div>' +
        '</div>' +
        '<div class="detail-list-title">最近提醒记录</div>' +
        '<div class="detail-list">' +
        (card.data.records || []).map(function(r) {
          return '<div class="detail-list-item"><span class="time">' + r.date + '</span><span class="value" style="color:' + (r.status === '已服用' ? 'var(--success)' : 'var(--danger)') + '">' + r.status + '</span></div>';
        }).join('') +
        '</div>';
    } else if (card.category === 'other') {
      body.innerHTML =
        '<div class="detail-summary">' +
        '<div class="big-value">' + card.value + '</div>' +
        '<div class="summary-info"><p>今日心情</p><p>点击选择心情</p></div>' +
        '</div>' +
        '<div class="mood-grid">' +
        ['😄','😊','😐','😔','😡'].map(function(m) { return '<button class="mood-item" onclick="app.setMood(\'' + m + '\')">' + m + '</button>'; }).join('') +
        '</div>' +
        '<div class="detail-list-title">近 7 天心情</div>' +
        '<div class="detail-list">' +
        card.data.slice().reverse().map(function(d) {
          return '<div class="detail-list-item"><span class="time">' + d.date + '</span><span class="value">' + d.value + '</span></div>';
        }).join('') +
        '</div>';
    }
  };

  /* ========== Bar Chart（柱状图）========== */
  app.drawBarChart = function(data) {
    var canvas = app.$('#detailChart');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    var points = data.slice(-7);
    var labels = points.map(function(p) { return p.date.slice(5); });
    var values = points.map(function(p) {
      var num = parseFloat(p.value);
      return isNaN(num) ? 0 : num;
    });
    if (values.length === 0) values = [0];

    var padding = { top: 25, right: 16, bottom: 28, left: 16 };
    var w = rect.width - padding.left - padding.right;
    var h = rect.height - padding.top - padding.bottom;
    var max = Math.max.apply(null, values.concat([1]));
    var min = Math.min.apply(null, values.concat([0]));
    var range = max - min || 1;
    var barMaxHeight = Math.max(h - 10, 1);

    // 优先使用当前主题色，辅以协调色库
    var themeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    var COLOR_PALETTE = [themeAccent,
      '#8E6B51', '#3A7D44', '#4A6FA5', '#B85C7A', '#7A5C9C',
      '#E8734A', '#2CA89A', '#D4A72C', '#5C7CFA', '#E05B8C',
      '#20B8A0', '#F07B4E', '#6C8EBF', '#C060A0', '#50A060'
    ];
    // 70% 概率使用主题色，30% 随机选
    var chartColor = Math.random() < 0.7 ? themeAccent : COLOR_PALETTE[Math.floor(Math.random() * (COLOR_PALETTE.length - 1)) + 1];

    var barCount = values.length;
    var barWidth = Math.min(24, (w / barCount) * 0.35);
    var gap = w / barCount;

    // 动画状态：每个柱子的进度 0→1，逐个生长
    var barProgress = values.map(function() { return 0; });
    var currentBar = 0;
    var animSpeed = 0.12;

    function drawFrame() {
      ctx.clearRect(0, 0, rect.width, rect.height);

      // 水平网格线
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 3; i++) {
        var gy = padding.top + (h / 3) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, gy);
        ctx.lineTo(padding.left + w, gy);
        ctx.stroke();
      }

      // 基线
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, padding.top + h);
      ctx.lineTo(padding.left + w, padding.top + h);
      ctx.stroke();

      // 绘制每个柱子（统一颜色）
      values.forEach(function(v, i) {
        var targetH = ((v - min) / range) * barMaxHeight;
        var currentH = targetH * barProgress[i];
        if (currentH < 0.5) currentH = 0.5; // 0 值也露一点头
        var x = padding.left + gap * i + (gap - barWidth) / 2;
        var y = padding.top + h - currentH;

        var radius = Math.min(7, barWidth / 2);
        ctx.fillStyle = chartColor;
        ctx.beginPath();
        ctx.moveTo(x, padding.top + h);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, padding.top + h);
        ctx.closePath();
        ctx.fill();

        // 数值标签（柱子长出超过一半时显示）
        if (barProgress[i] > 0.6) {
          ctx.fillStyle = chartColor;
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(v, x + barWidth / 2, y - 6);
        }
      });

      // 日期标签
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      labels.forEach(function(l, i) {
        var lx = padding.left + gap * i + gap / 2;
        ctx.fillText(l, lx, rect.height - 6);
      });

      // 逐个推进当前柱子的动画
      if (currentBar < barCount) {
        barProgress[currentBar] = Math.min(1, barProgress[currentBar] + animSpeed);
        if (barProgress[currentBar] >= 1) {
          currentBar++;
        }
      }

      if (currentBar < barCount) {
        requestAnimationFrame(drawFrame);
      }
    }

    drawFrame();
  };

  app.openAddDetailData = function() {
    var state = app.state;
    var card = state.cards.find(function(c) { return c.id === app.currentDetailId; });
    if (!card) return;

    if (card.category === 'numeric') {
      openModal('添加 ' + card.title,
        '<div class="form-group"><label>数值 (' + card.unit + ')</label><input type="text" id="detailValue" placeholder="请输入数值"></div>' +
        '<div class="form-group"><label>日期</label><input type="date" id="detailDate" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
        '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveDetailData()">保存</button></div>'
      );
    } else if (card.category === 'timeline') {
      openModal('添加 ' + card.title,
        '<div class="form-group"><label>时间</label><input type="time" id="detailTime" value="' + new Date().toTimeString().slice(0,5) + '"></div>' +
        '<div class="form-group"><label>内容</label><input type="text" id="detailContent" placeholder="记录内容"></div>' +
        '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveDetailData()">保存</button></div>'
      );
    } else if (card.category === 'reminder') {
      var cfg = card.data.config || {};
      openModal('编辑提醒',
        '<div class="form-group"><label>药品/事项</label><input type="text" id="reminderName" value="' + (cfg.name || '') + '" placeholder="例如：维生素 C"></div>' +
        '<div class="form-group"><label>剂量</label><input type="text" id="reminderDose" value="' + (cfg.dose || '') + '" placeholder="例如：1 片"></div>' +
        '<div class="form-group"><label>提醒时间</label><input type="time" id="reminderTime" value="' + (cfg.time || '08:00') + '"></div>' +
        '<div class="form-group"><label>频率</label><select id="reminderFreq">' +
        '<option value="每天"' + (cfg.frequency === '每天' ? ' selected' : '') + '>每天</option>' +
        '<option value="每周"' + (cfg.frequency === '每周' ? ' selected' : '') + '>每周</option>' +
        '<option value="仅一次"' + (cfg.frequency === '仅一次' ? ' selected' : '') + '>仅一次</option>' +
        '</select></div>' +
        '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveDetailData()">保存</button></div>'
      );
    }
  };

  app.saveDetailData = function() {
    var state = app.state;
    var card = state.cards.find(function(c) { return c.id === app.currentDetailId; });
    if (!card) return;

    if (card.category === 'numeric') {
      var value = app.$('#detailValue').value;
      var date = app.$('#detailDate').value;
      if (!value || !date) return toast('请填写完整');
      card.data.push({ date: date, value: value });
      card.value = value;
    } else if (card.category === 'timeline') {
      var time = app.$('#detailTime').value;
      var content = app.$('#detailContent').value;
      if (!content) return toast('请填写内容');
      card.data.push({ time: time, content: content });
      card.value = card.data.length + ' 条';
    } else if (card.category === 'reminder') {
      card.data.config = {
        name: app.$('#reminderName').value,
        dose: app.$('#reminderDose').value,
        time: app.$('#reminderTime').value,
        frequency: app.$('#reminderFreq').value
      };
      card.value = (card.data.config.frequency || '') + ' ' + (card.data.config.time || '');
    }

    saveState();
    app.renderDetail(card);
    app.renderHome();
    closeModal();
    toast('已保存');
  };

  app.setMood = function(mood) {
    var state = app.state;
    var card = state.cards.find(function(c) { return c.id === app.currentDetailId; });
    if (!card) return;
    card.value = mood;
    card.data.push({ date: new Date().toISOString().split('T')[0], value: mood });
    saveState();
    app.renderDetail(card);
    app.renderHome();
    toast('心情已记录');
  };

})();
