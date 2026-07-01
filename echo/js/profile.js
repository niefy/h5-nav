window.app = window.app || {};

(function() {
  'use strict';

  var $ = app.$;
  var toast = app.toast;
  var openModal = app.openModal;
  var closeModal = app.closeModal;
  var saveState = app.saveState;

  /* ========== Profile ========== */
  app.renderProfile = function() {
    var state = app.state;
    app.$('#profileName').textContent = state.user.name;
    app.$('#profileId').textContent = state.user.id;
    app.$('#profileAvatar').src = state.user.avatar;
    app.$('#noteCount').textContent = state.notes.length;
    app.$('#avatarCount').textContent = state.avatars.length;
    app.$('#likeCount').textContent = state.notes.filter(function(n) { return !n.ai; }).length;
  };

  app.openEditProfile = function() {
    var state = app.state;
    var files = ['human1.png','human2.png','human3.png','human4.png'];
    openModal('编辑资料',
      '<div class="form-group"><label>昵称</label><input type="text" id="editName" value="' + state.user.name + '"></div>' +
      '<div class="form-group"><label>ID</label><input type="text" id="editId" value="' + state.user.id + '"></div>' +
      '<div class="form-group"><label>个人照片</label><select id="editAvatar">' +
      files.map(function(f) { return '<option value="' + f + '"' + (state.user.avatar.indexOf(f) !== -1 ? ' selected' : '') + '>' + f.replace('.png','') + '</option>'; }).join('') +
      '</select></div>' +
      '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveProfile()">保存</button></div>'
    );
  };

  app.saveProfile = function() {
    var state = app.state;
    state.user.name = app.$('#editName').value || state.user.name;
    state.user.id = app.$('#editId').value || state.user.id;
    state.user.avatar = './images/' + app.$('#editAvatar').value;
    saveState();
    app.renderHome();
    app.renderProfile();
    closeModal();
    toast('资料已更新');
  };

  /* ========== Settings ========== */
  app.openSettings = function() {
    var state = app.state;
    var contacts = state.settings.emergencyContacts || [];
    openModal('设置',
      '<div class="switch-row"><span>大字模式</span><div class="switch ' + (state.largeText ? 'on' : '') + '" onclick="app.toggleLargeText()"></div></div>' +
      '<div class="switch-row"><span>长时间未活跃预警</span><div class="switch ' + (state.settings.inactiveAlert ? 'on' : '') + '" onclick="app.toggleSetting(\'inactiveAlert\')"></div></div>' +
      '<div class="switch-row"><span>健康危机自动求助</span><div class="switch ' + (state.settings.sos ? 'on' : '') + '" onclick="app.toggleSetting(\'sos\')"></div></div>' +
      '<div class="form-group" style="margin-top:20px"><label>紧急联系人</label>' +
      '<div class="contact-list">' +
      contacts.map(function(c, i) {
        return '<div class="contact-item"><div class="info"><span class="name">' + c.name + '</span><span class="phone">' + c.phone + '</span></div><button class="delete" onclick="app.deleteContact(' + i + ')">删除</button></div>';
      }).join('') +
      '</div>' +
      '<div style="display:flex;gap:8px">' +
      '<input type="text" id="contactName" placeholder="姓名" style="flex:1">' +
      '<input type="text" id="contactPhone" placeholder="电话" style="flex:1.5">' +
      '<button class="btn-primary" onclick="app.addContact()" style="padding:10px 14px">添加</button>' +
      '</div></div>' +
      '<div class="form-group" style="margin-top:20px"><label>主题色</label><div class="theme-options">' +
      '<div class="theme-option' + (state.theme === 'warm' ? ' active' : '') + '" style="background:#8E6B51" onclick="app.setTheme(\'warm\')"></div>' +
      '<div class="theme-option' + (state.theme === 'green' ? ' active' : '') + '" style="background:#3A7D44" onclick="app.setTheme(\'green\')"></div>' +
      '<div class="theme-option' + (state.theme === 'blue' ? ' active' : '') + '" style="background:#4A6FA5" onclick="app.setTheme(\'blue\')"></div>' +
      '<div class="theme-option' + (state.theme === 'pink' ? ' active' : '') + '" style="background:#B85C7A" onclick="app.setTheme(\'pink\')"></div>' +
      '<div class="theme-option' + (state.theme === 'purple' ? ' active' : '') + '" style="background:#7A5C9C" onclick="app.setTheme(\'purple\')"></div>' +
      '</div></div>' +
      '<button class="btn-primary" style="width:100%;margin-top:20px" onclick="app.exportData()">导出我的数据</button>'
    );
  };

  app.setTheme = function(theme) {
    var state = app.state;
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme === 'warm' ? '' : theme);
    saveState();
    app.openSettings();
    toast('主题已切换');
  };

  app.toggleLargeText = function() {
    var state = app.state;
    state.largeText = !state.largeText;
    document.body.classList.toggle('large-text', state.largeText);
    saveState();
    app.openSettings();
  };

  app.toggleSetting = function(key) {
    var state = app.state;
    state.settings[key] = !state.settings[key];
    saveState();
    app.openSettings();
    toast('设置已保存');
  };

  app.addContact = function() {
    var state = app.state;
    var name = app.$('#contactName').value.trim();
    var phone = app.$('#contactPhone').value.trim();
    if (!name || !phone) return toast('请填写姓名和电话');
    state.settings.emergencyContacts.push({ name: name, phone: phone });
    saveState();
    app.openSettings();
    toast('紧急联系人已添加');
  };

  app.deleteContact = function(idx) {
    var state = app.state;
    state.settings.emergencyContacts.splice(idx, 1);
    saveState();
    app.openSettings();
    toast('已删除');
  };

  app.exportData = function() {
    var state = app.state;
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    var a = document.createElement('a');
    a.href = dataStr;
    a.download = 'echo_me_data_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    toast('数据已导出');
  };

})();
