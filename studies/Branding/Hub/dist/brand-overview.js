'use strict';

// The overview composes existing identity assets. Product artwork is never rebuilt here.
let brandDish = 'rasta';

function renderBrandDish() {
  const B = D.hub.brandOverview;
  const p = launch.find(x => x.id === brandDish) || launch[0];
  const c = p.colorOptions.find(x => x.id === p.defaultColor);
  const detail = B.dishes.find(x => x.id === p.id);
  return `<div class="bo-dish-field" style="--dish-field:${E(c.field)};--dish-ink:${E(c.ink)}">
    <div class="bo-dish-top"><span>Color & ceramic</span><span>${E(detail.ceramic)}</span></div>
    <img src="${E(p.image)}" alt="${E(p.name)} in ${E(detail.ceramic.toLowerCase())}" width="1400" height="1000">
    <div class="bo-dish-bottom"><span>${E(c.field)} <i style="background:${E(c.ink)}"></i> ${E(c.ink)}</span><a href="#/packaging/${p.id}/color">View options <span aria-hidden="true">↗</span></a></div>
  </div>`;
}

function renderBrandOverview() {
  const B = D.hub.brandOverview;
  const hero = D.hub.index.hero;
  const scene = D.hub.index.packagingBeauty;
  const number = i => String(i + 1).padStart(2, '0');
  return `<div class="brand-overview">
    <section class="bo-cover" aria-label="COOKT brand identity">
      <div class="bo-cover-copy">
        <span class="bo-wordmark" role="img" aria-label="COOKT"></span>
        <h2>${E(D.tagline.toLowerCase().replace(/^a/, 'A')).replace(' on frozen', '<br>on frozen')}</h2>
        <a href="#/brand/logo">Logo & identity <span aria-hidden="true">↗</span></a>
      </div>
      <figure class="bo-cover-photo"><img src="${E(hero.image)}" alt="${E(hero.alt)}" width="960" height="1200" fetchpriority="high"></figure>
    </section>
    <div class="bo-spectrum" aria-hidden="true">${launch.map(p => `<span style="background:${E(p.color)};color:${E(p.ink)}">${E(B.dishes.find(x => x.id === p.id).shortName)}</span>`).join('')}</div>

    <section class="bo-platform" aria-labelledby="bo-platform-title">
      <div><span class="bo-label">The brand</span><h2 id="bo-platform-title">${E(D.platform.expression).replace(' American', '<br>American')}</h2></div>
      <div class="bo-platform-copy"><h3>${E(D.platform.audience)}</h3><p>${E(D.platform.promise)}</p></div>
    </section>

    <section class="bo-range" aria-labelledby="bo-range-title">
      <header class="bo-section-heading"><div><span class="bo-label">01 / The launch range</span><h2 id="bo-range-title">${E(B.rangeTitle)}</h2></div><p>${E(D.platform.meaning)}</p></header>
      <div class="bo-range-grid">
        <label class="bo-mobile-selector">Choose a dish<select data-brand-dish-select>${launch.map(p => `<option value="${p.id}" ${p.id === brandDish ? 'selected' : ''}>${E(p.name)}</option>`).join('')}</select></label>
        <div id="bo-dish-preview" aria-live="polite" aria-atomic="true">${renderBrandDish()}</div>
        <div class="bo-menu"><div class="bo-menu-head"><span>Four launch dishes</span><span>Select a dish ↓</span></div>
          <div class="bo-dish-list" role="group" aria-label="Choose a launch dish">${launch.map((p, i) => `<button type="button" data-brand-dish="${p.id}" aria-pressed="${p.id === brandDish}" aria-controls="bo-dish-preview"><span class="bo-menu-number">${number(i)}</span><span>${E(p.name)}</span><span class="bo-menu-arrow" aria-hidden="true">↗</span></button>`).join('')}</div>
          <a class="bo-menu-link" href="#/packaging">Explore the packaging <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>

    <section class="bo-identity" aria-labelledby="bo-identity-title">
      <header class="bo-section-heading"><div><span class="bo-label">02 / The identity</span><h2 id="bo-identity-title">${E(B.identityTitle)}</h2></div><a href="#/brand/guidelines">Brand guidelines <span aria-hidden="true">↗</span></a></header>
      <div class="bo-identity-grid">
        <a class="bo-resource bo-logo-resource" href="#/brand/logo"><div class="bo-resource-art bo-logo-art">${D.logoReview.versions.map(v => `<div><img src="${E(v.horizontal)}" alt="COOKT ${E(v.label)} wordmark" loading="lazy"><span>${E(v.label)}</span></div>`).join('')}</div><div class="bo-resource-caption"><h3>Logo</h3><span>Original & revisions</span><b aria-hidden="true">↗</b></div></a>
        <a class="bo-resource bo-color-resource" href="#/brand/colors"><div class="bo-resource-art bo-color-art">${[[D.brandColors.base,'Paper',D.brandColors.ink],[D.brandColors.green,'Deep green',D.brandColors.base],[D.brandColors.ink,'Ink',D.brandColors.base]].map(([color,label,ink]) => `<div style="background:${E(color)};color:${E(ink)}"><span>${E(label)}</span><span>${E(color)}</span></div>`).join('')}<div class="bo-mini-spectrum">${launch.map(p=>`<i style="background:${E(p.color)}"></i>`).join('')}</div></div><div class="bo-resource-caption"><h3>Color</h3><span>Brand & product palettes</span><b aria-hidden="true">↗</b></div></a>
        <a class="bo-resource bo-type-resource" href="#/brand/type"><div class="bo-resource-art bo-type-art"><img src="assets/international-specimen.svg" alt="NB International letterforms" loading="lazy"><span>NB International / Lexend</span></div><div class="bo-resource-caption"><h3>Typography</h3><span>Three combinations in review</span><b aria-hidden="true">↗</b></div></a>
      </div>
    </section>

    <section class="bo-world" aria-labelledby="bo-world-title">
      <figure><img src="${E(scene.image)}" alt="${E(scene.alt)}" loading="lazy" width="3219" height="2150"></figure>
      <div class="bo-world-copy"><span class="bo-label">03 / Photography & applications</span><h2 id="bo-world-title">${E(B.worldTitle)}</h2><div class="bo-world-links"><a href="#/brand/photography"><span>Photography direction</span><span aria-hidden="true">↗</span></a><a href="#/brand/photography/plate-library"><span>Plates & ceramics</span><span aria-hidden="true">↗</span></a><a href="#/applications"><span>Brand applications</span><span aria-hidden="true">↗</span></a></div><small>Current designs / In review</small></div>
    </section>
  </div>`;
}

function bindBrandOverview() {
  const buttons = [...document.querySelectorAll('[data-brand-dish]')];
  const select = document.querySelector('[data-brand-dish-select]');
  if (select) select.onchange = () => buttons.find(x => x.dataset.brandDish === select.value)?.click();
  buttons.forEach((button, i) => {
    button.onclick = () => {
      brandDish = button.dataset.brandDish;
      document.querySelector('#bo-dish-preview').innerHTML = renderBrandDish();
      buttons.forEach(x => x.setAttribute('aria-pressed', String(x === button)));
      if (select) select.value = brandDish;
    };
    button.onkeydown = event => {
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (i + (event.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length;
      buttons[next].click();
      buttons[next].focus({preventScroll:true});
    };
  });
}
