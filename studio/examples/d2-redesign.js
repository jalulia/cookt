/* D2 menu website + linked desktop/mobile presentation.
   Sources remain data-driven. Changing a bowl file here does not alter artwork or brand canon. */
(() => {
'use strict';
const LOGO = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"952.482\" height=\"228.735\" viewBox=\"0 0 952.482 228.735\"><g aria-label=\"COOKT\" data-logo-source=\"cookt_d1-logo.pdf\" transform=\"translate(952.482 0) rotate(90) scale(1.0)\"><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\" version=\"1.1\" width=\"228.735\" height=\"952.482\" viewBox=\"0 0 228.735 952.482\">\n<defs>\n<clipPath id=\"clip_1\">\n<path transform=\"matrix(1,0,0,-1,0,952.482)\" d=\"M0 952.482H228.735V0H0Z\"/>\n</clipPath>\n</defs>\n<g inkscape:groupmode=\"layer\" inkscape:label=\"Layer 1\">\n<g clip-path=\"url(#clip_1)\">\n<path transform=\"matrix(1,0,0,-1,190.938,664.2591)\" d=\"M0 0C0-42.282-34.283-76.565-76.576-76.565-118.858-76.565-153.141-42.282-153.141 0-153.141 42.293-118.858 76.576-76.576 76.576-34.283 76.576 0 42.293 0 0M-190.938 .043C-190.938-63.119-139.727-114.319-76.565-114.319-13.403-114.319 37.797-63.119 37.797 .043 37.797 63.205-13.403 114.415-76.565 114.415-139.727 114.415-190.938 63.205-190.938 .043\" fill=\"currentColor\"/>\n<path transform=\"matrix(1,0,0,-1,190.938,419.5042)\" d=\"M0 0C0-42.282-34.283-76.565-76.576-76.565-118.858-76.565-153.141-42.282-153.141 0-153.141 42.293-118.858 76.576-76.576 76.576-34.283 76.576 0 42.293 0 0M-190.938 .043C-190.938-63.119-139.727-114.319-76.565-114.319-13.403-114.319 37.797-63.119 37.797 .043 37.797 63.205-13.403 114.415-76.565 114.415-139.727 114.415-190.938 63.205-190.938 .043\" fill=\"currentColor\"/>\n<path transform=\"matrix(1,0,0,-1,197.1783,770.9862)\" d=\"M0 0C3.338 2.729 8.324 2.103 10.805-1.423 23.883-20.013 31.557-42.678 31.557-67.134 31.557-95.147 21.496-120.801 4.771-140.687-16.205-165.636-47.657-181.496-82.806-181.496-118.349-181.496-150.111-165.273-171.087-139.844-187.385-120.075-197.178-94.752-197.178-67.134-197.178-43.097-189.759-20.79-177.088-2.38-174.628 1.193-169.605 1.844-166.246-.902L-148.458-15.447C-145.515-17.853-144.825-22.099-146.909-25.279-154.796-37.315-159.382-51.704-159.382-67.176-159.382-85.706-152.803-102.698-141.845-115.942-127.801-132.923-106.569-143.742-82.816-143.742-59.448-143.742-38.526-133.275-24.482-116.775-13.107-103.414-6.24-86.101-6.24-67.176-6.24-51.351-11.047-36.643-19.273-24.44-21.417-21.259-20.743-16.96-17.772-14.532Z\" fill=\"currentColor\"/>\n<path transform=\"matrix(1,0,0,-1,10.1674,-.0004272461)\" d=\"M0 0C-4.129 0-7.476-3.347-7.476-7.476V-131.536C-7.476-135.665-4.129-139.012 0-139.012H20.741C24.87-139.012 28.217-135.665 28.217-131.536V-93.76C28.217-90.811 30.608-88.42 33.557-88.42H209.297C213.426-88.42 216.773-85.073 216.773-80.944V-58.068C216.773-53.939 213.426-50.592 209.297-50.592H33.557C30.608-50.592 28.217-48.201 28.217-45.252V-7.476C28.217-3.347 24.87 0 20.741 0Z\" fill=\"currentColor\"/>\n<path transform=\"matrix(1,0,0,-1,89.0284,217.6369)\" d=\"M0 0-74.41 55.144C-79.343 58.8-86.337 55.278-86.337 49.138V21.898C-86.337 19.53-85.215 17.302-83.312 15.892L-24.905-27.395C-22.424-29.234-23.725-33.174-26.813-33.174H-78.861C-82.99-33.174-86.337-36.521-86.337-40.65V-63.526C-86.337-67.655-82.99-71.002-78.861-71.002H130.436C134.565-71.002 137.912-67.655 137.912-63.526V-40.65C137.912-36.521 134.565-33.174 130.436-33.174H33.984C30.767-33.174 29.557-28.962 32.283-27.254L134.405 36.72C136.587 38.087 137.912 40.481 137.912 43.055V68.88C137.912 74.756 131.447 78.335 126.468 75.216L6.014-.235C4.152-1.402 1.765-1.308 0 0\" fill=\"currentColor\"/>\n</g>\n</g>\n</svg>\n</g></svg>";
let logoCount=0;
const logo=()=>LOGO.replace(/clip_1/g,'d2-logo-'+(++logoCount));
const arrow='<svg class="arrow" viewBox="0 0 32 24" aria-hidden="true"><path d="M1 12h28M19 2l10 10-10 10"/></svg>';
const BASE_DISHES=window.COOKT_PRODUCTS.map(p=>({id:p.id,name:p.name,image:'../assets/'+p.id+'-food.png',color:p.color,description:p.summary}));
// Parent integration may supply asset overrides before this script, keyed by dish id.
const DISHES=BASE_DISHES.map(d=>({...d,...(window.COOKT_D2_ASSETS?.[d.id]||{})}));
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params=new URLSearchParams(location.search);
const view=params.get('view')||'mockup';
const app=document.querySelector('#app');
const hrefFor=(kind,extra={})=>{const url=new URL(location.href);url.search='';url.searchParams.set('view',kind);for(const [key,value] of Object.entries(extra))url.searchParams.set(key,value);url.hash='';return url.href};

if(view!=='site'){
 document.body.classList.add('mockup-view');
 app.innerHTML=`<main class="mockup-shell" aria-label="D2 website shown in desktop and mobile browsers"><div class="mockup-artboard">
 <header class="mockup-heading"><strong>D2 / The menu</strong><a href="${hrefFor('site')}" target="_blank" rel="noopener">Open website ${arrow}</a></header>
 <div class="desktop-browser"><div class="browser-bar" aria-hidden="true"><span class="browser-dots"><i></i><i></i><i></i></span><span class="browser-address">COOKT / website concept</span><span class="browser-tool"></span></div><div class="desktop-screen"><iframe id="desktop-preview" src="${hrefFor('site',{embed:'desktop'})}" title="Interactive COOKT desktop website"></iframe></div></div>
 <div class="phone-mockup"><div class="phone-top" aria-hidden="true"><span>9:41</span><span class="notch"></span><span class="phone-signals"><i class="signal"></i><i class="battery"></i></span></div><div class="phone-screen"><iframe id="mobile-preview" src="${hrefFor('site',{embed:'mobile'})}" title="Interactive COOKT mobile website"></iframe></div><div class="phone-home" aria-hidden="true"></div></div>
 <footer class="mockup-caption"><p>Desktop + mobile / interactive prototype</p></footer>
 </div></main>`;
 const shell=document.querySelector('.mockup-shell');
 const resize=()=>shell.style.setProperty('--mockup-scale',shell.clientWidth/1200);
 new ResizeObserver(resize).observe(shell);resize();
 const frames=[document.querySelector('#desktop-preview'),document.querySelector('#mobile-preview')];
 window.addEventListener('message',event=>{
  if(!frames.some(f=>f.contentWindow===event.source)||event.data?.source!=='cookt-d2'||event.data.type!=='dish'||!DISHES.some(d=>d.id===event.data.id))return;
  frames.filter(f=>f.contentWindow!==event.source).forEach(f=>f.contentWindow.postMessage({source:'cookt-d2',type:'select',id:event.data.id},'*'));
 });
 window.cooktD2={view:'mockup',dishes:DISHES};
 return;
}

let selected=DISHES.find(d=>d.id===params.get('dish'))||DISHES[0];
app.innerHTML=`<a class="skip-link" href="#meals">Skip to meals</a>
 <header class="site-header" id="top"><a class="logo" href="#top" aria-label="COOKT home">${logo()}</a><button class="mobile-nav-button" aria-expanded="false" aria-controls="site-navigation">Menu <i aria-hidden="true"></i></button><nav class="site-nav" id="site-navigation" aria-label="Main navigation"><a href="#meals">Meals</a><a href="#our-food">Our food</a><a class="nav-cta" href="#meals">View meals ${arrow}</a></nav></header>
 <main>
  <section class="menu-section" id="meals" aria-labelledby="menu-title"><div class="section-kicker"><span>The frozen range</span><span>Four dishes</span></div>
   <div class="menu-layout">
    <figure class="dish-stage" aria-labelledby="selected-image-caption"><span class="stage-index">01 / 04</span><img class="dish-image" src="${selected.image}" alt="${escape(selected.name)} in its ceramic bowl" width="1536" height="1024" fetchpriority="high"><figcaption class="stage-caption" id="selected-image-caption">Jamaican Rasta</figcaption></figure>
    <div class="menu-heading"><h1 id="menu-title">Menu</h1><span>04</span></div>
    <div class="menu-list-wrap"><ol class="menu-list" role="tablist" aria-label="Choose a frozen meal" aria-orientation="vertical">${DISHES.map((d,i)=>`<li role="presentation"><button class="meal-tab" role="tab" id="tab-${d.id}" data-dish="${d.id}" aria-selected="${d.id===selected.id}" aria-controls="selected-meal" tabindex="${d.id===selected.id?'0':'-1'}"><span class="meal-number">0${i+1}</span><span class="meal-name">${escape(d.name)}</span>${arrow}</button></li>`).join('')}</ol></div>
    <div class="menu-current" id="selected-meal" role="tabpanel" aria-labelledby="tab-${selected.id}"><p class="selected-description">${escape(selected.description)}</p><button class="view-dish" aria-label="View ${escape(selected.name)}"><span>View dish</span>${arrow}</button></div>
   </div>
   <div class="menu-baseline"><p class="brand-line">A fresh take on frozen</p><a href="#our-food">The COOKT way ${arrow}</a></div>
  </section>
  <figure class="story-photo"><img src="../assets/photo-shared.webp" alt="Hands reaching for meals across a shared table in daylight"></figure>
  <section class="cookt-way" id="our-food" aria-labelledby="way-heading"><div class="way-content"><span class="way-label">The COOKT way</span><h2 id="way-heading">Tastes like someone cooked it.<br>Because someone did.</h2><p>We make frozen food that tastes how the dish is supposed to taste. Real ingredients. The right cooking techniques. Every flavor and texture arrives at your table the way it left our kitchen.</p><a href="#meals">View meals ${arrow}</a></div></section>
 </main>
 <footer class="site-footer"><a class="logo" href="#top" aria-label="COOKT home">${logo()}</a><p>A fresh take on frozen</p><a href="#top">Back to top ${arrow}</a></footer>
 <dialog class="dish-dialog" aria-labelledby="detail-name"><div class="dialog-top"><span>The frozen range</span><button class="close-detail" aria-label="Close dish details">×</button></div><div class="dish-detail"><div class="detail-image-stage"><img class="detail-image" alt="" width="1536" height="1024"></div><div class="detail-copy"><span>COOKT / Frozen meals</span><h2 id="detail-name"></h2><p class="detail-description"></p><button class="return-menu">Back to menu ${arrow}</button></div></div></dialog>`;
const $=s=>document.querySelector(s);
const tabs=[...document.querySelectorAll('.meal-tab')];
const image=$('.dish-image');let animationTimer;
const shortNames={rasta:'Jamaican Rasta',blackened:'Creamy Blackened',orzo:'Lemon Chicken Orzo',chipotle:'Chipotle Chicken with Corn'};
const notifyParent=id=>{if(window.parent!==window)window.parent.postMessage({source:'cookt-d2',type:'dish',id},'*')};
function updateDish(id,{announce=true,animate=true}={}){
 const dish=DISHES.find(d=>d.id===id);if(!dish)return;
 selected=dish;document.documentElement.style.setProperty('--selected',dish.color);
 tabs.forEach(t=>{const on=t.dataset.dish===id;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});
 $('#selected-meal').setAttribute('aria-labelledby','tab-'+id);
 $('.selected-description').textContent=dish.description;
 $('.stage-index').textContent='0'+(DISHES.indexOf(dish)+1)+' / 04';
 $('.stage-caption').textContent=shortNames[dish.id];
 $('.view-dish').setAttribute('aria-label','View '+dish.name);
 const swap=()=>{image.src=dish.image;image.alt=dish.name+' in its ceramic bowl';if(image.complete)image.classList.remove('changing');else image.onload=()=>image.classList.remove('changing')};
 clearTimeout(animationTimer);
 if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&image.src!==new URL(dish.image,location.href).href){image.classList.add('changing');animationTimer=setTimeout(swap,145)}else{swap();image.classList.remove('changing')}
 if(announce)notifyParent(id);
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>updateDish(tab.dataset.dish));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();event.stopPropagation();tabs[next].focus();updateDish(tabs[next].dataset.dish)})});
const dialog=$('.dish-dialog');
function openDish(){
 $('#detail-name').textContent=selected.name;$('.detail-description').textContent=selected.description;$('.detail-image').src=selected.image;$('.detail-image').alt=selected.name+' in its ceramic bowl';dialog.showModal();
}
$('.view-dish').addEventListener('click',openDish);
$('.close-detail').addEventListener('click',()=>dialog.close());$('.return-menu').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
const mobileButton=$('.mobile-nav-button');
mobileButton.addEventListener('click',()=>{const open=mobileButton.getAttribute('aria-expanded')!=='true';mobileButton.setAttribute('aria-expanded',String(open));$('.site-nav').classList.toggle('is-open',open)});
$('.site-nav').addEventListener('click',event=>{if(event.target.closest('a')){mobileButton.setAttribute('aria-expanded','false');$('.site-nav').classList.remove('is-open')}});
window.addEventListener('message',event=>{if(event.source!==window.parent||event.data?.source!=='cookt-d2'||event.data.type!=='select')return;updateDish(event.data.id,{announce:false})});
updateDish(selected.id,{announce:false,animate:false});
DISHES.forEach(d=>{const preload=new Image();preload.src=d.image});
window.cooktD2={view:'site',dishes:DISHES,select:id=>updateDish(id),get selected(){return selected.id},openDish};
})();
