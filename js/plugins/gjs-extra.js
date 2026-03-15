grapesjs.plugins.add('gjs-extra', function(editor, opts) {
  var bm = editor.BlockManager;
  var domt = editor.DomComponents;

  bm.add('slider-block', {
    label: 'Slider', category: 'Extra', attributes: { class: 'fa fa-sliders' },
    content: '<div class="cs-sl"><div class="cs-sl-track"><div class="cs-sl-slide" style="background:linear-gradient(135deg,#4d114f,#a0449e)"><div class="cs-sl-content"><h2>Slide One</h2><p>Add your headline and supporting text for this slide.</p><a href="#" class="cs-sl-btn">Get Started</a></div></div><div class="cs-sl-slide" style="background:linear-gradient(135deg,#459ba8,#78c5d6)"><div class="cs-sl-content"><h2>Slide Two</h2><p>This is the second slide. Replace with your own content and imagery.</p><a href="#" class="cs-sl-btn">Learn More</a></div></div><div class="cs-sl-slide" style="background:linear-gradient(135deg,#f28c33,#e868a2)"><div class="cs-sl-content"><h2>Slide Three</h2><p>A third slide to showcase more of your products or features.</p><a href="#" class="cs-sl-btn">Discover</a></div></div></div><button class="cs-sl-arrow cs-sl-prev">&#10094;</button><button class="cs-sl-arrow cs-sl-next">&#10095;</button><div class="cs-sl-dots"><span class="cs-sl-dot cs-sl-dot-active"></span><span class="cs-sl-dot"></span><span class="cs-sl-dot"></span></div></div><style>.cs-sl{position:relative;overflow:hidden;width:100%;font-family:Helvetica,sans-serif;}.cs-sl-track{display:flex;transition:transform .5s ease;}.cs-sl-slide{min-width:100%;min-height:420px;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px 20px;box-sizing:border-box;}.cs-sl-content{max-width:600px;color:#fff;}.cs-sl-content h2{font-size:2.4em;font-weight:700;margin-bottom:16px;}.cs-sl-content p{font-size:1.05em;opacity:.85;margin-bottom:30px;line-height:1.6;}.cs-sl-btn{display:inline-block;padding:13px 32px;background:rgba(255,255,255,.2);border:2px solid #fff;color:#fff;border-radius:5px;text-decoration:none;font-weight:700;}.cs-sl-arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.3);border:none;color:#fff;font-size:1.4em;width:44px;height:44px;border-radius:50%;cursor:pointer;z-index:10;}.cs-sl-prev{left:14px;}.cs-sl-next{right:14px;}.cs-sl-dots{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);display:flex;gap:8px;}.cs-sl-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;border:none;display:block;}.cs-sl-dot-active{background:#fff;}</style>'
  });

  bm.add('flip-box', {
    label: 'Flip Box', category: 'Extra', attributes: { class: 'fa fa-refresh' },
    content: '<div class="cs-flip-row"><div class="cs-flip"><div class="cs-flip-inner"><div class="cs-flip-front" style="background:linear-gradient(135deg,#4d114f,#a0449e)"><div class="cs-flip-icon">&#9889;</div><h3>Hover Me</h3><p>Front side content goes here.</p></div><div class="cs-flip-back" style="background:#3A3B46"><div class="cs-flip-icon">&#10003;</div><h3>Revealed!</h3><p>Back side content. Add details, links or a CTA here.</p><a href="#" class="cs-flip-btn">Learn More</a></div></div></div><div class="cs-flip"><div class="cs-flip-inner"><div class="cs-flip-front" style="background:linear-gradient(135deg,#459ba8,#78c5d6)"><div class="cs-flip-icon">&#128274;</div><h3>Secure</h3><p>Your data is always protected.</p></div><div class="cs-flip-back" style="background:#1e3a4a"><div class="cs-flip-icon">&#128170;</div><h3>256-bit Encryption</h3><p>Enterprise-grade security for every plan.</p><a href="#" class="cs-flip-btn">Details</a></div></div></div><div class="cs-flip"><div class="cs-flip-inner"><div class="cs-flip-front" style="background:linear-gradient(135deg,#f28c33,#e868a2)"><div class="cs-flip-icon">&#127881;</div><h3>Easy Start</h3><p>Get up and running in minutes.</p></div><div class="cs-flip-back" style="background:#4a1a2a"><div class="cs-flip-icon">&#128640;</div><h3>No Setup Needed</h3><p>Just sign up and start building right away.</p><a href="#" class="cs-flip-btn">Get Started</a></div></div></div></div><style>.cs-flip-row{display:flex;flex-wrap:wrap;gap:24px;justify-content:center;padding:40px 20px;font-family:Helvetica,sans-serif;}.cs-flip{width:220px;height:280px;perspective:1000px;}.cs-flip-inner{position:relative;width:100%;height:100%;transition:transform .6s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d;}.cs-flip:hover .cs-flip-inner{transform:rotateY(180deg);}.cs-flip-front,.cs-flip-back{position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;color:#fff;}.cs-flip-back{transform:rotateY(180deg);}.cs-flip-icon{font-size:2.4em;margin-bottom:12px;}.cs-flip-front h3,.cs-flip-back h3{font-size:1.1em;font-weight:700;margin:0 0 8px;}.cs-flip-front p,.cs-flip-back p{font-size:.82em;opacity:.85;line-height:1.5;margin:0 0 16px;}.cs-flip-btn{display:inline-block;padding:8px 20px;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.5);color:#fff;border-radius:4px;text-decoration:none;font-size:.82em;font-weight:700;}</style>'
  });

  bm.add('carousel-nested', {
    label: 'Carousel Nested', category: 'Extra', attributes: { class: 'fa fa-th-large' },
    content: '<div class="cs-cn"><div class="cs-cn-track"><div class="cs-cn-slide"><div class="cs-cn-card"><img src="https://via.placeholder.com/500x280/4d114f/fff?text=Project+1" class="cs-cn-img"><div class="cs-cn-body"><span class="cs-cn-tag">Design</span><h3>Brand Identity Project</h3><p>A complete visual identity for a modern tech startup including logo, colors and type.</p><a href="#" class="cs-cn-link">View Case Study &#8594;</a></div></div></div><div class="cs-cn-slide"><div class="cs-cn-card"><img src="https://via.placeholder.com/500x280/459ba8/fff?text=Project+2" class="cs-cn-img"><div class="cs-cn-body"><span class="cs-cn-tag">Development</span><h3>E-Commerce Platform</h3><p>Full-stack online store with payment integration, inventory management and analytics.</p><a href="#" class="cs-cn-link">View Case Study &#8594;</a></div></div></div><div class="cs-cn-slide"><div class="cs-cn-card"><img src="https://via.placeholder.com/500x280/e868a2/fff?text=Project+3" class="cs-cn-img"><div class="cs-cn-body"><span class="cs-cn-tag">Marketing</span><h3>Growth Campaign</h3><p>Multi-channel campaign that doubled organic traffic and increased conversions by 45%.</p><a href="#" class="cs-cn-link">View Case Study &#8594;</a></div></div></div></div><button class="cs-cn-arrow cs-cn-prev">&#10094;</button><button class="cs-cn-arrow cs-cn-next">&#10095;</button></div><style>.cs-cn{position:relative;overflow:hidden;max-width:600px;margin:0 auto;font-family:Helvetica,sans-serif;}.cs-cn-track{display:flex;transition:transform .45s ease;}.cs-cn-slide{min-width:100%;padding:10px;box-sizing:border-box;}.cs-cn-card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1);}.cs-cn-img{width:100%;height:200px;object-fit:cover;display:block;}.cs-cn-body{padding:22px;}.cs-cn-tag{display:inline-block;background:#f0e0f0;color:#4d114f;font-size:.72em;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:3px 10px;border-radius:20px;margin-bottom:10px;}.cs-cn-body h3{font-size:1.05em;font-weight:700;color:#333;margin:0 0 8px;}.cs-cn-body p{font-size:.85em;color:#777;line-height:1.55;margin:0 0 14px;}.cs-cn-link{font-size:.85em;font-weight:700;color:#4d114f;text-decoration:none;}.cs-cn-arrow{position:absolute;top:35%;transform:translateY(-50%);background:rgba(77,17,79,.7);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:1em;cursor:pointer;z-index:5;}.cs-cn-prev{left:6px;}.cs-cn-next{right:6px;}</style>'
  });

  bm.add('carousel-loop', {
    label: 'Carousel Loop', category: 'Extra', attributes: { class: 'fa fa-repeat' },
    content: '<div class="cs-loop"><div class="cs-loop-inner"><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#4d114f,#a0449e)"><span>&#9889;</span><p>Feature One</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#459ba8,#78c5d6)"><span>&#128274;</span><p>Feature Two</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#79c267,#c5d647)"><span>&#127757;</span><p>Feature Three</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#f28c33,#e868a2)"><span>&#128200;</span><p>Feature Four</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#4d114f,#a0449e)"><span>&#9889;</span><p>Feature One</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#459ba8,#78c5d6)"><span>&#128274;</span><p>Feature Two</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#79c267,#c5d647)"><span>&#127757;</span><p>Feature Three</p></div></div><div class="cs-loop-item"><div class="cs-loop-box" style="background:linear-gradient(135deg,#f28c33,#e868a2)"><span>&#128200;</span><p>Feature Four</p></div></div></div></div><style>.cs-loop{overflow:hidden;padding:30px 0;font-family:Helvetica,sans-serif;}.cs-loop-inner{display:flex;gap:20px;animation:cs-loop-scroll 12s linear infinite;width:max-content;}.cs-loop:hover .cs-loop-inner{animation-play-state:paused;}.cs-loop-item{flex-shrink:0;}.cs-loop-box{width:160px;height:160px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;gap:10px;}.cs-loop-box span{font-size:2.2em;}.cs-loop-box p{font-size:.85em;font-weight:600;margin:0;}@keyframes cs-loop-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}</style>'
  });

  bm.add('counter-block', {
    label: 'Counter', category: 'Extra', attributes: { class: 'fa fa-sort-numeric-asc' },
    content: {
      type: 'cs-counter', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-counter',
        'data-counter-bg': '#4d114f', 'data-counter-animate': '1', 'data-counter-duration': '2000' },
      components: '<section style="padding:70px 20px;background:#4d114f;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:50px;"><div style="min-width:150px;"><div class="cs-counter-num" data-target="10000" style="font-size:3.2em;font-weight:800;color:#fff;line-height:1;margin-bottom:8px;">0</div><div style="font-size:.82em;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.65);">Happy Customers</div></div><div style="min-width:150px;"><div class="cs-counter-num" data-target="350" style="font-size:3.2em;font-weight:800;color:#fff;line-height:1;margin-bottom:8px;">0</div><div style="font-size:.82em;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.65);">Projects Done</div></div><div style="min-width:150px;"><div class="cs-counter-num" data-target="99" style="font-size:3.2em;font-weight:800;color:#fff;line-height:1;margin-bottom:8px;">0</div><div style="font-size:.82em;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.65);">% Satisfaction</div></div><div style="min-width:150px;"><div class="cs-counter-num" data-target="24" style="font-size:3.2em;font-weight:800;color:#fff;line-height:1;margin-bottom:8px;">0</div><div style="font-size:.82em;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.65);">Awards Won</div></div></div></section><script>(function(){function animateCounters(){document.querySelectorAll(\'.cs-counter-num\').forEach(function(el){var target=parseInt(el.getAttribute(\'data-target\')),duration=2000,step=target/duration*16;var current=0;var timer=setInterval(function(){current+=step;if(current>=target){el.textContent=target.toLocaleString();clearInterval(timer);}else{el.textContent=Math.floor(current).toLocaleString();}},16);});}var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animateCounters();obs.disconnect();}});},{threshold:0.3});var el=document.querySelector(\'.cs-counter-num\');if(el)obs.observe(el.closest(\'section\'));})();<\/script>',
      traits: [
        { type: 'color',    name: 'data-counter-bg',       label: 'Background Color' },
        { type: 'checkbox', name: 'data-counter-animate',  label: 'Animate on Scroll', valueTrue: '1', valueFalse: '0' },
        { type: 'select',   name: 'data-counter-duration', label: 'Count Speed',
          options: [{ id: '1000', name: 'Fast (1s)' }, { id: '2000', name: 'Medium (2s)' }, { id: '3500', name: 'Slow (3.5s)' }] },
      ],
    },
  });

  domt.addType('cs-counter', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-counter-bg')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-counter') ? { type: 'cs-counter' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'color',    name: 'data-counter-bg',       label: 'Background Color', changeProp: 0 },
      { type: 'checkbox', name: 'data-counter-animate',  label: 'Animate on Scroll', changeProp: 0, valueTrue: '1', valueFalse: '0' },
      { type: 'select',   name: 'data-counter-duration', label: 'Count Speed', changeProp: 0,
        options: [{ id:'1000', name:'Fast (1s)' }, { id:'2000', name:'Medium (2s)' }, { id:'3500', name:'Slow (3.5s)' }] },
    ] } },
  });

  // Trait Handlers
  editor.on('component:add', function(model) {
    if (!model || typeof model.getAttributes !== 'function') return;
    var attrs = model.getAttributes();

    function child(tag) {
      var found = null;
      model.components && model.components().each(function(c) {
        if (!found && c.get('tagName') === tag) found = c;
      });
      return found || model;
    }

    // COUNTER
    if ('data-counter-bg' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-counter-bg' in changed) {
          section.addStyle({ 'background': a['data-counter-bg'] || '#4d114f' });
        }
      });
    }
  });

  // Slider / Carousel interactivity in canvas
  function csInitSliders() {
    var doc = editor.Canvas.getDocument();
    if (!doc) return;

    var configs = [
      { wrap: '.cs-sl', track: '.cs-sl-track', prev: '.cs-sl-prev', next: '.cs-sl-next', dot: '.cs-sl-dot', dotOn: 'cs-sl-dot-active' },
      { wrap: '.cs-cn', track: '.cs-cn-track', prev: '.cs-cn-prev', next: '.cs-cn-next', dot: null },
      { wrap: '.cs-cmed', track: '.cs-cmed-track', prev: '.cs-cmed-prev', next: '.cs-cmed-next', dot: null },
      { wrap: '.cs-cimg', track: '.cs-cimg-track', prev: '.cs-cimg-prev', next: '.cs-cimg-next', dot: '.cs-cimg-dot', dotOn: 'cs-cimg-dot-on' }
    ];

    configs.forEach(function (cfg) {
      var els = doc.querySelectorAll(cfg.wrap);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el._csInited) continue;
        el._csInited = true;
        el.setAttribute('data-cur', '0');
        var track = el.querySelector(cfg.track);
        var slides = track ? track.children : [];
        var n = slides.length;
        if (!track || n === 0) continue;

        (function(el, track, slides, n, cfg) {
            function goTo(i) {
                i = ((i % n) + n) % n;
                el.setAttribute('data-cur', i);
                track.style.transform = 'translateX(-' + (i * 100) + '%)';
                if (cfg.dot) {
                    var dots = el.querySelectorAll(cfg.dot);
                    for (var j = 0; j < dots.length; j++) {
                        dots[j].classList.toggle(cfg.dotOn, j === i);
                    }
                }
            }

            var prev = el.querySelector(cfg.prev);
            var next = el.querySelector(cfg.next);
            if (prev) prev.addEventListener('click', function (e) {
                e.stopPropagation();
                goTo(parseInt(el.getAttribute('data-cur') || 0) - 1);
            });
            if (next) next.addEventListener('click', function (e) {
                e.stopPropagation();
                goTo(parseInt(el.getAttribute('data-cur') || 0) + 1);
            });
            if (cfg.dot) {
                var dots = el.querySelectorAll(cfg.dot);
                for (var idx = 0; idx < dots.length; idx++) {
                    (function(idx) {
                        dots[idx].addEventListener('click', function (e) {
                            e.stopPropagation();
                            goTo(idx);
                        });
                    })(idx);
                }
            }
        })(el, track, slides, n, cfg);
      }
    });
  }

  editor.on('load', function() {
    csInitSliders();
    var frame = editor.Canvas.getFrameEl();
    if (frame) {
      frame.addEventListener('load', function() {
        setTimeout(csInitSliders, 200);
      });
    }
  });

  editor.on('component:add', function () { setTimeout(csInitSliders, 100); });
  editor.on('component:update', function () { setTimeout(csInitSliders, 100); });
});
