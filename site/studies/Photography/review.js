(()=>{
  'use strict';
  const source=window.PHOTO_LIBRARY;
  const KEY='cookt-photo-review-'+source.version;
  const EDITABLE=['title','style','plate','flavor','use','group','tags','hidden','removed'];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const $=s=>document.querySelector(s);
  const entries=source.images.map(x=>({...x,tags:[...(x.tags||[])]}));
  const selected=new Set();
  let toastTimer;
  function notice(message){const el=$('#toast');el.textContent=message;el.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.style.display='none',4200);}
  function applyEdits(file){
    if(!file||file.registerHash!==source.registerHash||!Array.isArray(file.images))return false;
    const updates=new Map(file.images.map(x=>[x.id,x]));
    let n=0;
    for(const row of entries){const edit=updates.get(row.id);if(!edit||edit.sha256&&edit.sha256!==row.sha256)continue;
      for(const k of EDITABLE){if(k in edit){row[k]=k==='tags'?(Array.isArray(edit[k])?edit[k].map(String):[]):k==='hidden'||k==='removed'?Boolean(edit[k]):String(edit[k]);}}
      n++;
    }
    return n;
  }
  try{applyEdits(JSON.parse(localStorage.getItem(KEY)||'null'));}catch{}
  function snapshot(){return {schemaVersion:1,collectionVersion:source.version,registerHash:source.registerHash,updated:new Date().toISOString(),images:entries.map(x=>({id:x.id,sha256:x.sha256,...Object.fromEntries(EDITABLE.map(k=>[k,x[k]]))}))};}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(snapshot()));}catch{notice('Browser storage is full. Export the review JSON now.');}}
  function optionList(key){return ['All',...new Set(entries.map(x=>x[key]).filter(Boolean))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b));}
  function filters(){for(const key of ['type','style','plate','flavor','use','orientation']){
    const el=$('#filter-'+key),current=el.value;
    el.innerHTML=optionList(key).map(x=>`<option value="${esc(x==='All'?'':x)}">${esc(x)}</option>`).join('');
    el.value=current;
  }}
  function match(row){
    if(row.removed&&!$('#show-removed').checked)return false;
    if(row.hidden&&!$('#show-hidden').checked)return false;
    for(const key of ['type','style','plate','flavor','use','orientation'])if($('#filter-'+key).value&&row[key]!==$('#filter-'+key).value)return false;
    const q=$('#search').value.trim().toLowerCase();
    return !q||[row.title,row.source,row.type,row.style,row.plate,row.flavor,row.use,row.group,...row.tags].join(' ').toLowerCase().includes(q);
  }
  function card(row){
    return `<article class="card ${row.hidden?'is-hidden':''} ${row.removed?'is-removed':''}" data-id="${esc(row.id)}">
      <div class="image-wrap"><label class="select"><input type="checkbox" data-select="${esc(row.id)}" ${selected.has(row.id)?'checked':''}> Select</label><button class="image-open" type="button" data-open="${esc(row.id)}" aria-label="Enlarge ${esc(row.title)}"><img src="${esc(row.thumb)}" alt="${esc(row.title)}" loading="lazy"></button><span class="status">${esc(row.status)}</span></div>
      <div class="card-body"><h3>${esc(row.title)}</h3><div class="meta">${esc(row.type)} · ${esc(row.orientation)}<br>${esc(row.source.split('/').slice(-3).join('/'))}</div>
      <div class="field-grid">${['group','style','plate','flavor','use'].map(k=>`<label>${k}<input data-field="${k}" value="${esc(row[k])}" aria-label="${k} for ${esc(row.title)}"></label>`).join('')}</div>
      <label class="tag-field">Tags, comma separated<input data-field="tags" value="${esc(row.tags.join(', '))}" aria-label="Tags for ${esc(row.title)}"></label>
      <div class="card-actions"><button type="button" data-hide="${esc(row.id)}">${row.hidden?'Unhide':'Hide'}</button><button type="button" data-remove="${esc(row.id)}">${row.removed?'Restore':'Remove'}</button><a href="${esc(row.image)}" download="${esc(row.image.split('/').pop())}">Image ↓</a></div></div></article>`;
  }
  function render(){
    const visible=entries.filter(match);
    const groups=new Map();
    for(const row of visible){if(!groups.has(row.group))groups.set(row.group,[]);groups.get(row.group).push(row);}
    $('#gallery').innerHTML=groups.size?[...groups].sort(([a],[b])=>a.localeCompare(b)).map(([group,rows])=>`<section class="group"><div class="group-head"><h2>${esc(group)}</h2><span>${rows.length} IMAGES</span></div><div class="grid">${rows.sort((a,b)=>[a.flavor,a.style,a.title].join('|').localeCompare([b.flavor,b.style,b.title].join('|'))).map(card).join('')}</div></section>`).join(''):'<p class="empty">No images match these filters.</p>';
    $('#visible-count').textContent=`${visible.length} shown · ${entries.filter(x=>x.hidden).length} hidden · ${entries.filter(x=>x.removed).length} removed`;
    $('#selected-count').textContent=selected.size;
  }
  function renderGaps(){
    $('#missing-list').innerHTML=`<div class="gap-grid">${source.missingShots.map(x=>`<article class="gap"><small>${esc(x.group)} / ${esc(x.priority)}</small><h3>${esc(x.title)}</h3><p>${esc(x.detail)}</p></article>`).join('')}</div>`;
  }
  function download(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  const crcTable=Array.from({length:256},(_,i)=>{let c=i;for(let n=0;n<8;n++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
  function crc32(bytes){let c=0xffffffff;for(const x of bytes)c=crcTable[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
  function le16(n){return new Uint8Array([n&255,(n>>>8)&255]);}
  function le32(n){return new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);}
  function pack(parts){let len=0;for(const p of parts)len+=p.length;const out=new Uint8Array(len);let at=0;for(const p of parts){out.set(p,at);at+=p.length;}return out;}
  function zip(files){const local=[],central=[];let offset=0;const encode=new TextEncoder();
    for(const {name,bytes} of files){const filename=encode.encode(name),crc=crc32(bytes);
      const lh=pack([le32(0x04034b50),le16(20),le16(0),le16(0),le16(0),le16(0),le32(crc),le32(bytes.length),le32(bytes.length),le16(filename.length),le16(0),filename,bytes]);
      const cd=pack([le32(0x02014b50),le16(20),le16(20),le16(0),le16(0),le16(0),le16(0),le32(crc),le32(bytes.length),le32(bytes.length),le16(filename.length),le16(0),le16(0),le16(0),le16(0),le32(0),le32(offset),filename]);
      local.push(lh);central.push(cd);offset+=lh.length;
    }
    const directory=pack(central),end=pack([le32(0x06054b50),le16(0),le16(0),le16(files.length),le16(files.length),le32(directory.length),le32(offset),le16(0)]);
    return new Blob([...local,directory,end],{type:'application/zip'});
  }
  async function downloadSelected(){
    const rows=entries.filter(x=>selected.has(x.id)&&!x.removed);
    if(!rows.length){notice('Select images first.');return;}
    const button=$('#download-selected');button.disabled=true;button.textContent=`Preparing ${rows.length} images…`;
    try{const files=[];for(const row of rows){const res=await fetch(row.image);if(!res.ok)throw new Error(row.image);files.push({name:row.id+'-'+row.source.split('/').pop(),bytes:new Uint8Array(await res.arrayBuffer())});}
      files.push({name:'selection.json',bytes:new TextEncoder().encode(JSON.stringify({images:rows.map(x=>({id:x.id,source:x.source,sha256:x.sha256}))},null,2))});
      download(`COOKT-photo-selection-${rows.length}.zip`,zip(files));notice(`${rows.length} images ready.`);
    }catch{notice('Open this page through the local server to make a ZIP; individual Image links still work.');}
    finally{button.disabled=false;button.innerHTML='Download selected <span id="selected-count">'+selected.size+'</span>';}
  }
  $('#count-total').textContent=entries.length;
  $('#drive-folder').href=source.driveFolderUrl||'#';
  $('#drive-folder').onclick=e=>{if(!source.driveFolderUrl){e.preventDefault();notice('Drive folder is being connected.');}};
  filters();renderGaps();render();
  for(const selector of ['#search','#filter-type','#filter-style','#filter-plate','#filter-flavor','#filter-use','#filter-orientation','#show-hidden','#show-removed'])$(selector).addEventListener(selector==='#search'?'input':'change',render);
  $('#clear-filters').onclick=()=>{for(const selector of ['#search','#filter-type','#filter-style','#filter-plate','#filter-flavor','#filter-use','#filter-orientation'])$(selector).value='';$('#show-hidden').checked=false;$('#show-removed').checked=false;render();};
  $('#gallery').addEventListener('change',e=>{const row=entries.find(x=>x.id===e.target.closest('[data-id]')?.dataset.id);if(!row)return;
    if(e.target.matches('[data-select]')){e.target.checked?selected.add(row.id):selected.delete(row.id);$('#selected-count').textContent=selected.size;return;}
    const field=e.target.dataset.field;if(!field)return;row[field]=field==='tags'?e.target.value.split(',').map(x=>x.trim()).filter(Boolean):e.target.value.trim();save();filters();render();});
  $('#gallery').addEventListener('click',e=>{const id=e.target.closest('[data-open],[data-hide],[data-remove]')?.dataset.open||e.target.closest('[data-hide]')?.dataset.hide||e.target.closest('[data-remove]')?.dataset.remove;if(!id)return;const row=entries.find(x=>x.id===id);if(!row)return;
    if(e.target.closest('[data-open]')){const box=$('#lightbox');box.querySelector('img').src=row.image;box.querySelector('img').alt=row.title;$('#lightbox-title').textContent=row.title;$('#lightbox-download').href=row.image;$('#lightbox-download').download=row.source.split('/').pop();box.showModal();}
    if(e.target.closest('[data-hide]')){row.hidden=!row.hidden;save();render();}
    if(e.target.closest('[data-remove]')){row.removed=!row.removed;save();render();}
  });
  $('#close-lightbox').onclick=()=>$('#lightbox').close();$('#lightbox').addEventListener('click',e=>{if(e.target===$('#lightbox'))$('#lightbox').close();});
  $('#download-selected').onclick=downloadSelected;
  $('#export-json').onclick=()=>{download('COOKT-Photography-Review-v001.json',new Blob([JSON.stringify(snapshot(),null,2)],{type:'application/json'}));notice('Review JSON exported.');};
  $('#import-json').onchange=async e=>{const file=e.target.files?.[0];if(!file)return;try{const n=applyEdits(JSON.parse(await file.text()));if(n===false)throw new Error();save();filters();render();notice(`Imported edits for ${n} images.`);}catch{notice('That file is not a compatible review JSON.');}e.target.value='';};
})();
