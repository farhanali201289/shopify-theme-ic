/* ============================================================
   Inspired Comforts — global.js
   Vanilla JS. No framework. Progressive enhancement.
   ============================================================ */
(function () {
  'use strict';

  const money = (cents) => {
    const fmt = (window.IC && window.IC.moneyFormat) || '${{amount}}';
    const amount = (cents / 100).toFixed(2);
    return fmt.replace(/\{\{\s*amount\s*\}\}/, amount).replace(/\{\{\s*amount_no_decimals\s*\}\}/, Math.round(cents / 100));
  };

  /* ---------- Mega menu (desktop, click + hover safe) ---------- */
  document.querySelectorAll('[data-mega-trigger]').forEach((li) => {
    const link = li.querySelector('.header__nav-link');
    if (!link) return;
    link.addEventListener('click', (e) => {
      if (!li.querySelector('.mega')) return;
      e.preventDefault();
      const open = li.classList.contains('is-open');
      document.querySelectorAll('[data-mega-trigger].is-open').forEach((o) => o.classList.remove('is-open'));
      li.classList.toggle('is-open', !open);
      document.body.classList.toggle('mega-open', !open);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-mega-trigger].is-open').forEach((o) => o.classList.remove('is-open'));
      document.body.classList.remove('mega-open');
      closeCart();
      closeMobileNav();
    }
  });
  const megaOverlay = document.querySelector('.header__overlay');
  if (megaOverlay) megaOverlay.addEventListener('click', () => {
    document.querySelectorAll('[data-mega-trigger].is-open').forEach((o) => o.classList.remove('is-open'));
    document.body.classList.remove('mega-open');
  });

  /* ---------- Mega close button ---------- */
  document.querySelectorAll('[data-mega-close]').forEach((btn) =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-mega-trigger].is-open').forEach((o) => o.classList.remove('is-open'));
      document.body.classList.remove('mega-open');
    })
  );

  /* ---------- Shop mega: condition switcher ---------- */
  document.querySelectorAll('[data-shop-mega]').forEach((mega) => {
    const rows = mega.querySelectorAll('[data-cond]');
    const panels = mega.querySelectorAll('[data-panel]');
    rows.forEach((row) => {
      const activate = () => {
        const key = row.dataset.cond;
        rows.forEach((r) => r.classList.toggle('is-active', r === row));
        panels.forEach((p) => p.classList.toggle('is-active', p.dataset.panel === key));
      };
      row.addEventListener('mouseenter', activate);
      row.addEventListener('focus', activate);
      row.addEventListener('click', (e) => { e.preventDefault(); activate(); });
    });
  });

  /* ---------- Mobile nav (offcanvas) ---------- */
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const mobileOverlay = document.querySelector('[data-mobile-overlay]');
  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('is-open');
    if (mobileOverlay) mobileOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    if (mobileOverlay) mobileOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-mobile-toggle]').forEach((b) =>
    b.addEventListener('click', () => {
      if (mobileNav && mobileNav.classList.contains('is-open')) closeMobileNav();
      else openMobileNav();
    })
  );
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  /* ---------- Horizontal scrollers (carousels) ---------- */
  document.querySelectorAll('[data-scroller]').forEach((scroller) => {
    const track = scroller.querySelector('[data-scroller-track]');
    if (!track) return;
    scroller.querySelectorAll('[data-scroller-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.scrollerBtn === 'prev' ? -1 : 1;
        track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.85, 640), behavior: 'smooth' });
      });
    });

    var interval = parseInt(scroller.dataset.autoSlide, 10);
    if (!interval) return;
    var timer;
    function startAuto() {
      timer = setInterval(function() {
        var maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 2) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: Math.min(track.clientWidth * 0.85, 640), behavior: 'smooth' });
        }
      }, interval);
    }
    function stopAuto() { clearInterval(timer); }
    startAuto();
    scroller.addEventListener('mouseenter', stopAuto);
    scroller.addEventListener('mouseleave', startAuto);
    scroller.addEventListener('touchstart', stopAuto, { passive: true });
    scroller.addEventListener('touchend', function() { setTimeout(startAuto, 1000); });
  });

  /* ---------- Filter chips (kit finder / review filters) ---------- */
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const targetSel = group.dataset.filterTarget;
    group.querySelectorAll('[data-filter]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const val = chip.dataset.filter;
        group.querySelectorAll('[data-filter]').forEach((c) => c.classList.toggle('is-active', c === chip));
        document.querySelectorAll(targetSel + ' [data-filter-item]').forEach((item) => {
          const cats = (item.dataset.filterItem || '').split(' ');
          item.style.display = (val === 'all' || cats.indexOf(val) > -1 || cats.indexOf('always') > -1) ? '' : 'none';
        });
      });
    });
  });

  /* ---------- Cart drawer ---------- */
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartOverlay = document.querySelector('[data-cart-overlay]');

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('is-open');
    if (cartOverlay) cartOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    if (cartOverlay) cartOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  window.ICopenCart = openCart;

  document.querySelectorAll('[data-cart-toggle]').forEach((b) =>
    b.addEventListener('click', (e) => {
      if (window.IC && window.IC.cartType === 'page') return; // let link go to /cart
      e.preventDefault(); openCart(); refreshCart();
    })
  );
  document.querySelectorAll('[data-cart-close]').forEach((b) => b.addEventListener('click', closeCart));
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  async function refreshCart() {
    try {
      const res = await fetch('/?section_id=cart-drawer');
      const text = await res.text();
      const html = new DOMParser().parseFromString(text, 'text/html');
      const fresh = html.querySelector('[data-cart-contents]');
      const current = document.querySelector('[data-cart-contents]');
      if (fresh && current) current.innerHTML = fresh.innerHTML;
      bindCartLineEvents();
    } catch (e) { /* no-op */ }
  }

  function updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  async function changeLine(line, quantity) {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    const cart = await res.json();
    updateCartCount(cart.item_count);
    await refreshCart();
  }

  function bindCartLineEvents() {
    document.querySelectorAll('[data-line-remove]').forEach((b) =>
      b.addEventListener('click', () => changeLine(parseInt(b.dataset.lineRemove, 10), 0))
    );
    document.querySelectorAll('[data-line-qty]').forEach((wrap) => {
      const line = parseInt(wrap.dataset.lineQty, 10);
      const input = wrap.querySelector('input');
      wrap.querySelector('[data-qty-minus]').addEventListener('click', () => changeLine(line, Math.max(0, parseInt(input.value, 10) - 1)));
      wrap.querySelector('[data-qty-plus]').addEventListener('click', () => changeLine(line, parseInt(input.value, 10) + 1));
      input.addEventListener('change', () => changeLine(line, Math.max(0, parseInt(input.value, 10) || 0)));
    });
  }
  bindCartLineEvents();

  /* ---------- Add to cart (product forms + quick add) ---------- */
  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-product-form]');
    if (!form) return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Adding…'; }
    try {
      const formData = new FormData(form);
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });
      if (!res.ok) throw new Error('add failed');
      const cartRes = await fetch('/cart.js');
      const cart = await cartRes.json();
      updateCartCount(cart.item_count);
      await refreshCart();
      if (window.IC && window.IC.cartType === 'drawer') openCart();
      else window.location.href = '/cart';
    } catch (err) {
      if (btn) btn.textContent = 'Couldn’t add — try again';
      setTimeout(() => { if (btn) btn.textContent = original; }, 1800);
    } finally {
      if (btn) { btn.disabled = false; if (btn.textContent === 'Adding…') btn.textContent = original; }
    }
  });

  /* ---------- PDP: gallery thumbs ---------- */
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('[data-gallery-main]');
    gallery.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        if (main) { main.src = thumb.dataset.full || thumb.src; main.srcset = ''; }
        gallery.querySelectorAll('[data-gallery-thumb]').forEach((t) => t.classList.toggle('is-active', t === thumb));
      });
    });
  });

  /* ---------- PDP: variant picker ---------- */
  document.querySelectorAll('[data-product-form]').forEach((form) => {
    const root = form.closest('[data-product-root]') || document;
    const variantsScript = root.querySelector('[data-variants-json]');
    if (!variantsScript) return;
    let variants;
    try { variants = JSON.parse(variantsScript.textContent); } catch (e) { return; }
    const idInput = form.querySelector('[data-variant-id]');
    const priceEl = root.querySelector('[data-price]');
    const compareEl = root.querySelector('[data-compare]');
    const addBtn = form.querySelector('[type="submit"]');

    function selectedOptions() {
      const opts = [];
      root.querySelectorAll('[data-option-index]').forEach((group) => {
        const idx = parseInt(group.dataset.optionIndex, 10);
        const active = group.querySelector('[aria-checked="true"], input:checked');
        if (active) opts[idx] = active.dataset.value || active.value;
      });
      return opts;
    }
    function update() {
      const sel = selectedOptions();
      const match = variants.find((v) =>
        v.options.every((o, i) => sel[i] === undefined || o === sel[i])
      );
      if (!match) return;
      if (idInput) idInput.value = match.id;
      if (priceEl) priceEl.textContent = money(match.price);
      if (compareEl) {
        if (match.compare_at_price && match.compare_at_price > match.price) {
          compareEl.textContent = money(match.compare_at_price); compareEl.style.display = '';
        } else { compareEl.style.display = 'none'; }
      }
      if (addBtn) {
        addBtn.disabled = !match.available;
        addBtn.textContent = match.available ? (addBtn.dataset.addLabel || 'Add to cart') : 'Sold out';
      }
    }
    root.querySelectorAll('[data-option-index] [data-value]').forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const group = swatch.closest('[data-option-index]');
        group.querySelectorAll('[data-value]').forEach((s) => s.setAttribute('aria-checked', s === swatch ? 'true' : 'false'));
        update();
      });
    });
    root.querySelectorAll('[data-option-index] select, [data-option-index] input[type="radio"]').forEach((el) =>
      el.addEventListener('change', update)
    );
    update();
  });

  /* ---------- "Find my kit" router chips ---------- */
  document.querySelectorAll('[data-goto-url]').forEach((el) =>
    el.addEventListener('click', () => { window.location.href = el.dataset.gotoUrl; })
  );
})();
