window.app = window.app || {};

(function() {
  'use strict';

  var $ = app.$;
  var toast = app.toast;
  var openModal = app.openModal;
  var closeModal = app.closeModal;
  var saveState = app.saveState;

  /* ========== Notes List ========== */
  app.renderNotes = function(filter) {
    filter = filter || 'all';
    var state = app.state;
    var list = app.$('#notesList');
    var notes = state.notes;
    if (filter === 'ai') notes = notes.filter(function(n) { return n.ai; });
    if (filter === 'media') notes = notes.filter(function(n) { return ['image', 'video', 'audio'].indexOf(n.type) !== -1; });

    if (notes.length === 0) {
      list.innerHTML =
        '<div class="empty-state">' +
        '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
        '<p>暂无笔记</p></div>';
      return;
    }

    list.innerHTML = notes.map(function(note, idx) {
      var mediaHtml = '';
      if (note.type === 'image') {
        mediaHtml = '<div class="note-media"><img src="' + note.mediaUrl + '" alt=""></div>';
      } else if (note.type === 'video') {
        mediaHtml =
          '<div class="note-media"><video poster="' + (note.coverUrl || note.mediaUrl) + '" controls preload="metadata">' +
          '<source src="' + note.mediaUrl + '" type="video/mp4"></video></div>';
      } else if (note.type === 'audio') {
        var waveBars = '';
        for (var i = 0; i < 12; i++) {
          waveBars += '<span style="height:' + (Math.floor(Math.random() * 18 + 6)) + 'px"></span>';
        }
        mediaHtml =
          '<div class="note-audio">' +
          '<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>' +
          '<div class="wave">' + waveBars + '</div><span>0:12</span></div>';
      }

      return '<div class="note-item">' +
        '<span class="note-date">' + note.date + '</span>' +
        (note.content ? '<div class="note-content">' + note.content + '</div>' : '') +
        mediaHtml +
        (note.ai ? '<span class="note-label">🤖 AI自动生成</span>' : '') +
        '</div>';
    }).join('');
  };

  /* ========== Note Editor ========== */
  app.openNoteEditor = function() {
    app.noteMedia = null;
    app.noteMediaType = 'text';
    openModal('新建小记',
      '<div class="media-type-tabs">' +
      '<button class="media-type-tab active" onclick="app.setNoteType(\'text\')">文字</button>' +
      '<button class="media-type-tab" onclick="app.setNoteType(\'image\')">图片</button>' +
      '<button class="media-type-tab" onclick="app.setNoteType(\'video\')">视频</button>' +
      '<button class="media-type-tab" onclick="app.setNoteType(\'audio\')">音频</button>' +
      '</div>' +
      '<div class="form-group"><label>文字内容</label><textarea id="noteContent" placeholder="记录此刻..."></textarea></div>' +
      '<div class="form-group" id="noteMediaGroup" style="display:none">' +
      '<label id="mediaLabel">上传媒体</label>' +
      '<div class="file-upload">' +
      '<label for="noteFile"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>选择文件</label>' +
      '<input type="file" id="noteFile" style="display:none" onchange="app.handleNoteFile(this)">' +
      '<div id="noteFilePreview"></div>' +
      '</div></div>' +
      '<div class="modal-actions"><button class="btn-secondary" onclick="app.closeModal()">取消</button><button class="btn-primary" onclick="app.saveNote()">保存</button></div>'
    );
  };

  app.setNoteType = function(type) {
    app.noteMediaType = type;
    var types = ['text','image','video','audio'];
    document.querySelectorAll('.media-type-tab').forEach(function(t, i) {
      t.classList.toggle('active', types[i] === type);
    });
    var group = app.$('#noteMediaGroup');
    if (type === 'text') {
      group.style.display = 'none';
    } else {
      group.style.display = 'block';
      app.$('#mediaLabel').textContent = type === 'image' ? '上传图片' : type === 'video' ? '上传视频' : '上传音频';
      app.$('#noteFile').accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : 'audio/*';
    }
  };

  app.handleNoteFile = function(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      app.noteMedia = e.target.result;
      var preview = app.$('#noteFilePreview');
      var type = app.noteMediaType;
      if (type === 'image') {
        preview.innerHTML = '<img src="' + app.noteMedia + '" class="file-preview">';
      } else if (type === 'video') {
        preview.innerHTML = '<video src="' + app.noteMedia + '" class="file-preview" muted></video>';
      } else {
        preview.innerHTML = '<div class="file-preview" style="display:flex;align-items:center;justify-content:center;background:var(--accent-soft);color:var(--accent);font-size:12px">音频</div>';
      }
    };
    reader.readAsDataURL(file);
  };

  app.saveNote = function() {
    var state = app.state;
    var content = app.$('#noteContent').value.trim();
    if (app.noteMediaType !== 'text' && !app.noteMedia && !content) {
      toast('请填写文字或上传媒体');
      return;
    }
    if (app.noteMediaType === 'text' && !content) {
      toast('请填写内容');
      return;
    }

    var note = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      content: content,
      type: app.noteMediaType,
      ai: false
    };
    if (app.noteMediaType !== 'text') {
      note.mediaUrl = app.noteMedia;
      if (app.noteMediaType === 'video') note.coverUrl = app.noteMedia;
    }

    state.notes.unshift(note);
    saveState();
    app.renderNotes();
    app.renderProfile();
    closeModal();
    toast('小记已保存');
  };

})();
