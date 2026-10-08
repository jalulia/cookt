/* Plate photographs: public view fields come from the canonical record. */
'use strict';
function renderPlateLibrary(){
 const L=window.COOKT.photography.plateLibrary;if(!L?.items?.length)return '';
 const e=photoEscape, products=window.COOKT.products.filter(p=>p.channel==='launch');
 return `<section class="plate-library" id="photo-plate-library" aria-labelledby="plate-library-title">
 <header class="pl-heading"><div><span class="pw-kicker">Photograph library</span><h2 id="plate-library-title">Plates & ceramics</h2></div><p>Compare the launch dishes and ceramic alternatives. Open a photograph to inspect the detail.</p></header>
 <div class="pl-controls"><div class="pl-tabs" role="group" aria-label="Photograph selection"><button type="button" data-pl-set="base" aria-pressed="true">Base set</button><button type="button" data-pl-set="alternate" aria-pressed="false">Ceramic alternatives</button><button type="button" data-pl-set="all" aria-pressed="false">All photographs</button></div><label>View<select data-pl-view><option value="angled">Original packaging angle</option><option value="overhead">Overhead studies</option><option value="all">All views</option></select></label><label>Dish<select data-pl-dish><option value="all">All four dishes</option>${products.map(p=>`<option value="${e(p.id)}">${e(p.name)}</option>`).join('')}</select></label></div>
 <div class="pl-count" aria-live="polite"></div><div class="pl-grid"></div>
 <footer class="pl-footer"><span>${e(L.status||'In review')} · ${e(L.angle||'Matched packaging angle')}</span>${L.download?`<a href="${e(L.download)}" download>Download plate collection ↓</a>`:''}</footer>
 <dialog class="pl-dialog" aria-labelledby="pl-image-title"><div class="pl-dialog-toolbar"><span data-pl-position></span><div class="pl-view-controls"><button type="button" data-pl-surface="paper" aria-pressed="true">Paper</button><button type="button" data-pl-surface="forest" aria-pressed="false">Forest</button></div><button type="button" data-pl-close aria-label="Close photograph">Close ×</button></div><div class="pl-view-stage"><img alt=""></div><div class="pl-dialog-caption"><div><h3 id="pl-image-title"></h3><p data-pl-rationale></p><span data-pl-resolution></span></div><div class="pl-downloads"><a data-pl-download download>4096px PNG ↓</a><a data-pl-native download>Native PNG ↓</a><a data-pl-source target="_blank" rel="noopener">Source on Drive ↗</a><a data-pl-original target="_blank" rel="noopener">Open full resolution ↗</a></div></div><div class="pl-view-nav"><button type="button" data-pl-prev aria-label="Previous photograph">← Previous</button><button type="button" data-pl-next aria-label="Next photograph">Next →</button></div></dialog>
 </section>`;
}
function bindPlateLibrary(){
 const root=document.querySelector('.plate-library');if(!root||root.dataset.bound)return;root.dataset.bound='true';
 const L=window.COOKT.photography.plateLibrary,e=photoEscape,grid=root.querySelector('.pl-grid'),dialog=root.querySelector('dialog');
 let view='angled',set='base',dish='all',shown=[],selected=0,lastTrigger=null;
 const name=x=>window.COOKT.products.find(p=>p.id===x.product)?.name||x.product;
 function draw(){
  shown=L.items.filter(x=>(set==='all'||x.role===set)&&(dish==='all'||x.product===dish)&&(view==='all'||(x.view||'angled')===view));
  root.querySelector('.pl-count').textContent=`${shown.length} photograph${shown.length===1?'':'s'}`;
  grid.innerHTML=shown.map((x,i)=>`<article class="pl-card"><button type="button" class="pl-image" data-pl-open="${i}" aria-label="Inspect ${e(name(x)+' / '+x.ceramic+' / '+(x.view==='overhead'?'Overhead study':'Packaging angle'))}"><img src="${e(x.image)}" alt="${e(name(x)+' in '+x.ceramic)}" width="${x.width||1536}" height="${x.height||1024}" loading="lazy"><span aria-hidden="true">↗</span></button><div class="pl-card-title"><h3>${e(name(x))}</h3><span>${String(i+1).padStart(2,'0')}</span></div><p>${e(x.ceramic)} · ${x.view==='overhead'?'Overhead study':'Packaging angle'}</p><small>${x.kind?e(x.kind)+' · ':''}${e(x.role==='base'?'Base set':'Ceramic alternative')} · ${e(x.status||'In review')}</small></article>`).join('');
  grid.querySelectorAll('[data-pl-open]').forEach(b=>b.onclick=()=>{lastTrigger=b;selected=Number(b.dataset.plOpen);show();dialog.showModal();});
 }
 function show(){
  const x=shown[selected],img=dialog.querySelector('.pl-view-stage img'),download=x.download||x.image;
  img.src=x.download||x.image;img.alt=name(x)+' / '+x.ceramic+' / '+(x.view==='overhead'?'Overhead study':'Packaging angle');
  dialog.querySelector('#pl-image-title').textContent=name(x)+' / '+x.ceramic+' / '+(x.view==='overhead'?'Overhead study':'Packaging angle');
  dialog.querySelector('[data-pl-rationale]').textContent=x.rationale||'';
  dialog.querySelector('[data-pl-resolution]').textContent=`${x.width} × ${x.height} px${x.resolutionNote?' · '+x.resolutionNote:''}`;
  dialog.querySelector('[data-pl-position]').textContent=`${selected+1} / ${shown.length}`;
  dialog.querySelector('[data-pl-download]').href=download;
  dialog.querySelector('[data-pl-native]').href=x.nativeDownload||download;
  const source=dialog.querySelector('[data-pl-source]');source.hidden=!x.sourceLink;if(x.sourceLink)source.href=x.sourceLink;
  dialog.querySelector('[data-pl-original]').href=download;
 }
 root.querySelectorAll('[data-pl-set]').forEach(b=>b.onclick=()=>{set=b.dataset.plSet;root.querySelectorAll('[data-pl-set]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw();});
 root.querySelector('[data-pl-view]').onchange=e=>{view=e.target.value;draw();};
 root.querySelector('[data-pl-dish]').onchange=e=>{dish=e.target.value;draw();};
 dialog.querySelector('[data-pl-close]').onclick=()=>dialog.close();
 dialog.addEventListener('close',()=>lastTrigger?.focus({preventScroll:true}));
 const step=n=>{selected=(selected+n+shown.length)%shown.length;show();};
 dialog.querySelector('[data-pl-prev]').onclick=()=>step(-1);dialog.querySelector('[data-pl-next]').onclick=()=>step(1);
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}});
 dialog.querySelectorAll('[data-pl-surface]').forEach(b=>b.onclick=()=>{dialog.dataset.surface=b.dataset.plSurface;dialog.querySelectorAll('[data-pl-surface]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 draw();
}
