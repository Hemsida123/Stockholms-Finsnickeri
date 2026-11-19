const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.mobile-nav');
function menu(open){toggle?.setAttribute('aria-expanded',String(open));if(nav)nav.hidden=!open;document.body.classList.toggle('menu-open',open);document.querySelector('main')?.toggleAttribute('inert',open);document.querySelector('footer')?.toggleAttribute('inert',open);document.querySelector('.mobile-cta')?.toggleAttribute('inert',open);if(open)nav.querySelector('a')?.focus();else toggle?.focus()}
toggle?.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
nav?.addEventListener('click',e=>{if(e.target.closest('a'))menu(false)});
document.addEventListener('keydown',e=>{if(toggle?.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape')menu(false);if(e.key==='Tab'){const a=[toggle,...nav.querySelectorAll('a')],first=a[0],last=a.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
matchMedia('(min-width:801px)').addEventListener('change',e=>{if(e.matches&&toggle?.getAttribute('aria-expanded')==='true')menu(false)});
const sentinel=document.querySelector('.hero-sentinel');if(sentinel)new IntersectionObserver(entries=>document.body.classList.toggle('scrolled',!entries[0].isIntersecting)).observe(sentinel);
const filterButtons=[...document.querySelectorAll('[data-filter]')],galleryItems=[...document.querySelectorAll('[data-category]')];
filterButtons.forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.filter;filterButtons.forEach(a=>a.setAttribute('aria-pressed',String(a===b)));let n=0;galleryItems.forEach(el=>{el.hidden=key!=='alla'&&el.dataset.category!==key;if(!el.hidden)n++});const status=document.querySelector('.gallery-status');if(status)status.textContent=`Visar ${n} bilder`;}));
const dialog=document.querySelector('.lightbox');let gallery=[],current=0,trigger=null;
function renderPhoto(){const a=gallery[current],i=dialog.querySelector('img');i.src=a.href;i.alt=a.dataset.caption||a.querySelector('img').alt;dialog.querySelector('.lightbox-top p').textContent=i.alt;dialog.querySelector('.lightbox-count').textContent=`${current+1} av ${gallery.length}`;dialog.querySelectorAll('[data-direction]').forEach(b=>b.hidden=gallery.length<2)}
document.querySelectorAll('[data-lightbox]').forEach(a=>a.addEventListener('click',e=>{if(!dialog?.showModal)return;e.preventDefault();trigger=a;gallery=[...document.querySelectorAll('[data-lightbox]')].filter(a=>!a.closest('[hidden]'));current=gallery.indexOf(a);renderPhoto();dialog.showModal()}));
dialog?.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog?.querySelectorAll('[data-direction]').forEach(b=>b.addEventListener('click',()=>{current=(current+Number(b.dataset.direction)+gallery.length)%gallery.length;renderPhoto()}));
dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();current=(current+(e.key==='ArrowRight'?1:-1)+gallery.length)%gallery.length;renderPhoto()}});
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog?.addEventListener('close',()=>trigger?.focus());
