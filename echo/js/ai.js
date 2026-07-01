window.app = window.app || {};

(function() {
  'use strict';

  var $ = app.$;
  var toast = app.toast;
  var openModal = app.openModal;
  var closeModal = app.closeModal;
  var saveState = app.saveState;

  /* ========== Avatar List ========== */
  app.renderAvatars = function() {
    var state = app.state;
    var list = app.$('#avatarList');
    var chatable = state.avatars.filter(function(a) { return a.id !== 'me'; });
    list.innerHTML = chatable.map(function(a, idx) {
      var last = (a.messages && a.messages.length) ? a.messages[a.messages.length - 1] : null;
      var lastText = last ? (last.from === 'me' ? '我：' : a.name + '：') + last.text : '暂无聊天记录';
      return '<div class="avatar-card"' +
        ' onclick="app.selectAvatar(\'' + a.id + '\')"' +
        ' oncontextmenu="event.preventDefault(); app.editAvatar(\'' + a.id + '\')">' +
        '<div class="avatar-info">' +
        '<div class="name"><span class="type-tag">' + (a.type === 'human' ? '人物' : '宠物') + '</span>' + a.name + '</div>' +
        '<div class="last-msg">' + lastText + '</div>' +
        '</div>' +
        '<img src="' + a.avatar + '" alt="' + a.name + '">' +
        '</div>';
    }).join('');
  };

  app.selectAvatar = function(id) {
    var state = app.state;
    state.currentAvatarId = id;
    saveState();
    app.switchTab('chat');
  };

  /* ========== Chat Page ========== */
  app.renderChat = function() {
    var state = app.state;
    var avatar = state.avatars.find(function(a) { return a.id === state.currentAvatarId; }) || state.avatars[0];
    state.currentAvatarId = avatar.id;

    app.$('#chatHeaderAvatar').src = avatar.avatar;
    app.$('#chatHeaderName').textContent = avatar.name;

    var box = app.$('#chatMessages');
    box.innerHTML = avatar.messages.map(function(m) {
      return '<div class="chat-item ' + (m.from === 'me' ? 'me' : '') + '">' +
        '<img src="' + (m.from === 'me' ? state.user.avatar : avatar.avatar) + '" alt="" class="chat-avatar">' +
        '<div>' +
        '<div class="chat-bubble">' + m.text + '</div>' +
        '<div class="chat-meta">' + m.time + '</div>' +
        '</div></div>';
    }).join('');
    box.scrollTop = box.scrollHeight;
  };

  /* ========== Add / Edit Avatar ========== */
  app.openAddAvatar = function() {
    app.newAvatarPhoto = null;
    openModal('添加陪伴形象',
      '<div class="form-group">' +
      '<label>形象类型</label>' +
      '<select id="avatarType" onchange="app.resetAvatarPreview()">' +
      '<option value="human">人物</option><option value="pet">宠物</option>' +
      '</select></div>' +
      '<div class="form-group">' +
      '<label>照片</label>' +
      '<input type="file" id="avatarFile" accept="image/*" style="display:none" onchange="app.pickRandomAvatarPhoto()">' +
      '<button type="button" class="btn-secondary" style="width:100%" onclick="document.querySelector(\'#avatarFile\').click()">点击上传照片</button>' +
      '<div id="avatarPreview" style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap"></div>' +
      '</div>' +
      '<div class="form-group"><label>昵称</label><input type="text" id="avatarName" placeholder="起个名字"></div>' +
      '<div class="form-group"><label>生日</label><input type="date" id="avatarBirthday"></div>' +
      '<div class="form-group"><label>性格特征</label><input type="text" id="avatarPersonality" placeholder="例如：温柔、幽默、活泼"></div>' +
      '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveAvatar()">添加</button></div>'
    );
  };

  app.resetAvatarPreview = function() {
    app.newAvatarPhoto = null;
    app.$('#avatarPreview').innerHTML = '';
  };

  app.pickRandomAvatarPhoto = function() {
    var type = app.$('#avatarType').value;
    var pool = type === 'human'
      ? ['human1.png', 'human2.png', 'human3.png', 'human4.png']
      : ['pet1.png', 'pet2.png', 'pet3.png', 'pet4.png'];
    var photo = pool[Math.floor(Math.random() * pool.length)];
    app.newAvatarPhoto = './images/' + photo;
    app.$('#avatarPreview').innerHTML =
      '<img src="' + app.newAvatarPhoto + '" class="file-preview" style="width:80px;height:80px;object-fit:contain;background:var(--bg)" alt="随机形象">' +
      '<span style="font-size:12px;color:var(--text-secondary);align-self:center">已随机匹配形象照片</span>';
  };

  app.saveAvatar = function() {
    var state = app.state;
    var type = app.$('#avatarType').value;
    var name = app.$('#avatarName').value;
    var birthday = app.$('#avatarBirthday').value;
    var personality = app.$('#avatarPersonality').value;
    if (!name) return toast('请填写昵称');
    if (!app.newAvatarPhoto) return toast('请先点击上传照片');

    state.avatars.push({
      id: 'avatar_' + Date.now(),
      type: type,
      name: name,
      avatar: app.newAvatarPhoto,
      birthday: birthday,
      personality: personality,
      messages: [
        { from: 'avatar', text: '你好呀，我是' + name + '，以后请多关照～', time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }
      ]
    });
    saveState();
    app.renderAvatars();
    app.renderProfile();
    closeModal();
    toast('形象已添加');
  };

  app.editAvatar = function(id) {
    var state = app.state;
    var a = state.avatars.find(function(x) { return x.id === id; });
    if (!a) return;
    openModal('编辑形象',
      '<div class="form-group"><label>昵称</label><input type="text" id="editAvatarName" value="' + a.name + '"></div>' +
      '<div class="form-group"><label>性格</label><input type="text" id="editAvatarPersonality" value="' + (a.personality || '') + '"></div>' +
      '<div class="modal-actions"><button class="btn-secondary" onclick="app.deleteAvatar(\'' + id + '\')">删除</button><button class="btn-primary" onclick="app.updateAvatar(\'' + id + '\')">保存</button></div>'
    );
  };

  app.updateAvatar = function(id) {
    var state = app.state;
    var a = state.avatars.find(function(x) { return x.id === id; });
    if (a) {
      a.name = app.$('#editAvatarName').value;
      a.personality = app.$('#editAvatarPersonality').value;
      saveState();
      app.renderAvatars();
      closeModal();
      toast('已保存');
    }
  };

  app.deleteAvatar = function(id) {
    var state = app.state;
    state.avatars = state.avatars.filter(function(a) { return a.id !== id; });
    saveState();
    app.renderAvatars();
    app.renderProfile();
    closeModal();
    toast('已删除');
  };

  /* ========== Chat Messages ========== */
  app.sendMessage = function() {
    var state = app.state;
    var input = app.$('#chatInput');
    var text = input.value.trim();
    if (!text) return;

    var avatar = state.avatars.find(function(a) { return a.id === state.currentAvatarId; });
    var time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    avatar.messages.push({ from: 'me', text: text, time: time });
    input.value = '';
    app.renderChat();

    setTimeout(function() {
      var reply = app.generateReply(text, avatar.personality);
      avatar.messages.push({ from: 'avatar', text: reply, time: time });
      saveState();
      app.renderChat();
    }, 800);
  };

  app.handleChatKey = function(e) {
    if (e.key === 'Enter') app.sendMessage();
  };

  app.generateReply = function(text, personality) {
    var lower = text.toLowerCase();
    if (lower.indexOf('吃') !== -1 || lower.indexOf('饿') !== -1) return '记得按时吃饭哦，身体好才是真的好～';
    if (lower.indexOf('累') !== -1 || lower.indexOf('困') !== -1) return '辛苦了，要不要休息一下？我可以陪你聊聊。';
    if (lower.indexOf('开心') !== -1 || lower.indexOf('高兴') !== -1) return '太好了！你的开心就是我的开心！😊';
    if (lower.indexOf('难过') !== -1 || lower.indexOf('伤心') !== -1) return '抱抱你。想说什么都可以告诉我，我会一直陪着你。';
    if (personality && personality.indexOf('傲娇') !== -1) return '哼，才不是特意回你呢。不过既然你说了，我就勉为其难陪你聊几句吧。';
    return '我在听呢，继续说下去吧。';
  };

  /* ========== Voice Input ========== */
  app.startVoice = function() {
    var btn = document.querySelector('.voice-btn');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast('当前浏览器不支持语音输入');
      return;
    }
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.interimResults = false;
    btn.classList.add('recording');
    recognition.start();
    recognition.onresult = function(e) {
      app.$('#chatInput').value = e.results[0][0].transcript;
      btn.classList.remove('recording');
      app.sendMessage();
    };
    recognition.onerror = function() {
      btn.classList.remove('recording');
      toast('语音识别失败');
    };
    recognition.onend = function() { btn.classList.remove('recording'); };
  };

})();
