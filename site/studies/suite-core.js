/* COOKT review-suite data operations. No credentials or browser storage here. */
(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const items = catalog => catalog.groups.flatMap(g => g.rows.flatMap(r => r.items.map(it => ({g, r, it}))));
  const key = it => it.src.split('/').pop().split('.')[0];
  const inline = value => JSON.stringify(value).replace(/<\//g, '<\\/');
  function recount(c) {
    c.counts = {groups: c.groups.length, items: items(c).length};
    const ids = new Set(c.groups.map(g => g.id));
    c.timeline = c.timeline.map(t => ({...t, groups: t.groups.filter(id => ids.has(id))}));
    return c;
  }
  function move(catalog, archive, keys, registry, date) {
    const selected = new Set(keys), active = clone(catalog), graveyard = clone(archive || {...catalog, groups: [], timeline: []});
    const affected = [], moved = [];
    for (const g of active.groups) {
      const original = clone(g);
      let touched = false;
      g.rows = g.rows.map(r => {
        const removed = r.items.filter(it => selected.has(key(it)));
        if (removed.length) { touched = true; moved.push(...removed); }
        return {...r, items: r.items.filter(it => !selected.has(key(it)))};
      }).filter(r => r.items.length);
      if (!touched) continue;
      affected.push(original);
      let ag = graveyard.groups.find(a => a.id === g.id);
      if (!ag) {
        ag = {...clone(original), links: [], rows: []};
        graveyard.groups.push(ag);
      }
      original.rows.forEach(r => {
        const removed = r.items.filter(it => selected.has(key(it)));
        if (!removed.length) return;
        const rowKey = JSON.stringify([r.label, r.note, r.kinds]);
        let ar = ag.rows.find(a => a.archiveRow === rowKey);
        if (!ar) { ar = {...clone(r), archiveRow: rowKey, items: []}; ag.rows.push(ar); }
        for (const it of removed) {
          if (!ar.items.some(a => key(a) === key(it) && a.title === it.title)) ar.items.push({...it, movedAt: date});
        }
      });
    }
    const touchedIds = new Set(affected.map(g => g.id));
    active.groups = active.groups.filter(g => !touchedIds.has(g.id) || g.rows.some(r => r.items.length));
    graveyard.scope = 'COOKT / Graveyard';
    graveyard.timeline = [];
    const nextRegistry = clone(registry || {schema: 'cookt.studies-curation/1', removed: []});
    const existing = new Set(nextRegistry.removed.map(r => r.key));
    for (const it of moved) if (!existing.has(key(it))) {
      nextRegistry.removed.push({key: key(it), movedAt: date}); existing.add(key(it));
    }
    nextRegistry.updated = date;
    return {active: recount(active), graveyard: recount(graveyard), registry: nextRegistry, affected, moved};
  }
  function replaceCatalog(page, catalog) {
    const re = /(<script id="catalog" type="application\/json">)[\s\S]*?(<\/script>)/;
    if (!re.test(page)) throw new Error('The gallery format has changed. Reload before continuing.');
    return page.replace(re, (_, a, b) => a + inline(catalog) + b)
      .replace(/(today · )\d+( pieces)/, '$1' + catalog.counts.items + '$2');
  }
  function replaceViewer(page, group) {
    const re = /const items=[\s\S]*?;let at=/;
    if (!re.test(page)) throw new Error('The study viewer format has changed.');
    return page.replace(re, () => 'const items=' + inline(group.rows.flatMap(r => r.items)) + ';let at=');
  }
  function archivePage(page, catalog) {
    let result = replaceCatalog(page, catalog)
      .replace(/<title>.*?<\/title>/, '<title>COOKT / Graveyard</title>')
      .replace('<head>', '<head><meta name="robots" content="noindex,nofollow"><base href="../">')
      .replace(/<h1>[\s\S]*?<\/h1>/, '<h1>Graveyard</h1>')
      .replace(/<dl class="facts">[\s\S]*?<\/dl>/, '<p class="m">Removed studies · ' + catalog.counts.items + ' pieces</p>')
      .replace('<body>', '<body data-graveyard="true">');
    result = result.replace("scope=byId[location.hash.slice(1)]?.section||'now'", "scope='all'")
      .replace("scope=g.section;kind='all'", "scope='all';kind='all'");
    // The archive has no back-link from the main gallery. Assets remain at stable URLs.
    result = result.replace(/<footer class="m">[\s\S]*?<\/footer>/, '<footer class="m"><a href="../studies/">COOKT studies ↗</a></footer>');
    return result;
  }
  function bundle(catalog, keys, preferences, origin) {
    const selected = new Set(keys), seen = new Set(), base = origin.replace(/\/$/, '') + '/';
    const entries = items(catalog).filter(({it}) => selected.has(key(it))).filter(({it}) => {
      if (seen.has(key(it))) return false; seen.add(key(it)); return true;
    }).map(({g, r, it}) => ({id: key(it), title: it.title, study: g.title, groupId: g.id,
      section: g.section, row: r.label, status: catalog.statusVocabulary[it.status].label,
      starred: !!preferences.stars[key(it)], notes: preferences.notes[key(it)] || '',
      imageUrl: new URL(it.src, base).href, sha256: it.sha256, file: 'images/' + it.src.split('/').pop()}));
    const data = {schema: 'cookt.feedback-bundle/1', created: new Date().toISOString(),
      gallery: base, reviewNotes: preferences.reviewNotes || '', items: entries};
    const markdown = ['# COOKT review bundle', '', data.reviewNotes, '',
      ...entries.flatMap((it, n) => ['## ' + (n + 1) + '. ' + it.title + (it.starred ? ' ★' : ''), '',
        'Study: ' + it.study + ' / ' + it.row, 'Status: ' + it.status, 'ID: ' + it.id, '',
        it.notes || '(No item notes)', '', '![' + it.title.replace(/[\[\]]/g, '') + '](' + it.imageUrl + ')', ''])].join('\n');
    return {data, markdown};
  }
  const api = {clone, items, key, inline, recount, move, replaceCatalog, replaceViewer, archivePage, bundle};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CooktSuiteCore = api;
})(typeof window === 'object' ? window : globalThis);
