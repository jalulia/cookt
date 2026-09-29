/* Compact plate viewer: choose a garnish, sprinkle, change dishes. No game progression. */
(() => {
  'use strict';
  const trigger=document.getElementById('garnish-open'),panel=document.getElementById('garnish-game');
  const config=window.COOKT.garnishGame,art=window.CooktGarnishArt;
  if(!trigger||!panel||!config||!art)return;
  const dishes=config.products.map(id=>window.COOKT.products.find(p=>p.id===id)).filter(Boolean);
  const roster=config.roster,plates=dishes.map(()=>[]),images=new Map(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const WIDTH=192,HEIGHT=144;
  let ready=false,dish=0,selected=0,frame=0,particles=[],loaded=false,loadTicket=0,startPoint=null;
  let q,qa,canvas,ctx,base;
  function image(url){
    if(!images.has(url))images.set(url,new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>{images.delete(url);reject(new Error('Unable to load artwork'));};img.src=url;}));
    return images.get(url);
  }
  function init(){
    if(ready)return;ready=true;
    panel.innerHTML=`<div class="gg-toy">
      <div class="gg-head"><h2 id="garnish-title" tabindex="-1"><span class="gg-sr">${esc(config.title)}</span><canvas class="gg-title" width="132" height="44" aria-hidden="true"></canvas></h2>
        <div class="gg-roster" role="group" aria-label="Choose a garnish">${roster.map((g,i)=>`<button type="button" class="gg-garnish" data-garnish="${i}" aria-label="${esc(g.name)}" aria-pressed="${i===0}"><canvas width="40" height="40" aria-hidden="true"></canvas><span>${esc(g.label||g.name)}</span></button>`).join('')}</div>
        <button type="button" class="gg-close" aria-label="Close garnish viewer">×</button>
      </div>
      <div class="gg-view" role="group" aria-label="Dish carousel">
        <button type="button" class="gg-arrow gg-prev" aria-label="Previous plate">←</button>
        <figure class="gg-dish"><div class="gg-stage"><canvas class="gg-plate" width="192" height="144" tabindex="0" role="button" aria-label="Sprinkle on the plate"></canvas><div class="gg-loading" role="status">Setting the table…</div></div>
          <figcaption class="gg-caption"><span class="gg-name"></span><span class="gg-number"></span></figcaption>
        </figure>
        <button type="button" class="gg-arrow gg-next" aria-label="Next plate">→</button>
      </div>
      <div class="gg-actions"><button type="button" class="gg-sprinkle" disabled>Sprinkle cilantro ↓</button><button type="button" class="gg-reset" disabled>Clear plate ↺</button></div>
      <p class="gg-hint">Pick a garnish. Tap the food.</p><p class="gg-sr gg-status" role="status" aria-live="polite" aria-atomic="true"></p>
    </div>`;
    q=s=>panel.querySelector(s);qa=s=>[...panel.querySelectorAll(s)];
    canvas=q('.gg-plate');ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
    base=document.createElement('canvas');base.width=WIDTH;base.height=HEIGHT;base.getContext('2d').imageSmoothingEnabled=false;
    art.title(q('.gg-title'));
    image(config.iconAtlas).then(atlas=>{
      const w=atlas.width/3,h=atlas.height/2;
      qa('.gg-garnish canvas').forEach((c,i)=>{const paint=c.getContext('2d');paint.imageSmoothingEnabled=false;paint.drawImage(atlas,(i%3)*w,Math.floor(i/3)*h,w,h,0,0,40,40);});
    }).catch(()=>{/* Names still provide a complete selection control if the atlas cannot load. */});
    qa('[data-garnish]').forEach((button,i)=>{
      button.addEventListener('click',()=>choose(i));
      button.addEventListener('keydown',event=>{
        if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();const next=(i+(event.key==='ArrowRight'?1:-1)+roster.length)%roster.length;choose(next);qa('[data-garnish]')[next].focus();}
      });
    });
    q('.gg-prev').addEventListener('click',()=>changeDish(dish-1));q('.gg-next').addEventListener('click',()=>changeDish(dish+1));
    q('.gg-view').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();changeDish(dish+(event.key==='ArrowRight'?1:-1));}});
    q('.gg-sprinkle').addEventListener('click',()=>sprinkle());
    q('.gg-reset').addEventListener('click',()=>{stop();plates[dish]=[];draw();q('.gg-reset').disabled=true;announce('Plate cleared.');});
    q('.gg-close').addEventListener('click',()=>setOpen(false));
    panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();setOpen(false);}});
    canvas.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();sprinkle();}});
    canvas.addEventListener('pointerdown',event=>{if(event.isPrimary&&event.button===0)startPoint={x:event.clientX,y:event.clientY,id:event.pointerId};});
    canvas.addEventListener('pointerup',event=>{
      if(!startPoint||startPoint.id!==event.pointerId)return;
      const dx=event.clientX-startPoint.x,dy=event.clientY-startPoint.y;startPoint=null;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5){changeDish(dish+(dx<0?1:-1));return;}
      if(Math.hypot(dx,dy)>10)return;
      const r=canvas.getBoundingClientRect(),point={x:(event.clientX-r.left)/r.width*WIDTH,y:(event.clientY-r.top)/r.height*HEIGHT};
      if(onFood(point.x,point.y))sprinkle(point);
    });
    for(const event of ['pointercancel','pointerleave'])canvas.addEventListener(event,()=>{startPoint=null;});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
    reduced.addEventListener('change',stop);
    choose(0,false);changeDish(0,false);
  }
  function announce(text){q('.gg-status').textContent=text;}
  function choose(index,notify=true){
    selected=index;qa('[data-garnish]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
    q('.gg-sprinkle').textContent='Sprinkle '+roster[selected].name.toLowerCase()+' ↓';
    canvas.setAttribute('aria-label','Sprinkle '+roster[selected].name+' on '+dishes[dish].name);
    if(notify)announce(roster[selected].name+' selected.');
  }
  async function changeDish(index,notify=true){
    stop();dish=(index+dishes.length)%dishes.length;loaded=false;
    const ticket=++loadTicket,product=dishes[dish];
    q('.gg-name').textContent=product.name;q('.gg-number').textContent=String(dish+1).padStart(2,'0')+' / '+String(dishes.length).padStart(2,'0');
    q('.gg-sprinkle').disabled=true;q('.gg-reset').disabled=!plates[dish].length;
    q('.gg-loading').hidden=false;q('.gg-loading').textContent='Setting the table…';
    choose(selected,false);canvas.setAttribute('aria-busy','true');
    try{
      const img=await image(config.plates[product.id].image);if(ticket!==loadTicket)return;
      const c=base.getContext('2d');c.clearRect(0,0,WIDTH,HEIGHT);c.imageSmoothingEnabled=false;c.drawImage(img,0,0,WIDTH,HEIGHT);
      loaded=true;q('.gg-loading').hidden=true;q('.gg-sprinkle').disabled=false;canvas.removeAttribute('aria-busy');draw();
      // Warm only the next plate; an idle, collapsed viewer starts no animation loop.
      image(config.plates[dishes[(dish+1)%dishes.length].id].image).catch(()=>{});
      if(notify)announce(product.name);
    }catch{
      if(ticket!==loadTicket)return;
      q('.gg-loading').innerHTML='The plate couldn’t load.<button type="button">Try again</button>';
      q('.gg-loading button').onclick=()=>changeDish(dish);canvas.removeAttribute('aria-busy');
    }
  }
  function food(){return config.plates[dishes[dish].id].food;}
  function onFood(x,y,padding=0){const [cx,cy,rx,ry]=food();return ((x/WIDTH-cx)/(rx-padding/WIDTH))**2+((y/HEIGHT-cy)/(ry-padding/HEIGHT))**2<=1;}
  function sprinkle(point){
    if(!loaded||panel.hidden||document.hidden)return;
    const now=performance.now(),[cx,cy,rx,ry]=food();
    for(let i=0;i<6;i++){
      let x,y;for(let tries=0;tries<40;tries++){
        const angle=Math.random()*Math.PI*2,r=Math.sqrt(Math.random());
        x=point?point.x+Math.cos(angle)*13*r:cx*WIDTH+Math.cos(angle)*(rx*WIDTH-4)*r;
        y=point?point.y+Math.sin(angle)*11*r:cy*HEIGHT+Math.sin(angle)*(ry*HEIGHT-4)*r;
        if(onFood(x,y,4))break;
      }
      if(!onFood(x,y,4))continue;
      const p={x:Math.round(x),y:Math.round(y),id:roster[selected].id,flip:Math.random()>.5,start:now+i*23,duration:330};
      p.landAt=reduced.matches?0:p.start+p.duration;plates[dish].push(p);
      if(!reduced.matches)particles.push(p);
    }
    if(plates[dish].length>180)plates[dish].splice(0,plates[dish].length-180);
    particles=particles.slice(-72);q('.gg-reset').disabled=false;announce(roster[selected].name+' sprinkled on '+dishes[dish].name+'.');
    if(reduced.matches)draw();else animate();
  }
  function draw(now=performance.now()){
    if(!ctx)return;ctx.clearRect(0,0,WIDTH,HEIGHT);ctx.drawImage(base,0,0);
    if(!loaded)return;
    plates[dish].forEach(p=>{if(p.landAt<=now)art.topping(ctx,p);});
    particles.forEach(p=>{if(now<p.start)return;const t=Math.min(1,(now-p.start)/p.duration);art.topping(ctx,{...p,x:p.x+Math.sin(t*Math.PI)*(p.flip?3:-3),y:p.y-(1-t*t)*30});});
  }
  function animate(){if(!frame&&!panel.hidden&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick);}
  function tick(now){frame=0;if(panel.hidden||document.hidden)return;particles=particles.filter(p=>p.landAt>now);draw(now);if(particles.length)animate();}
  function stop(){cancelAnimationFrame(frame);frame=0;particles=[];startPoint=null;plates.forEach(p=>p.forEach(piece=>piece.landAt=0));if(ready)draw();}
  function setOpen(open){
    trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label','Choose your garnish — '+(open?'close':'open')+' plate viewer');panel.hidden=!open;
    if(open){init();draw();q('#garnish-title').focus({preventScroll:true});panel.scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});}
    else{stop();trigger.focus({preventScroll:true});trigger.scrollIntoView({block:'nearest',behavior:'instant'});}
  }
  trigger.addEventListener('click',()=>setOpen(panel.hidden));
})();
