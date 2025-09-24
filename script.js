// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      document.getElementById('navMenu').classList.remove('show');
    });
  });
  
  // Dark mode toggle + remember choice
  document.getElementById('darkToggle').addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
  
  // Mobile menu
  document.getElementById('menuToggle').addEventListener('click', ()=>{
    document.getElementById('navMenu').classList.toggle('show');
  });
  
  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  
  // Animated counters
  const nums = document.querySelectorAll('.num');
  const io2 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let cur = 0;
      const step = Math.max(1, Math.round(target/60));
      const tick = ()=>{ cur += step; if(cur>target) cur=target; el.textContent = cur; if(cur<target) requestAnimationFrame(tick); };
      tick();
      io2.unobserve(el);
    });
  },{threshold:0.6});
  nums.forEach(n=>io2.observe(n));
  