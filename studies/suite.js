/* COOKT review controls. GitHub credentials stay in memory for this page only. */
(() => {
  'use strict';
  const core = window.CooktSuiteCore;
  const catalog = JSON.parse(document.getElementById('catalog').textContent);
  const archived = document.body.dataset.graveyard === 'true';
  if (archived && !catalog.counts.items) document.getElementById('empty').textContent = 'The graveyard is empty.';
  const store = 'cookt-studies-review-v1';
  let prefs = {stars: {}, notes: {}, reviewNotes: ''}, storageOK = true;
  try { prefs = {...prefs, ...JSON.parse(localStorage.getItem(store) || '{}')}; } catch (_) { storageOK = false; }
  const selected = new Set(), cards = new Map();
  let selecting = false, starredOnly = false, token = '', login = '', busy = false;
  const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value; return el; };
  const button = (label, action) => { const b = text('button', label); b.type = 'button'; b.onclick = action; return b; };
  const bar = document.createElement('nav'); bar.className = 'suite-bar'; bar.setAttribute('aria-label', 'Review tools');
  const starFilter = button('★ Starred', () => { starredOnly = !starredOnly; refresh(); }); starFilter.setAttribute('aria-pressed', 'false');
  const selectButton = button('Select items', () => { selecting = !selecting; refresh(); }); selectButton.setAttribute('aria-pressed', 'false');
  const bundleButton = button('Bundle (0)', openBundle);
  const moveButton = button('Move to graveyard', confirmMove); moveButton.className = 'suite-danger';
  const clearButton = button('Clear selection', () => { selected.clear(); refresh(); });
  const account = button('Connect GitHub', openAccount); account.className = 'suite-account';
  const status = text('p', ''); status.className = 'suite-status'; status.setAttribute('role', 'status');
  bar.append(starFilter, selectButton, bundleButton, clearButton);
  if (!archived) bar.append(moveButton, account);
  bar.append(status); document.querySelector('.scopebar').before(bar);
  new ResizeObserver(() => document.documentElement.style.setProperty('--review-toolbar-height', bar.offsetHeight + 'px')).observe(bar);
  const dialog = document.createElement('dialog'); dialog.className = 'suite-dialog'; dialog.setAttribute('aria-label', 'Review tools'); document.body.append(dialog);
  const save = () => {
    try { localStorage.setItem(store, JSON.stringify(prefs)); } catch (_) { storageOK = false; }
    if (!storageOK) status.textContent = 'Browser storage is unavailable. Export your notes before closing this page.';
  };
  const dialogStart = title => { if (dialog.open) dialog.close(); dialog.replaceChildren(text('h2', title)); };
  const dialogShow = () => dialog.showModal();
  const close = () => { if (!busy) dialog.close(); };
  const message = value => { status.textContent = value; };
  const all = core.items(catalog);
  const byKey = new Map(all.map(rec => [core.key(rec.it), rec]));
  catalog.groups.forEach(g => {
    const groupCards = [...document.getElementById(g.id).querySelectorAll('.card')];
    const records = g.rows.flatMap(r => r.items);
    groupCards.forEach((card, i) => {
      const it = records[i], id = core.key(it); card.dataset.suiteKey = id;
      if (!cards.has(id)) cards.set(id, []); cards.get(id).push(card);
      const tools = document.createElement('div'); tools.className = 'suite-item-tools';
      const star = button('☆', () => { if (prefs.stars[id]) delete prefs.stars[id]; else prefs.stars[id] = true; save(); refresh(); });
      star.setAttribute('aria-label', 'Star ' + it.title); star.className = 'suite-star';
      const label = document.createElement('label'); label.className = 'suite-check';
      const check = document.createElement('input'); check.type = 'checkbox'; check.setAttribute('aria-label', 'Select ' + it.title);
      check.onchange = () => { if (check.checked) selected.add(id); else selected.delete(id); refresh(); };
      label.append(check, text('span', 'Select')); tools.append(star, label); card.append(tools);
    });
    if (records.length) {
      const groupSelect = button('Select study', () => {
        selecting = true; records.forEach(it => selected.add(core.key(it))); refresh();
      }); groupSelect.className = 'suite-check'; document.getElementById(g.id).querySelector('.links').append(groupSelect);
    }
  });
  function refresh() {
    window.CooktSuiteStarredOnly = starredOnly;
    window.CooktSuiteStars = new Set(Object.keys(prefs.stars).filter(id => prefs.stars[id]));
    starFilter.setAttribute('aria-pressed', String(starredOnly));
    starFilter.textContent = '★ Starred (' + [...byKey.keys()].filter(id => prefs.stars[id]).length + ')';
    selectButton.setAttribute('aria-pressed', String(selecting)); document.body.classList.toggle('suite-selecting', selecting);
    for (const [id, list] of cards) for (const card of list) {
      const star = card.querySelector('.suite-star'); star.textContent = prefs.stars[id] ? '★' : '☆';
      star.setAttribute('aria-pressed', String(!!prefs.stars[id])); star.setAttribute('aria-label', (prefs.stars[id] ? 'Unstar ' : 'Star ') + byKey.get(id).it.title);
      card.querySelector('input[type=checkbox]').checked = selected.has(id); card.classList.toggle('suite-selected', selected.has(id));
    }
    bundleButton.textContent = 'Bundle (' + selected.size + ')'; bundleButton.disabled = !selected.size || busy;
    moveButton.disabled = !selected.size || busy; clearButton.disabled = !selected.size || busy;
    account.textContent = token ? login + ' · Disconnect' : 'Connect GitHub';
    window.dispatchEvent(new Event('cookt-suite-filter'));
  }
  window.addEventListener('storage', event => {
    if (event.key !== store) return;
    try { prefs = {...prefs, ...JSON.parse(event.newValue || '{}')}; refresh(); } catch (_) {}
  });
  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], {type})); const a = document.createElement('a'); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function galleryURL() { return new URL(archived ? '../' : './', location.href).href.split('#')[0]; }
  function openBundle() {
    dialogStart('Review bundle');
    dialog.append(text('p', selected.size + (selected.size === 1 ? ' image.' : ' images.') + ' Notes and stars are saved in this browser. A bundle includes your notes and the selected images for another review.'));
    const overallLabel = text('label', 'Overall feedback'); const overall = document.createElement('textarea'); overall.value = prefs.reviewNotes;
    overall.oninput = () => { prefs.reviewNotes = overall.value; save(); }; overallLabel.append(overall); dialog.append(overallLabel);
    for (const id of selected) {
      const {it, g} = byKey.get(id), article = document.createElement('article');
      article.append(text('p', g.title + ' / ' + it.title));
      const image = document.createElement('img'); image.src = it.thumb; image.alt = it.title; image.className = 'suite-preview'; article.append(image);
      const label = text('label', 'Notes for ' + it.title), notes = document.createElement('textarea'); notes.value = prefs.notes[id] || '';
      notes.oninput = () => { prefs.notes[id] = notes.value; save(); }; label.append(notes); article.append(label); dialog.append(article);
    }
    const actions = document.createElement('div'); actions.className = 'suite-actions';
    const get = () => core.bundle(catalog, selected, prefs, galleryURL());
    actions.append(button('Download Markdown', () => download('cookt-review-notes.md', get().markdown, 'text/markdown')),
      button('Download ZIP with images', async event => {
        const b = event.currentTarget; b.disabled = true; b.textContent = 'Building bundle…';
        try {
          await loadLibrary('vendor/jszip-3.10.1.min.js', 'JSZip');
          const output = get(), zip = new JSZip(); zip.file('review-notes.md', output.markdown); zip.file('review.json', JSON.stringify(output.data, null, 2));
          const localMD = output.markdown;
          let imageMD = localMD;
          for (const item of output.data.items) {
            const response = await fetch(item.imageUrl); if (!response.ok) throw new Error('Could not download ' + item.title + '.');
            const bytes = new Uint8Array(await response.arrayBuffer());
            if (await digest(bytes) !== item.sha256) throw new Error('The image changed: ' + item.title + '. Reload and try again.');
            zip.file(item.file, bytes); imageMD = imageMD.replace(item.imageUrl, item.file);
          }
          zip.file('review-notes.md', imageMD);
          download('cookt-review-bundle.zip', await zip.generateAsync({type: 'uint8array', compression: 'STORE'}), 'application/zip');
        } catch (error) { message(error.message); }
        finally { b.disabled = false; b.textContent = 'Download ZIP with images'; }
      }), button('Copy feedback', async () => {
        try { await navigator.clipboard.writeText(get().markdown); message('Feedback copied.'); } catch (_) { message('Clipboard unavailable. Download Markdown instead.'); }
      }), button('Close', close)); dialog.append(actions); dialogShow();
  }
  const apiRoot = 'https://api.github.com/repos/jalulia/cookt';
  async function api(path, method = 'GET', body, outside = false) {
    const response = await fetch(outside ? 'https://api.github.com' + path : apiRoot + path,
      {method, headers: {Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + token,
        'X-GitHub-Api-Version': '2022-11-28', ...(body ? {'Content-Type': 'application/json'} : {})}, ...(body ? {body: JSON.stringify(body)} : {})});
    if (!response.ok) {
      if (response.status === 401) { token = ''; login = ''; refresh(); throw new Error('Your GitHub token expired or is invalid. Connect again.'); }
      if (response.status === 409 || response.status === 422) throw new Error('The repository changed or rejected this update. Reload and try again; no changes were overwritten.');
      if (response.status === 403) throw new Error('GitHub denied this operation. Check repository Contents read/write permission and your API rate limit.');
      throw new Error('GitHub request failed (' + response.status + '). No removal has been confirmed.');
    }
    return response.json();
  }
  function openAccount() {
    if (token) { token = ''; login = ''; refresh(); message('Disconnected.'); return; }
    dialogStart('Connect GitHub');
    dialog.append(text('p', 'Moving items changes the shared published gallery. Use a fine-grained GitHub token for jalulia/cookt with Contents: read and write. The token stays in memory until you disconnect or leave this page.'));
    const link = text('a', 'Create a GitHub token ↗'); link.href = 'https://github.com/settings/personal-access-tokens/new?name=COOKT%20studies&contents=write'; link.target = '_blank'; link.rel = 'noopener noreferrer'; dialog.append(link);
    const label = text('label', 'GitHub token'), input = document.createElement('input'); input.type = 'password'; input.autocomplete = 'off'; input.spellcheck = false; label.append(input); dialog.append(label);
    const error = text('p', ''); error.setAttribute('role', 'status'); dialog.append(error);
    const connect = button('Connect', async () => {
      token = input.value.trim(); input.value = ''; connect.disabled = true;
      try {
        if (!token) throw new Error('Enter a token.');
        const user = await api('/user', 'GET', undefined, true), repo = await api('');
        if (!repo.permissions?.push) throw new Error('This account does not have write access to jalulia/cookt.');
        login = user.login; dialog.close(); refresh(); message('Connected. Select items to move them to the graveyard.');
      } catch (e) { token = ''; login = ''; error.textContent = e.message; }
      finally { connect.disabled = false; }
    });
    const actions = document.createElement('div'); actions.className = 'suite-actions'; actions.append(connect, button('Cancel', close)); dialog.append(actions); dialogShow();
  }
  function confirmMove() {
    if (!token) { openAccount(); return; }
    dialogStart('Move to graveyard?');
    dialog.append(text('p', selected.size + (selected.size === 1 ? ' selected image will' : ' selected images will') + ' leave the shared gallery, study viewers and review PDFs. All occurrences of each selected image move together.'));
    dialog.append(text('p', 'The graveyard has an unlisted URL. It is not private: anyone with the URL can view it. Local creative sources and repository history are retained.'));
    const list = document.createElement('ul'); [...selected].slice(0,20).forEach(id => list.append(text('li', byKey.get(id).it.title))); dialog.append(list);
    if (selected.size > 20) dialog.append(text('p', 'And ' + (selected.size - 20) + ' more.'));
    const progress = text('p', ''); progress.setAttribute('role', 'status'); dialog.append(progress);
    const confirm = button('Move ' + selected.size + (selected.size === 1 ? ' image' : ' images'), async () => {
      busy = true; confirm.disabled = true; cancel.disabled = true; refresh();
      try {
        progress.textContent = 'Preparing the gallery and PDFs…';
        const receipt = await publishMove([...selected], value => progress.textContent = value);
        selected.clear();
        progress.textContent = 'Saved to GitHub. The published gallery is updating. You can close this dialog; this page will refresh when the new release is live.';
        message('Moved to graveyard. Waiting for the published update…');
        waitForPublication(receipt);
      } catch (e) { progress.textContent = e.message; message(e.message); }
      finally { busy = false; cancel.disabled = false; cancel.textContent = 'Close'; refresh(); }
    }); confirm.className = 'suite-danger'; const cancel = button('Cancel', close);
    const actions = document.createElement('div'); actions.className = 'suite-actions'; actions.append(confirm, cancel); dialog.append(actions); dialogShow();
  }
  dialog.addEventListener('cancel', event => { if (busy) event.preventDefault(); });
  const decoder = new TextDecoder(), encoder = new TextEncoder();
  const bytesFrom64 = value => Uint8Array.from(atob(value.replace(/\s/g, '')), c => c.charCodeAt(0));
  function base64(bytes) { let s = ''; for (let at = 0; at < bytes.length; at += 32768) s += String.fromCharCode(...bytes.subarray(at, at + 32768)); return btoa(s); }
  async function digest(bytes) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(b => b.toString(16).padStart(2,'0')).join(''); }
  async function loadLibrary(path, global) {
    if (window[global]) return;
    await new Promise((resolve, reject) => { const script = document.createElement('script'); script.src = path; script.onload = resolve; script.onerror = () => { script.remove(); reject(new Error('Could not load the bundle library. Try again.')); }; document.head.append(script); });
  }
  async function publishMove(keys, progress) {
    const ref = await api('/git/ref/heads/main'), commit = await api('/git/commits/' + ref.object.sha);
    const tree = await api('/git/trees/' + commit.tree.sha + '?recursive=1');
    if (tree.truncated) throw new Error('The repository tree is too large for a safe update.');
    const files = new Map(tree.tree.filter(f => f.type === 'blob').map(f => [f.path, f]));
    const read = async path => {
      const file = files.get('studies/' + path); if (!file) throw new Error('Missing published file: ' + path);
      const blob = await api('/git/blobs/' + file.sha); if (blob.encoding !== 'base64') throw new Error('Unsupported GitHub file encoding.'); return bytesFrom64(blob.content);
    };
    const readJSON = async (path, fallback) => files.has('studies/' + path) ? JSON.parse(decoder.decode(await read(path))) : fallback;
    const current = await readJSON('catalog.json'), release = await readJSON('release.json');
    const archive = await readJSON('graveyard/catalog.json', {...current, groups: [], timeline: []});
    const registry = await readJSON('curation.json', {schema:'cookt.studies-curation/1', removed:[]});
    const date = new Date().toISOString(), result = core.move(current, archive, keys, registry, date);
    if (!result.moved.length) throw new Error('These images have already left the gallery. Reload to see the current collection.');
    const changes = new Map(), removed = new Set();
    const setText = (path, value) => changes.set(path, encoder.encode(value));
    const page = decoder.decode(await read('index.html'));
    setText('catalog.json', JSON.stringify(result.active, null, 2) + '\n');
    setText('index.html', core.replaceCatalog(page, result.active));
    setText('graveyard/catalog.json', JSON.stringify(result.graveyard, null, 2) + '\n');
    setText('graveyard/index.html', core.archivePage(page, result.graveyard));
    setText('curation.json', JSON.stringify(result.registry, null, 2) + '\n');
    const selectedKeys = new Set(keys);
    await loadLibrary('vendor/pdf-lib-1.17.1.min.js', 'PDFLib');
    for (const original of result.affected) {
      progress('Updating ' + original.title + '…');
      const g = result.active.groups.find(g => g.id === original.id);
      const viewerPath = 'reviews/' + original.id + '.html', pdfPath = 'downloads/cookt-' + original.id + '-review-v001.pdf';
      if (!g) { removed.add(viewerPath); removed.add(pdfPath); continue; }
      setText(viewerPath, core.replaceViewer(decoder.decode(await read(viewerPath)), g));
      const source = await PDFLib.PDFDocument.load(await read(pdfPath));
      const originalItems = original.rows.flatMap(r => r.items);
      if (source.getPageCount() !== originalItems.length + 1) throw new Error('The PDF and gallery do not agree for ' + original.title + '. Nothing has been published.');
      const indexes = [0, ...originalItems.flatMap((it, i) => selectedKeys.has(core.key(it)) ? [] : [i + 1])];
      const fresh = await PDFLib.PDFDocument.create();
      (await fresh.copyPages(source, indexes)).forEach(p => fresh.addPage(p));
      fresh.setTitle('COOKT / ' + g.title); fresh.setAuthor('COOKT');
      changes.set(pdfPath, await fresh.save());
    }
    release.counts = result.active.counts; release.curationUpdated = date;
    release.files = release.files.filter(f => !removed.has(f.path));
    for (const [path, bytes] of changes) {
      const row = {path, sha256: await digest(bytes), bytes: bytes.length};
      const at = release.files.findIndex(f => f.path === path); if (at < 0) release.files.push(row); else release.files[at] = row;
    }
    release.files.sort((a,b) => a.path.localeCompare(b.path));
    setText('release.json', JSON.stringify(release, null, 2) + '\n');
    // Assert both published copies agree before touching either copy.
    for (const path of [...changes.keys(), ...removed]) {
      const root = files.get('studies/' + path), mirror = files.get('site/studies/' + path);
      if (root?.sha !== mirror?.sha) throw new Error('The two publication copies differ. No update was made.');
    }
    progress('Saving the shared gallery…');
    const entries = [];
    for (const [path, bytes] of changes) {
      const blob = await api('/git/blobs', 'POST', {content: base64(bytes), encoding: 'base64'});
      for (const prefix of ['studies/', 'site/studies/']) entries.push({path: prefix + path, mode:'100644', type:'blob', sha:blob.sha});
    }
    for (const path of removed) for (const prefix of ['studies/', 'site/studies/']) if (files.has(prefix + path)) entries.push({path:prefix + path,mode:'100644',type:'blob',sha:null});
    const nextTree = await api('/git/trees', 'POST', {base_tree:commit.tree.sha, tree:entries});
    const nextCommit = await api('/git/commits', 'POST', {message:'Move ' + new Set(result.moved.map(core.key)).size + ' COOKT study images to the graveyard', tree:nextTree.sha, parents:[ref.object.sha]});
    try { await api('/git/refs/heads/main', 'PATCH', {sha:nextCommit.sha, force:false}); }
    catch (error) {
      // A lost response can follow a successful save. Check the branch before reporting failure.
      const now = await api('/git/ref/heads/main'); if (now.object.sha !== nextCommit.sha) throw error;
    }
    return {commit:nextCommit.sha, updated:date, keys:[...new Set(result.moved.map(core.key))]};
  }
  async function waitForPublication(receipt) {
    for (let i = 0; i < 60; i++) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        const response = await fetch('curation.json?release=' + Date.now(), {cache:'no-store'});
        if (response.ok) {
          const state = await response.json(), published = new Set(state.removed.map(r => r.key));
          if (receipt.keys.every(key => published.has(key))) { location.reload(); return; }
        }
      } catch (_) {}
    }
    message('Saved in commit ' + receipt.commit.slice(0,7) + '. Publication is taking longer than expected. Refresh in a few minutes.');
  }
  refresh();
})();
