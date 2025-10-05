document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'graph-bg';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let nodes = [], edges = [];
  const N = 34, MAX_SPEED = 0.18, LINK_DIST = 180;

  function fitCanvas(){
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.inset = 0;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.style.zIndex = 0;  // stays behind content but visible
    canvas.style.pointerEvents = 'none';
    canvas.style.background = 'radial-gradient(1200px 600px at 10% -10%, rgba(41,165,135,.10), transparent)';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init(){
    fitCanvas();
    nodes = Array.from({length: N}, () => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      vx: (Math.random() - 0.5) * MAX_SPEED,
      vy: (Math.random() - 0.5) * MAX_SPEED
    }));
    rebuildEdges();
  }

  function rebuildEdges(){
    edges = [];
    for (let i=0;i<nodes.length;i++){
      for (let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        if (Math.hypot(a.x-b.x, a.y-b.y) < LINK_DIST) edges.push([i,j]);
      }
    }
  }

  function draw(){
    ctx.clearRect(0,0,canvas.clientWidth, canvas.clientHeight);
    const pulse = 0.7 + 0.3 * Math.sin(Date.now()/900);

    const dark = document.documentElement.classList.contains('dark');
    const line = dark ? `rgba(41,165,135,${0.12*pulse})` : `rgba(41,165,135,${0.15*pulse})`;
    const dot  = dark ? 'rgba(41,165,135,0.85)' : 'rgba(41,165,135,0.9)`;

    ctx.strokeStyle = line;
    ctx.lineWidth = 1.1;

    edges.forEach(([i,j])=>{
      const a=nodes[i], b=nodes[j];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    });

    ctx.fillStyle = dot;
    nodes.forEach(n=>{
      ctx.beginPath(); ctx.arc(n.x,n.y,2.2,0,Math.PI*2); ctx.fill();
      n.x += n.vx; n.y += n.vy;
      if (n.x<0||n.x>canvas.clientWidth)  n.vx *= -1;
      if (n.y<0||n.y>canvas.clientHeight) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', init);
  init();
  draw();
});
