grapesjs.plugins.add('gjs-sections', function(editor, opts) {
  var bm = editor.BlockManager;
  var domt = editor.DomComponents;

  function findByClass(cm, className) {
    var found = null;
    function walk(m) {
      if (found) return;
      var attributes = m.getAttributes ? m.getAttributes() : {};
      var cl = attributes.class || '';
      if (cl.split(' ').indexOf(className) !== -1) { found = m; return; }
      if (m.components) m.components().each(walk);
    }
    walk(cm);
    return found;
  }

  domt.addType('cs-hero-section', {
    isComponent: function(el) { return el.hasAttribute && el.hasAttribute('data-hero-bg') ? { type: 'cs-hero-section' } : undefined; },
    model: {
      defaults: {
        tagName: 'section',
        traits: [
          { type: 'select', name: 'data-hero-bg', label: 'Background', options: [{ id: 'gradient', name: 'Purple Gradient' }, { id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }, { id: 'white', name: 'White' }], changeProp: 0 },
          { type: 'checkbox', name: 'data-hero-fullheight', label: 'Full Height (100vh)', valueTrue: '1', valueFalse: '0', changeProp: 0 },
          { type: 'select', name: 'data-hero-align', label: 'Text Align', options: [{ id: 'center', name: 'Center' }, { id: 'left', name: 'Left' }, { id: 'right', name: 'Right' }], changeProp: 0 }
        ]
      }
    }
  });

  domt.addType('cs-before-after', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-ba-accent')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-before-after') ? { type: 'cs-before-after' } : undefined; },
    model: { defaults: { tagName: 'section', traits: [
      { type: 'text', name: 'data-ba-label-before', label: 'Label Links (Before)', changeProp: 0 },
      { type: 'text', name: 'data-ba-label-after', label: 'Label Rechts (After)', changeProp: 0 },
      { type: 'color', name: 'data-ba-accent', label: 'Divider-Farbe', changeProp: 0 },
      { type: 'color', name: 'data-ba-bg', label: 'Hintergrund', changeProp: 0 }
    ] } }
  });

  domt.addType('cs-portfolio', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-pf-cols')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-portfolio') ? { type: 'cs-portfolio' } : undefined; },
    model: { defaults: { tagName: 'section', traits: [
      { type: 'select', name: 'data-pf-cols', label: 'Columns', options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }], changeProp: 0 },
      { type: 'color', name: 'data-pf-accent', label: 'Overlay Color', changeProp: 0 },
      { type: 'color', name: 'data-pf-bg', label: 'Background', changeProp: 0 },
      { type: 'select', name: 'data-pf-radius', label: 'Card Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'10px', name:'Medium' }, { id:'20px', name:'Large' }], changeProp: 0 }
    ] } }
  });

  domt.addType('cs-faq', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-faq-accent')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-faq') ? { type: 'cs-faq' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'color', name: 'data-faq-accent', label: 'Accent Color', changeProp: 0 },
      { type: 'color', name: 'data-faq-bg', label: 'Background Color', changeProp: 0 }
    ] } }
  });

  domt.addType('cs-newsletter', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-nl-btncolor')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-newsletter') ? { type: 'cs-newsletter' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text', name: 'data-nl-btntext', label: 'Button Text', changeProp: 0 },
      { type: 'text', name: 'data-nl-placeholder', label: 'Input Placeholder', changeProp: 0 },
      { type: 'color', name: 'data-nl-btncolor', label: 'Button Color', changeProp: 0 }
    ] } }
  });

  domt.addType('cs-cookie', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-cookie-text')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-cookie') ? { type: 'cs-cookie' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text', name: 'data-cookie-text', label: 'Banner Text', changeProp: 0 },
      { type: 'text', name: 'data-cookie-accept', label: 'Accept Button', changeProp: 0 },
      { type: 'text', name: 'data-cookie-decline', label: 'Decline Button', changeProp: 0 },
      { type: 'text', name: 'data-cookie-policy', label: 'Policy URL', changeProp: 0 }
    ] } }
  });

  domt.addType('cs-navbar', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-nav-bg')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-navbar') ? { type: 'cs-navbar' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text', name: 'data-nav-logo', label: 'Logo Text', changeProp: 0 },
      { type: 'color', name: 'data-nav-bg', label: 'Nav Background', changeProp: 0 },
      { type: 'color', name: 'data-nav-linkcolor', label: 'Link Color', changeProp: 0 },
      { type: 'select', name: 'data-nav-pos', label: 'Position', options: [{ id:'sticky', name:'Sticky' }, { id:'fixed', name:'Fixed' }, { id:'relative', name:'Static' }], changeProp: 0 }
    ] } }
  });

  domt.addType('cs-pricing', {
    isComponent: function(el) { return (el.hasAttribute && el.hasAttribute('data-pricing-currency')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-pricing') ? { type: 'cs-pricing' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'select', name: 'data-pricing-currency', label: 'Currency', options: [{ id:'$', name:'$ Dollar' }, { id:'€', name:'€ Euro' }, { id:'£', name:'£ Pound' }, { id:'¥', name:'¥ Yen' }], changeProp: 0 },
      { type: 'color', name: 'data-pricing-color', label: 'Highlight Color', changeProp: 0 }
    ] } }
  });

  // Add Blocks
  bm.add('hero-section', {
    label: 'Hero Section', category: 'Sections', attributes: { class: 'fa fa-home' },
    content: {
      type: 'cs-hero-section', tagName: 'section',
      attributes: { 'data-gjs-type': 'cs-hero-section', 'data-hero-fullheight': '0', 'data-hero-bg': 'gradient', style: 'background:linear-gradient(135deg,#4d114f,#a0449e);padding:100px 20px;text-align:center;color:#fff;font-family:Helvetica,sans-serif;min-height:auto;box-sizing:border-box;' },
      components: [{ tagName: 'div', attributes: { style: 'max-width:700px;margin:0 auto;' }, components: [{ tagName: 'h1', attributes: { style: 'font-size:2.8em;font-weight:700;margin-bottom:20px;' }, components: [{ type: 'text', content: 'Your Headline Here' }] }, { tagName: 'p', attributes: { style: 'font-size:1.2em;opacity:.85;margin-bottom:35px;line-height:1.6;' }, components: [{ type: 'text', content: 'A short subheading that explains your value proposition in one sentence.' }] }, { tagName: 'a', attributes: { href: '#', style: 'display:inline-block;padding:14px 36px;background:#fff;color:#4d114f;border-radius:4px;font-weight:700;text-decoration:none;' }, components: [{ type: 'text', content: 'Get Started' }] }] }]
    }
  });

  bm.add('features-section', { label: 'Features Grid', category: 'Sections', attributes: { class: 'fa fa-list-ul' }, content: '<section class="cs-features"><div class="cs-feat-inner"><h2 class="cs-feat-title">Our Features</h2><p class="cs-feat-sub">Everything you need to succeed online</p><div class="cs-feat-grid"><div class="cs-feat-item"><div class="cs-feat-icon">&#9889;</div><h3>Fast</h3><p>Blazing fast performance out of the box.</p></div><div class="cs-feat-item"><div class="cs-feat-icon">&#127912;</div><h3>Beautiful</h3><p>Stunning UI components ready to use.</p></div><div class="cs-feat-item"><div class="cs-feat-icon">&#128274;</div><h3>Secure</h3><p>Enterprise-grade security built in.</p></div><div class="cs-feat-item"><div class="cs-feat-icon">&#128241;</div><h3>Responsive</h3><p>Looks great on every device.</p></div><div class="cs-feat-item"><div class="cs-feat-icon">&#128295;</div><h3>Flexible</h3><p>Customize everything to fit your needs.</p></div><div class="cs-feat-item"><div class="cs-feat-icon">&#128172;</div><h3>Supported</h3><p>Dedicated support team at your service.</p></div></div></div></section><style>.cs-features{padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;text-align:center;}.cs-feat-inner{max-width:1100px;margin:0 auto;}.cs-feat-title{font-size:2em;font-weight:700;color:#333;margin-bottom:12px;}.cs-feat-sub{font-size:1em;color:#888;margin-bottom:50px;}.cs-feat-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:30px;}.cs-feat-item{width:280px;padding:30px 20px;border-radius:8px;background:#fafafa;box-shadow:0 2px 8px rgba(0,0,0,.07);}.cs-feat-icon{font-size:2em;margin-bottom:12px;}.cs-feat-item h3{font-size:1.1em;font-weight:700;color:#333;margin:0 0 8px;}.cs-feat-item p{font-size:.9em;color:#777;line-height:1.5;margin:0;}</style>' });

  bm.add('faq-section', {
    label: 'FAQ Section', category: 'Sections', attributes: { class: 'fa fa-question-circle' },
    content: {
      type: 'cs-faq', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-faq', 'data-faq-accent': '#4d114f', 'data-faq-bg': '#f9f9f9' },
      components: '<section style="padding:80px 20px;background:#f9f9f9;font-family:Helvetica,sans-serif;"><div style="max-width:800px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;text-align:center;margin-bottom:50px;">Frequently Asked Questions</h2><div style="margin-bottom:20px;background:#fff;padding:25px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.05);"><h4 style="margin:0 0 10px;font-size:1.1em;color:#333;display:flex;align-items:center;gap:10px;"><span style="color:#4d114f;">Q:</span> How does the free trial work?</h4><p style="margin:0;color:#777;line-height:1.6;font-size:.95em;">You can use all Pro features for 14 days without any commitment. No credit card is required to start.</p></div><div style="margin-bottom:20px;background:#fff;padding:25px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.05);"><h4 style="margin:0 0 10px;font-size:1.1em;color:#333;display:flex;align-items:center;gap:10px;"><span style="color:#4d114f;">Q:</span> Can I cancel my subscription?</h4><p style="margin:0;color:#777;line-height:1.6;font-size:.95em;">Yes, you can cancel at any time from your account settings. You will have access until the end of your billing period.</p></div><div style="background:#fff;padding:25px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.05);"><h4 style="margin:0 0 10px;font-size:1.1em;color:#333;display:flex;align-items:center;gap:10px;"><span style="color:#4d114f;">Q:</span> Do you offer volume discounts?</h4><p style="margin:0;color:#777;line-height:1.6;font-size:.95em;">Absolutely! For teams of 20 or more, we offer custom pricing. Contact our sales team for more information.</p></div></div></section>',
      traits: [ { type: 'color', name: 'data-faq-accent', label: 'Accent Color' }, { type: 'color', name: 'data-faq-bg', label: 'Background Color' } ]
    }
  });

  bm.add('testimonials-section', { label: 'Testimonials', category: 'Sections', attributes: { class: 'fa fa-comments' }, content: '<section class="cs-testi"><div class="cs-testi-inner"><h2 class="cs-testi-title">What our customers say</h2><div class="cs-testi-grid"><div class="cs-testi-card"><p class="cs-testi-quote">"This product completely changed how we work. Absolutely outstanding quality and support."</p><div class="cs-testi-auth"><img src="https://i.pravatar.cc/50?img=11" class="cs-testi-av"><div><strong>Sarah Miller</strong><span>CEO, Acme Inc.</span></div></div></div><div class="cs-testi-card"><p class="cs-testi-quote">"I have tried many similar tools. This one stands out for its ease of use and great features."</p><div class="cs-testi-auth"><img src="https://i.pravatar.cc/50?img=12" class="cs-testi-av"><div><strong>James Chen</strong><span>Lead Developer</span></div></div></div><div class="cs-testi-card"><p class="cs-testi-quote">"Our conversion rate went up 40% after switching. Highly recommend to anyone serious about results."</p><div class="cs-testi-auth"><img src="https://i.pravatar.cc/50?img=13" class="cs-testi-av"><div><strong>Maria Garcia</strong><span>Marketing Director</span></div></div></div></div></div></section><style>.cs-testi{padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;text-align:center;}.cs-testi-inner{max-width:1100px;margin:0 auto;}.cs-testi-title{font-size:2em;font-weight:700;color:#333;margin-bottom:50px;}.cs-testi-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:30px;}.cs-testi-card{width:310px;background:#fafafa;border-radius:10px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,.07);text-align:left;}.cs-testi-quote{font-size:.95em;color:#555;line-height:1.6;font-style:italic;margin-bottom:20px;}.cs-testi-auth{display:flex;align-items:center;gap:12px;}.cs-testi-av{width:46px;height:46px;border-radius:50%;object-fit:cover;}.cs-testi-auth strong{display:block;color:#333;font-size:.9em;}.cs-testi-auth span{font-size:.8em;color:#999;}</style>' });

  bm.add('logobar-section', { label: 'Logo Bar', category: 'Sections', attributes: { class: 'fa fa-building' }, content: '<section style="padding:50px 20px;background:#f4f4f4;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:1000px;margin:0 auto;"><p style="font-size:.85em;text-transform:uppercase;letter-spacing:2px;color:#aaa;margin-bottom:30px;">Trusted by leading companies</p><div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:30px;"><div style="font-size:1.4em;font-weight:700;color:#ccc;letter-spacing:3px;padding:10px 20px;border:2px solid #e0e0e0;border-radius:4px;min-width:120px;">COMPANY</div><div style="font-size:1.4em;font-weight:700;color:#ccc;letter-spacing:3px;padding:10px 20px;border:2px solid #e0e0e0;border-radius:4px;min-width:120px;">BRAND</div><div style="font-size:1.4em;font-weight:700;color:#ccc;letter-spacing:3px;padding:10px 20px;border:2px solid #e0e0e0;border-radius:4px;min-width:120px;">STARTUP</div><div style="font-size:1.4em;font-weight:700;color:#ccc;letter-spacing:3px;padding:10px 20px;border:2px solid #e0e0e0;border-radius:4px;min-width:120px;">CORP</div></div></div></section>' });

  bm.add('cta-section', { label: 'Call to Action', category: 'Sections', attributes: { class: 'fa fa-bullhorn' }, content: '<section style="padding:90px 20px;background:linear-gradient(135deg,#4d114f,#a0449e);text-align:center;font-family:Helvetica,sans-serif;color:#fff;"><div style="max-width:650px;margin:0 auto;"><h2 style="font-size:2.4em;font-weight:700;margin-bottom:16px;">Ready to get started?</h2><p style="font-size:1.1em;opacity:.85;margin-bottom:36px;">Join thousands of happy customers. No credit card required.</p><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;"><a href="#" style="padding:14px 36px;background:#fff;color:#4d114f;border-radius:4px;font-weight:700;text-decoration:none;">Start Free Trial</a><a href="#" style="padding:14px 36px;background:transparent;color:#fff;border:2px solid #fff;border-radius:4px;font-weight:700;text-decoration:none;">Learn More</a></div></div></section>' });

  bm.add('stats-section', { label: 'Stats / Numbers', category: 'Sections', attributes: { class: 'fa fa-bar-chart' }, content: '<section style="padding:70px 20px;background:#4d114f;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:40px;"><div style="padding:20px 40px;"><div style="font-size:3em;font-weight:700;color:#fff;">10K+</div><div style="font-size:.9em;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:2px;margin-top:6px;">Happy Customers</div></div><div style="padding:20px 40px;"><div style="font-size:3em;font-weight:700;color:#fff;">99.9%</div><div style="font-size:.9em;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:2px;margin-top:6px;">Uptime SLA</div></div><div style="padding:20px 40px;"><div style="font-size:3em;font-weight:700;color:#fff;">150+</div><div style="font-size:.9em;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:2px;margin-top:6px;">Countries</div></div><div style="padding:20px 40px;"><div style="font-size:3em;font-weight:700;color:#fff;">24/7</div><div style="font-size:.9em;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:2px;margin-top:6px;">Support</div></div></div></section>' });

  bm.add('contact-section', { label: 'Contact Form', category: 'Sections', attributes: { class: 'fa fa-envelope' }, content: '<section style="padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:650px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;margin-bottom:12px;">Get in Touch</h2><p style="font-size:.95em;color:#888;margin-bottom:40px;">Fill out the form and we will respond within 24 hours.</p><div style="text-align:left;"><div style="display:flex;gap:15px;margin-bottom:15px;"><input type="text" placeholder="Your Name" style="flex:1;padding:12px 15px;border:1px solid #ddd;border-radius:4px;font-size:.95em;box-sizing:border-box;"><input type="email" placeholder="Your Email" style="flex:1;padding:12px 15px;border:1px solid #ddd;border-radius:4px;font-size:.95em;box-sizing:border-box;"></div><textarea placeholder="Your message..." style="width:100%;padding:12px 15px;border:1px solid #ddd;border-radius:4px;font-size:.95em;height:140px;resize:vertical;margin-bottom:20px;box-sizing:border-box;"></textarea><button type="button" style="padding:13px 36px;background:#4d114f;color:#fff;border:none;border-radius:4px;font-size:1em;font-weight:700;cursor:pointer;">Send Message</button></div></div></section>' });

  bm.add('pricing-table', {
    label: 'Pricing Table', category: 'Sections', attributes: { class: 'fa fa-tags' },
    content: {
      type: 'cs-pricing', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-pricing', 'data-pricing-currency': '$', 'data-pricing-color': '#4d114f' },
      components: '<section style="padding:80px 20px;background:#fafafa;font-family:Helvetica,sans-serif;text-align:center;" data-currency="$" data-highlight="#4d114f"><div style="max-width:1000px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;margin-bottom:12px;">Simple Pricing</h2><p style="color:#888;margin-bottom:50px;">Choose the plan that works best for you.</p><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:25px;"><div style="width:280px;background:#fff;border-radius:10px;padding:35px 25px;box-shadow:0 2px 12px rgba(0,0,0,.08);"><div style="font-size:1em;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:15px;">Starter</div><div class="cs-price" style="font-size:3em;font-weight:700;color:#333;margin-bottom:25px;">$9<span style="font-size:.4em;color:#999;">/mo</span></div><ul style="list-style:none;padding:0;margin:0 0 30px;text-align:left;"><li style="padding:8px 0;border-bottom:1px solid #eee;font-size:.9em;color:#555;">1 User</li><li style="padding:8px 0;border-bottom:1px solid #eee;font-size:.9em;color:#555;">5 Projects</li><li style="padding:8px 0;font-size:.9em;color:#555;">10GB Storage</li></ul><a href="#" style="display:block;padding:12px;background:#4d114f;color:#fff;border-radius:5px;text-decoration:none;font-weight:700;">Get Started</a></div><div style="width:280px;background:#4d114f;border-radius:10px;padding:35px 25px;box-shadow:0 8px 24px rgba(77,17,79,.3);color:#fff;transform:scale(1.04);position:relative;"><div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#a0449e;color:#fff;padding:4px 16px;border-radius:20px;font-size:.75em;font-weight:700;">Popular</div><div style="font-size:1em;font-weight:700;text-transform:uppercase;letter-spacing:2px;opacity:.7;margin-bottom:15px;">Pro</div><div class="cs-price" style="font-size:3em;font-weight:700;margin-bottom:25px;">$29<span style="font-size:.4em;opacity:.7;">/mo</span></div><ul style="list-style:none;padding:0;margin:0 0 30px;text-align:left;"><li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:.9em;">5 Users</li><li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.15);font-size:.9em;">Unlimited Projects</li><li style="padding:8px 0;font-size:.9em;">100GB Storage</li></ul><a href="#" style="display:block;padding:12px;background:#fff;color:#4d114f;border-radius:5px;text-decoration:none;font-weight:700;">Get Started</a></div><div style="width:280px;background:#fff;border-radius:10px;padding:35px 25px;box-shadow:0 2px 12px rgba(0,0,0,.08);"><div style="font-size:1em;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:15px;">Enterprise</div><div class="cs-price" style="font-size:3em;font-weight:700;color:#333;margin-bottom:25px;">$99<span style="font-size:.4em;color:#999;">/mo</span></div><ul style="list-style:none;padding:0;margin:0 0 30px;text-align:left;"><li style="padding:8px 0;border-bottom:1px solid #eee;font-size:.9em;color:#555;">Unlimited Users</li><li style="padding:8px 0;border-bottom:1px solid #eee;font-size:.9em;color:#555;">Unlimited Projects</li><li style="padding:8px 0;font-size:.9em;color:#555;">Priority Support</li></ul><a href="#" style="display:block;padding:12px;background:#4d114f;color:#fff;border-radius:5px;text-decoration:none;font-weight:700;">Contact Sales</a></div></div></div></section>',
      traits: [ { type: 'select', name: 'data-pricing-currency', label: 'Currency', options: [{ id: '$', name: '$ Dollar' }, { id: '€', name: '€ Euro' }, { id: '£', name: '£ Pound' }, { id: '¥', name: '¥ Yen' }] }, { type: 'color', name: 'data-pricing-color', label: 'Highlight Color' } ]
    }
  });

  bm.add('timeline-section', {
    label: 'Timeline / History', category: 'Sections', attributes: { class: 'fa fa-clock-o' },
    content: '<section style="padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;"><div style="max-width:800px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;text-align:center;margin-bottom:60px;">Our Journey</h2><div style="position:relative;"><div style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:#f0e0f0;transform:translateX(-50%);"></div><div style="margin-bottom:40px;display:flex;align-items:center;justify-content:space-between;width:100%;"><div style="width:45%;text-align:right;"><h4 style="margin:0 0 8px;color:#333;">Founded</h4><p style="margin:0;color:#777;font-size:.9em;">The idea was born in a small garage in Berlin.</p></div><div style="width:30px;height:30px;background:#4d114f;border:4px solid #fff;border-radius:50%;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.1);"></div><div style="width:45%;font-weight:700;color:#a0449e;">2020</div></div><div style="margin-bottom:40px;display:flex;align-items:center;justify-content:space-between;width:100%;flex-direction:row-reverse;"><div style="width:45%;text-align:left;"><h4 style="margin:0 0 8px;color:#333;">Expansion</h4><p style="margin:0;color:#777;font-size:.9em;">We grew to a team of 10 and moved to our first real office.</p></div><div style="width:30px;height:30px;background:#4d114f;border:4px solid #fff;border-radius:50%;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.1);"></div><div style="width:45%;text-align:right;font-weight:700;color:#a0449e;">2022</div></div><div style="display:flex;align-items:center;justify-content:space-between;width:100%;"><div style="width:45%;text-align:right;"><h4 style="margin:0 0 8px;color:#333;">Next Level</h4><p style="margin:0;color:#777;font-size:.9em;">Launched version 2.0 and reached 10,000 happy customers.</p></div><div style="width:30px;height:30px;background:#4d114f;border:4px solid #fff;border-radius:50%;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.1);"></div><div style="width:45%;font-weight:700;color:#a0449e;">2024</div></div></div></div></section>'
  });

  bm.add('team-grid-section', {
    label: 'Team Grid', category: 'Sections', attributes: { class: 'fa fa-users' },
    content: '<section style="padding:80px 20px;background:#fafafa;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:1100px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;margin-bottom:50px;">Meet the Team</h2><div style="display:flex;flex-wrap:wrap;justify-content:center;gap:30px;"><div style="width:250px;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.06);"><img src="https://i.pravatar.cc/120?img=32" style="width:100px;height:100px;border-radius:50%;margin-bottom:20px;object-fit:cover;"><h4 style="margin:0 0 5px;color:#333;">John Doe</h4><p style="margin:0 0 15px;color:#a0449e;font-size:.85em;font-weight:700;text-transform:uppercase;">Co-Founder & CEO</p><div style="display:flex;justify-content:center;gap:12px;color:#ccc;"><i class="fa fa-twitter"></i><i class="fa fa-linkedin"></i></div></div><div style="width:250px;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.06);"><img src="https://i.pravatar.cc/120?img=44" style="width:100px;height:100px;border-radius:50%;margin-bottom:20px;object-fit:cover;"><h4 style="margin:0 0 5px;color:#333;">Jane Smith</h4><p style="margin:0 0 15px;color:#a0449e;font-size:.85em;font-weight:700;text-transform:uppercase;">Head of Design</p><div style="display:flex;justify-content:center;gap:12px;color:#ccc;"><i class="fa fa-dribbble"></i><i class="fa fa-linkedin"></i></div></div><div style="width:250px;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.06);"><img src="https://i.pravatar.cc/120?img=68" style="width:100px;height:100px;border-radius:50%;margin-bottom:20px;object-fit:cover;"><h4 style="margin:0 0 5px;color:#333;">Mike Johnson</h4><p style="margin:0 0 15px;color:#a0449e;font-size:.85em;font-weight:700;text-transform:uppercase;">CTO</p><div style="display:flex;justify-content:center;gap:12px;color:#ccc;"><i class="fa fa-github"></i><i class="fa fa-linkedin"></i></div></div></div></div></section>'
  });

  bm.add('newsletter-section', {
    label: 'Newsletter Sign-up', category: 'Sections', attributes: { class: 'fa fa-paper-plane' },
    content: {
      type: 'cs-newsletter', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-newsletter', 'data-nl-btncolor': '#4d114f', 'data-nl-btntext': 'Subscribe', 'data-nl-placeholder': 'Enter your email address' },
      components: '<section style="padding:60px 20px;background:#f0e0f0;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:600px;margin:0 auto;"><h2 style="font-size:1.8em;font-weight:700;color:#333;margin-bottom:12px;">Stay in the loop</h2><p style="color:#777;margin-bottom:30px;">Subscribe to our newsletter for the latest updates and exclusive offers.</p><div style="display:flex;gap:10px;max-width:450px;margin:0 auto;"><input type="email" placeholder="Enter your email address" style="flex:1;padding:12px 18px;border:1px solid #ddd;border-radius:6px;font-size:.95em;outline:none;"><button style="padding:12px 28px;background:#4d114f;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Subscribe</button></div><p style="font-size:.75em;color:#aaa;margin-top:15px;">No spam. Ever. Unsubscribe at any time.</p></div></section>',
      traits: [ { type: 'text', name: 'data-nl-btntext', label: 'Button Text', placeholder: 'Subscribe' }, { type: 'text', name: 'data-nl-placeholder', label: 'Input Placeholder', placeholder: 'Enter your email...' }, { type: 'color', name: 'data-nl-btncolor', label: 'Button Color' } ]
    }
  });

  bm.add('before-after-section', {
    label: 'Before and After', category: 'Sections', attributes: { class: 'fa fa-adjust' },
    content: {
      type: 'cs-before-after',
      tagName: 'section',
      attributes: { 'data-gjs-type': 'cs-before-after', 'data-ba-label-before': 'Before', 'data-ba-label-after': 'After', 'data-ba-accent': '#4d114f', 'data-ba-bg': '#f9f9f9', style: 'padding:70px 20px;background:#f9f9f9;font-family:Helvetica,sans-serif;text-align:center;' },
      components: [ { tagName: 'div', attributes: { style: 'max-width:800px;margin:0 auto;' }, components: [ { tagName: 'h2', attributes: { style: 'font-size:2em;font-weight:700;color:#333;margin-bottom:12px;' }, components: [{ type: 'text', content: 'Before & After' }] }, { tagName: 'p', attributes: { style: 'color:#888;margin-bottom:40px;' }, components: [{ type: 'text', content: 'See the difference our solution makes.' }] }, { tagName: 'div', attributes: { style: 'position:relative;width:100%;height:400px;overflow:hidden;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.12);user-select:none;', id: 'cs-ba-wrap' }, components: [ { tagName: 'div', attributes: { style: 'position:absolute;inset:0;background:url(https://picsum.photos/seed/before/800/400) center/cover;' } }, { tagName: 'div', attributes: { style: 'position:absolute;inset:0;background:url(https://picsum.photos/seed/after/800/400) center/cover;clip-path:inset(0 50% 0 0);', id: 'cs-ba-after' } }, { tagName: 'div', attributes: { style: 'position:absolute;top:0;bottom:0;left:50%;width:3px;background:#4d114f;cursor:ew-resize;z-index:10;transform:translateX(-50%);', id: 'cs-ba-divider' }, components: [{ tagName: 'div', attributes: { style: 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:#4d114f;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.1em;' }, components: [{ type: 'text', content: '\u2194' }] }] }, { tagName: 'span', attributes: { style: 'position:absolute;top:14px;left:16px;background:rgba(0,0,0,.55);color:#fff;font-size:.78em;font-weight:700;padding:4px 12px;border-radius:20px;z-index:5;text-transform:uppercase;letter-spacing:1px;' }, components: [{ type: 'text', content: 'Before' }] }, { tagName: 'span', attributes: { style: 'position:absolute;top:14px;right:16px;background:rgba(77,17,79,.8);color:#fff;font-size:.78em;font-weight:700;padding:4px 12px;border-radius:20px;z-index:5;text-transform:uppercase;letter-spacing:1px;' }, components: [{ type: 'text', content: 'After' }] } ] } ] } ],
      traits: [ { type: 'text', name: 'data-ba-label-before', label: 'Label Links (Before)', changeProp: 0 }, { type: 'text', name: 'data-ba-label-after', label: 'Label Rechts (After)', changeProp: 0 }, { type: 'color', name: 'data-ba-accent', label: 'Divider-Farbe', changeProp: 0 }, { type: 'color', name: 'data-ba-bg', label: 'Hintergrund', changeProp: 0 } ]
    }
  });

  bm.add('steps-section', { label: 'Step-by-Step Prozess', category: 'Sections', attributes: { class: 'fa fa-list-ol' }, content: '<section class="cs-steps"><div class="cs-steps-inner"><h2 class="cs-steps-title">How it works</h2><p class="cs-steps-sub">Get started in three simple steps</p><div class="cs-steps-grid"><div class="cs-step"><div class="cs-step-num">01</div><div class="cs-step-icon">&#128196;</div><h3>Sign Up</h3><p>Create your free account in seconds. No credit card required to get started.</p></div><div class="cs-step-arrow">&#8594;</div><div class="cs-step"><div class="cs-step-num">02</div><div class="cs-step-icon">&#9881;</div><h3>Configure</h3><p>Set up your workspace, invite your team and connect your existing tools.</p></div><div class="cs-step-arrow">&#8594;</div><div class="cs-step"><div class="cs-step-num">03</div><div class="cs-step-icon">&#127881;</div><h3>Launch</h3><p>Go live and start seeing results from day one. We are with you every step of the way.</p></div></div></div></section><style>.cs-steps{padding:80px 20px;background:#fafafa;font-family:Helvetica,sans-serif;text-align:center;}.cs-steps-inner{max-width:900px;margin:0 auto;}.cs-steps-title{font-size:2em;font-weight:700;color:#333;margin-bottom:10px;}.cs-steps-sub{color:#999;margin-bottom:55px;}.cs-steps-grid{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}.cs-step{width:230px;padding:36px 24px;background:#fff;border-radius:12px;box-shadow:0 2px 14px rgba(0,0,0,.07);position:relative;}.cs-step-num{position:absolute;top:-16px;left:50%;transform:translateX(-50%);background:#4d114f;color:#fff;width:32px;height:32px;border-radius:50%;line-height:32px;font-size:.8em;font-weight:700;}.cs-step-icon{font-size:2.4em;margin-bottom:14px;margin-top:8px;}.cs-step h3{font-size:1.05em;font-weight:700;color:#333;margin:0 0 10px;}.cs-step p{font-size:.85em;color:#888;line-height:1.55;margin:0;}.cs-step-arrow{font-size:1.8em;color:#ccc;flex-shrink:0;}@media(max-width:700px){.cs-step-arrow{display:none;}.cs-steps-grid{gap:24px;}}</style>' });

  bm.add('portfolio-section', {
    label: 'Portfolio Grid', category: 'Sections', attributes: { class: 'fa fa-briefcase' },
    content: {
      type: 'cs-portfolio', tagName: 'section',
      attributes: { 'data-gjs-type': 'cs-portfolio', 'data-pf-cols': '3', 'data-pf-accent': '#4d114f', 'data-pf-bg': '#ffffff', 'data-pf-radius': '10px', style: 'padding:80px 20px;background:#ffffff;font-family:Helvetica,sans-serif;text-align:center;' },
      components: [ { tagName: 'div', attributes: { style: 'max-width:1100px;margin:0 auto;' }, components: [ { tagName: 'h2', attributes: { style: 'font-size:2em;font-weight:700;color:#333;margin-bottom:10px;' }, components: [{ type: 'text', content: 'Our Work' }] }, { tagName: 'p', attributes: { style: 'color:#999;margin-bottom:16px;' }, components: [{ type: 'text', content: 'A selection of projects we are proud of.' }] }, { tagName: 'div', attributes: { style: 'display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:36px;' }, components: [ { tagName: 'button', attributes: { onclick: "filterPF(this,'all')", style: 'padding:7px 18px;border:1px solid #ddd;background:#4d114f;color:#fff;border-radius:20px;cursor:pointer;font-size:.85em;font-weight:600;' }, components: [{ type: 'text', content: 'All' }] }, { tagName: 'button', attributes: { onclick: "filterPF(this,'web')", style: 'padding:7px 18px;border:1px solid #ddd;background:#fff;color:#555;border-radius:20px;cursor:pointer;font-size:.85em;' }, components: [{ type: 'text', content: 'Web' }] }, { tagName: 'button', attributes: { onclick: "filterPF(this,'brand')", style: 'padding:7px 18px;border:1px solid #ddd;background:#fff;color:#555;border-radius:20px;cursor:pointer;font-size:.85em;' }, components: [{ type: 'text', content: 'Branding' }] }, { tagName: 'button', attributes: { onclick: "filterPF(this,'photo')", style: 'padding:7px 18px;border:1px solid #ddd;background:#fff;color:#555;border-radius:20px;cursor:pointer;font-size:.85em;' }, components: [{ type: 'text', content: 'Photo' }] } ] }, { tagName: 'div', attributes: { class: 'cs-pf-grid', style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:20px;' }, components: [ { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'web', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf1/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'Project Name' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Web Design' }] }] }] }, { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'brand', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf2/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'Brand Identity' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Branding' }] }] }] }, { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'photo', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf3/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'Photography' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Photo' }] }] }] }, { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'web', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf4/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'App Design' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Web' }] }] }] }, { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'brand', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf5/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'Logo Design' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Branding' }] }] }] }, { tagName: 'div', attributes: { class: 'cs-pf-item', 'data-cat': 'photo', style: 'position:relative;overflow:hidden;border-radius:10px;background:url(https://picsum.photos/seed/pf6/600/400) center/cover;height:240px;cursor:pointer;' }, components: [{ tagName: 'div', attributes: { class: 'cs-pf-ov', style: 'position:absolute;inset:0;background:rgba(77,17,79,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;' }, components: [{ tagName: 'span', attributes: { style: 'color:#fff;font-weight:700;font-size:1.05em;margin-bottom:6px;' }, components: [{ type: 'text', content: 'Studio Shots' }] }, { tagName: 'span', attributes: { style: 'color:rgba(255,255,255,.7);font-size:.82em;' }, components: [{ type: 'text', content: 'Photo' }] }] }] } ] } ] },
      traits: [ { type: 'select', name: 'data-pf-cols', label: 'Columns', options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] }, { type: 'color', name: 'data-pf-accent', label: 'Overlay Color' }, { type: 'color', name: 'data-pf-bg', label: 'Background' }, { type: 'select', name: 'data-pf-radius', label: 'Card Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'10px', name:'Medium' }, { id:'20px', name:'Large' }] } ]
    }
  });

  bm.add('blog-cards-section', { label: 'Blog Post Cards', category: 'Sections', attributes: { class: 'fa fa-newspaper-o' }, content: '<section class="cs-blog"><div class="cs-blog-inner"><h2 class="cs-blog-title">Latest from the Blog</h2><p class="cs-blog-sub">Insights, tips and news from our team</p><div class="cs-blog-grid"><article class="cs-blog-card"><div class="cs-blog-img" style="background:url(https://via.placeholder.com/500x280/78c5d6/fff) center/cover;height:180px"></div><div class="cs-blog-body"><div class="cs-blog-meta"><span class="cs-blog-tag">Design</span><span class="cs-blog-date">March 1, 2025</span></div><h3>10 UI Trends to Watch in 2025</h3><p>Discover what design trends are shaping digital experiences this year.</p><a href="#" class="cs-blog-link">Read more &#8594;</a></div></article><article class="cs-blog-card"><div class="cs-blog-img" style="background:url(https://via.placeholder.com/500x280/4d114f/fff) center/cover;height:180px"></div><div class="cs-blog-body"><div class="cs-blog-meta"><span class="cs-blog-tag">Development</span><span class="cs-blog-date">Feb 18, 2025</span></div><h3>How to Build Scalable APIs</h3><p>A practical guide to designing APIs that grow with your product.</p><a href="#" class="cs-blog-link">Read more &#8594;</a></div></article><article class="cs-blog-card"><div class="cs-blog-img" style="background:url(https://via.placeholder.com/500x280/e868a2/fff) center/cover;height:180px"></div><div class="cs-blog-body"><div class="cs-blog-meta"><span class="cs-blog-tag">Growth</span><span class="cs-blog-date">Feb 5, 2025</span></div><h3>The Content Strategy That Doubled Our Traffic</h3><p>We went from 5k to 10k monthly visitors in 3 months. Here is what we did.</p><a href="#" class="cs-blog-link">Read more &#8594;</a></div></article></div></div></section><style>.cs-blog{padding:80px 20px;background:#fafafa;font-family:Helvetica,sans-serif;text-align:center;}.cs-blog-inner{max-width:1100px;margin:0 auto;}.cs-blog-title{font-size:2em;font-weight:700;color:#333;margin-bottom:10px;}.cs-blog-sub{color:#999;margin-bottom:50px;}.cs-blog-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:28px;}.cs-blog-card{width:320px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,.07);text-align:left;transition:transform .3s;}.cs-blog-card:hover{transform:translateY(-5px);}.cs-blog-body{padding:22px;}.cs-blog-meta{display:flex;align-items:center;gap:10px;margin-bottom:12px;}.cs-blog-tag{background:#f0e0f0;color:#4d114f;font-size:.73em;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:1px;}.cs-blog-date{font-size:.78em;color:#bbb;}.cs-blog-card h3{font-size:1em;font-weight:700;color:#333;margin:0 0 10px;line-height:1.4;}.cs-blog-card p{font-size:.85em;color:#888;line-height:1.55;margin-bottom:16px;}.cs-blog-link{font-size:.85em;font-weight:700;color:#4d114f;text-decoration:none;}</style>' });

  bm.add('cookie-banner', {
    label: 'Cookie Banner', category: 'Sections', attributes: { class: 'fa fa-shield' },
    content: {
      type: 'cs-cookie', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-cookie', 'data-cookie-text': 'We use cookies to improve your experience.', 'data-cookie-accept': 'Accept All', 'data-cookie-decline': 'Decline', 'data-cookie-policy': '#' },
      components: '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9998;padding:16px 24px;background:#1e1e2e;color:#e0e0e0;font-family:Helvetica,sans-serif;font-size:.88em;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;box-shadow:0 -4px 20px rgba(0,0,0,.2);" id="cs-cookie-banner"><div style="display:flex;align-items:flex-start;gap:14px;flex:1;min-width:220px;"><span style="font-size:1.6em;flex-shrink:0;">&#127850;</span><div><strong style="display:block;margin-bottom:4px;color:#fff;">We use cookies</strong><p style="margin:0;line-height:1.5;opacity:.8;">We use cookies to improve your experience. By continuing to browse, you agree to our <a href="#" style="color:#a0449e;text-decoration:underline;">Cookie Policy</a>.</p></div></div><div style="display:flex;gap:10px;flex-shrink:0;"><button onclick="document.getElementById(\'cs-cookie-banner\').style.display=\'none\'" style="padding:9px 20px;background:transparent;color:#e0e0e0;border:1px solid rgba(255,255,255,.25);border-radius:5px;cursor:pointer;font-size:.88em;font-weight:600;">Decline</button><button onclick="document.getElementById(\'cs-cookie-banner\').style.display=\'none\'" style="padding:9px 20px;background:#4d114f;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:.88em;font-weight:700;">Accept All</button></div></div>',
      traits: [ { type: 'text', name: 'data-cookie-text', label: 'Banner Text' }, { type: 'text', name: 'data-cookie-accept', label: 'Accept Button' }, { type: 'text', name: 'data-cookie-decline', label: 'Decline Button' }, { type: 'text', name: 'data-cookie-policy', label: 'Policy URL' } ]
    }
  });

  bm.add('sticky-header', {
    label: 'Nav / Mega Menu (Responsive)', category: 'Sections', attributes: { class: 'fa fa-navicon' },
    content: {
      type: 'cs-navbar', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-navbar', 'data-nav-logo': '&#9632; MyBrand', 'data-nav-bg': '#ffffff', 'data-nav-linkcolor': '#555555' },
      components: '<header style="position:sticky;top:0;z-index:9999;background:#ffffff;border-bottom:1px solid #eeeeee;box-shadow:0 2px 12px rgba(0,0,0,.07);font-family:Helvetica,sans-serif;"><div style="max-width:1200px;margin:0 auto;display:flex;align-items:center;padding:0 24px;height:64px;gap:24px;"><a href="#" style="font-size:1.2em;font-weight:800;color:#4d114f;text-decoration:none;flex-shrink:0;">&#9632; MyBrand</a><nav id="cs-nav-desktop" style="display:flex;align-items:center;gap:4px;flex:1;"><div style="position:relative;" class="cs-has-mega"><a href="#" style="display:block;padding:8px 14px;color:#555555;text-decoration:none;font-size:.9em;font-weight:600;border-radius:5px;transition:color .2s,background .2s;">Products &#9662;</a><div class="cs-mega" style="position:absolute;top:calc(100% + 10px);left:0;background:#ffffff;border:1px solid #eeeeee;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.12);padding:24px;display:none;gap:24px;min-width:480px;"><div style="flex:1;"><div style="font-size:.72em;text-transform:uppercase;letter-spacing:2px;color:#aaaaaa;font-weight:700;margin-bottom:12px;">Core Features</div><a href="#" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;text-decoration:none;margin-bottom:2px;transition:background .15s;"><span style="font-size:1.4em;width:36px;text-align:center;">&#9889;</span><span><strong style="display:block;color:#333333;font-size:.88em;">Performance</strong><small style="color:#aaaaaa;font-size:.78em;">Speed up your workflow</small></span></a><a href="#" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;text-decoration:none;transition:background .15s;"><span style="font-size:1.4em;width:36px;text-align:center;">&#127912;</span><span><strong style="display:block;color:#333333;font-size:.88em;">Design Tools</strong><small style="color:#aaaaaa;font-size:.78em;">Build beautiful interfaces</small></span></a></div><div style="flex:1;"><div style="font-size:.72em;text-transform:uppercase;letter-spacing:2px;color:#aaaaaa;font-weight:700;margin-bottom:12px;">Integrations</div><a href="#" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;text-decoration:none;margin-bottom:2px;transition:background .15s;"><span style="font-size:1.4em;width:36px;text-align:center;">&#128279;</span><span><strong style="display:block;color:#333333;font-size:.88em;">API Access</strong><small style="color:#aaaaaa;font-size:.78em;">Connect any tool</small></span></a><a href="#" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;text-decoration:none;transition:background .15s;"><span style="font-size:1.4em;width:36px;text-align:center;">&#9729;</span><span><strong style="display:block;color:#333333;font-size:.88em;">Cloud Sync</strong><small style="color:#aaaaaa;font-size:.78em;">Always up to date</small></span></a></div></div></div><a href="#" style="display:block;padding:8px 14px;color:#555555;text-decoration:none;font-size:.9em;font-weight:600;border-radius:5px;">Pricing</a><a href="#" style="display:block;padding:8px 14px;color:#555555;text-decoration:none;font-size:.9em;font-weight:600;border-radius:5px;">About</a><a href="#" style="display:block;padding:8px 14px;color:#555555;text-decoration:none;font-size:.9em;font-weight:600;border-radius:5px;">Blog</a></nav><div id="cs-nav-cta" style="display:flex;align-items:center;gap:10px;flex-shrink:0;"><a href="#" style="padding:8px 16px;color:#555555;text-decoration:none;font-size:.88em;font-weight:600;">Log in</a><a href="#" style="padding:9px 20px;background:#4d114f;color:#ffffff;text-decoration:none;font-size:.88em;font-weight:700;border-radius:6px;">Get Started</a></div><button id="cs-burger" onclick="(function(b){var m=document.getElementById(\'cs-mob\');var o=m.style.display===\'block\';m.style.display=o?\'none\':\'block\';b.innerHTML=o?\'&#9776;\':\'&#10005;\';})(this)" style="display:none;background:none;border:none;font-size:1.5em;cursor:pointer;color:#4d114f;padding:4px 8px;line-height:1;flex-shrink:0;">&#9776;</button></div><nav id="cs-mob" style="display:none;background:#ffffff;border-top:1px solid #f0e0f0;"><a href="#" style="display:block;padding:14px 24px;color:#444444;text-decoration:none;font-size:.95em;font-weight:500;border-bottom:1px solid #f5f5f5;">Home</a><a href="#" style="display:block;padding:14px 24px;color:#444444;text-decoration:none;font-size:.95em;font-weight:500;border-bottom:1px solid #f5f5f5;">Products</a><a href="#" style="display:block;padding:14px 24px;color:#444444;text-decoration:none;font-size:.95em;font-weight:500;border-bottom:1px solid #f5f5f5;">Pricing</a><a href="#" style="display:block;padding:14px 24px;color:#444444;text-decoration:none;font-size:.95em;font-weight:500;border-bottom:1px solid #f5f5f5;">About</a><a href="#" style="display:block;padding:14px 24px;color:#444444;text-decoration:none;font-size:.95em;font-weight:500;border-bottom:1px solid #f5f5f5;">Blog</a><div style="padding:14px 24px;"><a href="#" style="display:block;padding:12px;background:#4d114f;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:700;text-align:center;">Get Started</a></div></nav></header><style>.cs-has-mega:hover .cs-mega{display:flex!important;}#cs-mob a:hover{background:#f8f0fa;color:#4d114f;}@media(max-width:768px){#cs-nav-desktop{display:none!important;}#cs-nav-cta{display:none!important;}#cs-burger{display:block!important;}}</style>',
      traits: [ { type: 'text', name: 'data-nav-logo', label: 'Logo Text', placeholder: 'MyBrand' }, { type: 'color', name: 'data-nav-bg', label: 'Nav Background' }, { type: 'color', name: 'data-nav-linkcolor', label: 'Link Color' }, { type: 'select', name: 'data-nav-pos', label: 'Position', options: [{ id: 'sticky', name: 'Sticky (scrolls with page)' }, { id: 'fixed', name: 'Fixed (always visible)' }, { id: 'relative', name: 'Static' }] } ]
    }
  });

  bm.add('error-404-section', { label: '404 Error Page', category: 'Sections', attributes: { class: 'fa fa-exclamation-triangle' }, content: '<section class="cs-404"><div class="cs-404-inner"><div class="cs-404-number">404</div><h1 class="cs-404-title">Oops! Page not found</h1><p class="cs-404-sub">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p><div class="cs-404-actions"><a href="#" class="cs-404-home">&#8592; Go back home</a><a href="#" class="cs-404-contact">Contact support</a></div><div class="cs-404-links"><p>Or try one of these:</p><div class="cs-404-quicklinks"><a href="#">Home</a><a href="#">Features</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Contact</a></div></div></div></section><style>.cs-404{min-height:500px;padding:80px 20px;background:linear-gradient(135deg,#faf0fa,#f0e8f5);font-family:Helvetica,sans-serif;text-align:center;display:flex;align-items:center;justify-content:center;}.cs-404-inner{max-width:560px;margin:0 auto;}.cs-404-number{font-size:9em;font-weight:900;color:#4d114f;opacity:.12;line-height:1;margin-bottom:-30px;letter-spacing:-8px;}.cs-404-title{font-size:1.9em;font-weight:700;color:#333;margin-bottom:14px;}.cs-404-sub{font-size:.95em;color:#888;line-height:1.6;margin-bottom:36px;}.cs-404-actions{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:40px;}.cs-404-home{padding:12px 28px;background:#4d114f;color:#fff;border-radius:6px;text-decoration:none;font-weight:700;font-size:.9em;}.cs-404-home:hover{background:#a0449e;}.cs-404-contact{padding:12px 28px;background:#fff;color:#4d114f;border:2px solid #4d114f;border-radius:6px;text-decoration:none;font-weight:700;font-size:.9em;}.cs-404-links p{font-size:.82em;color:#bbb;margin-bottom:12px;}.cs-404-quicklinks{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;}.cs-404-quicklinks a{font-size:.85em;color:#a0449e;text-decoration:none;font-weight:600;}</style>' });

  bm.add('accordion-section', { label: 'Accordion', category: 'Sections', attributes: { class: 'fa fa-list' }, content: '<div class="cs-acc"><h2 class="cs-acc-title">Accordion</h2><div class="cs-acc-item"><div class="cs-acc-head" onclick="var b=this.nextElementSibling;var o=b.style.display===\'block\';document.querySelectorAll(\'.cs-acc-body\').forEach(function(x){x.style.display=\'none\';});document.querySelectorAll(\'.cs-acc-head\').forEach(function(x){x.classList.remove(\'cs-acc-open\');});if(!o){b.style.display=\'block\';this.classList.add(\'cs-acc-open\');}">Section One<span class="cs-acc-icon">+</span></div><div class="cs-acc-body" style="display:none"><p>This is the content for section one. Click the heading again to collapse it.</p></div></div><div class="cs-acc-item"><div class="cs-acc-head" onclick="var b=this.nextElementSibling;var o=b.style.display===\'block\';document.querySelectorAll(\'.cs-acc-body\').forEach(function(x){x.style.display=\'none\';});document.querySelectorAll(\'.cs-acc-head\').forEach(function(x){x.classList.remove(\'cs-acc-open\');});if(!o){b.style.display=\'block\';this.classList.add(\'cs-acc-open\');}">Section Two<span class="cs-acc-icon">+</span></div><div class="cs-acc-body" style="display:none"><p>This is the content for section two. You can put any HTML content in here including images and lists.</p></div></div><div class="cs-acc-item"><div class="cs-acc-head" onclick="var b=this.nextElementSibling;var o=b.style.display===\'block\';document.querySelectorAll(\'.cs-acc-body\').forEach(function(x){x.style.display=\'none\';});document.querySelectorAll(\'.cs-acc-head\').forEach(function(x){x.classList.remove(\'cs-acc-open\');});if(!o){b.style.display=\'block\';this.classList.add(\'cs-acc-open\');}">Section Three<span class="cs-acc-icon">+</span></div><div class="cs-acc-body" style="display:none"><p>This is the content for section three. Accordion components are great for FAQs and long content.</p></div></div></div><style>.cs-acc{max-width:700px;margin:40px auto;font-family:Helvetica,sans-serif;padding:0 20px;}.cs-acc-title{font-size:1.6em;font-weight:700;color:#333;margin-bottom:20px;}.cs-acc-item{border:1px solid #e0e0e0;border-radius:6px;margin-bottom:8px;overflow:hidden;}.cs-acc-head{padding:16px 20px;background:#fafafa;cursor:pointer;font-weight:600;color:#333;display:flex;justify-content:space-between;align-items:center;user-select:none;transition:background .2s;}.cs-acc-head:hover,.cs-acc-open{background:#f0e0f0;color:#4d114f;}.cs-acc-icon{font-size:1.3em;font-weight:300;color:#a0449e;}.cs-acc-body{padding:16px 20px;font-size:.92em;color:#666;line-height:1.6;background:#fff;}</style>' });

  bm.add('split-screen', { label: 'Split Screen', category: 'Sections', attributes: { class: 'fa fa-columns' }, content: '<section class="cs-split"><div class="cs-split-left"><div class="cs-split-content"><span class="cs-split-tag">New Feature</span><h2>A powerful headline that explains your value</h2><p>Add your supporting text here. This layout works great for feature announcements, product showcases or about sections.</p><a href="#" class="cs-split-btn">Learn More</a></div></div><div class="cs-split-right"><div class="cs-split-img" style="background:url(https://via.placeholder.com/800x600/4d114f/fff?text=Image) center/cover no-repeat;min-height:400px"></div></div></section><style>.cs-split{display:flex;flex-wrap:wrap;min-height:420px;font-family:Helvetica,sans-serif;}.cs-split-left{flex:1;min-width:280px;background:#fff;display:flex;align-items:center;padding:60px 48px;}.cs-split-content{max-width:420px;}.cs-split-tag{display:inline-block;background:#f0e0f0;color:#4d114f;font-size:.75em;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:4px 12px;border-radius:20px;margin-bottom:18px;}.cs-split-content h2{font-size:1.9em;font-weight:700;color:#333;margin:0 0 16px;line-height:1.25;}.cs-split-content p{font-size:.95em;color:#777;line-height:1.6;margin-bottom:28px;}.cs-split-btn{display:inline-block;padding:12px 28px;background:#4d114f;color:#fff;border-radius:5px;text-decoration:none;font-weight:700;font-size:.9em;transition:background .2s;}.cs-split-btn:hover{background:#a0449e;}.cs-split-right{flex:1;min-width:280px;}@media(max-width:600px){.cs-split-left{padding:40px 24px;}}</style>' });

  bm.add('announcement-bar', { label: 'Announcement Bar', category: 'Sections', attributes: { class: 'fa fa-bullhorn' }, content: '<div style="display:flex;align-items:center;justify-content:center;gap:12px;padding:10px 20px;background:linear-gradient(90deg,#4d114f,#a0449e);color:#fff;font-family:Helvetica,sans-serif;font-size:.88em;position:relative;flex-wrap:wrap;"><span style="background:rgba(255,255,255,.25);padding:2px 10px;border-radius:20px;font-weight:700;font-size:.82em;text-transform:uppercase;">NEW</span><span>We just launched version 2.0 with exciting new features!</span><a href="#" style="color:#fff;font-weight:700;text-decoration:underline;">Read more &#8594;</a><button onclick="this.parentNode.style.display=\'none\'" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,.7);font-size:1em;cursor:pointer;">&#10005;</button></div>' });

  bm.add('social-proof-bar', { label: 'Social Proof Bar', category: 'Sections', attributes: { class: 'fa fa-star' }, content: '<section style="padding:30px 20px;background:#fafafa;border-top:1px solid #eee;border-bottom:1px solid #eee;font-family:Helvetica,sans-serif;"><div style="max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;"><div style="text-align:center;padding:10px 40px;"><div style="color:#f5a623;font-size:1.1em;margin-bottom:4px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div style="font-size:1.4em;font-weight:800;color:#333;">4.9/5</div><div style="font-size:.78em;color:#999;text-transform:uppercase;letter-spacing:1px;">on Trustpilot</div></div><div style="width:1px;height:50px;background:#e0e0e0;"></div><div style="text-align:center;padding:10px 40px;"><div style="font-size:1.6em;font-weight:800;color:#4d114f;">10,000+</div><div style="font-size:.78em;color:#999;text-transform:uppercase;letter-spacing:1px;">Happy Customers</div></div><div style="width:1px;height:50px;background:#e0e0e0;"></div><div style="text-align:center;padding:10px 40px;"><div style="color:#f5a623;font-size:1.1em;margin-bottom:4px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div><div style="font-size:1.4em;font-weight:800;color:#333;">4.8/5</div><div style="font-size:.78em;color:#999;text-transform:uppercase;letter-spacing:1px;">on G2 Crowd</div></div></div></section>' });

  bm.add('app-download-section', { label: 'App Download Section', category: 'Sections', attributes: { class: 'fa fa-mobile' }, content: '<section class="cs-appd"><div class="cs-appd-inner"><div class="cs-appd-text"><h2>Take it with you</h2><p>Download our app and get access to all features on the go. Available for iOS and Android.</p><div class="cs-appd-btns"><a href="#" class="cs-appd-btn"><span class="cs-appd-btn-icon">&#63743;</span><span><small>Download on the</small><strong>App Store</strong></span></a><a href="#" class="cs-appd-btn"><span class="cs-appd-btn-icon">&#9654;</span><span><small>Get it on</small><strong>Google Play</strong></span></a></div><div class="cs-appd-note">Free download. No credit card required.</div></div><div class="cs-appd-img"><div style="width:200px;height:380px;background:linear-gradient(135deg,#4d114f,#a0449e);border-radius:30px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.3);font-size:.85em;box-shadow:0 20px 60px rgba(77,17,79,.3);">App Screenshot</div></div></div></section><style>.cs-appd{padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;}.cs-appd-inner{max-width:900px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:50px;flex-wrap:wrap;}.cs-appd-text{flex:1;min-width:260px;}.cs-appd-text h2{font-size:2em;font-weight:700;color:#333;margin-bottom:14px;}.cs-appd-text p{font-size:.95em;color:#777;line-height:1.6;margin-bottom:32px;}.cs-appd-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:16px;}.cs-appd-btn{display:flex;align-items:center;gap:12px;padding:12px 22px;background:#1a1a1a;color:#fff;border-radius:10px;text-decoration:none;transition:background .2s;}.cs-appd-btn:hover{background:#333;}.cs-appd-btn-icon{font-size:1.8em;}.cs-appd-btn small{display:block;font-size:.7em;opacity:.7;}.cs-appd-btn strong{display:block;font-size:.95em;}.cs-appd-note{font-size:.78em;color:#bbb;}.cs-appd-img{display:flex;justify-content:center;}</style>' });

  bm.add('testimonial-single', { label: 'Testimonial', category: 'Sections', attributes: { class: 'fa fa-quote-left' }, content: '<div style="padding:60px 20px;background:#f8f0fa;font-family:Helvetica,sans-serif;"><div style="max-width:680px;margin:0 auto;background:#fff;border-radius:16px;padding:44px 48px;box-shadow:0 4px 30px rgba(77,17,79,.1);"><div style="font-size:5em;line-height:.8;color:#e8d0f0;font-family:Georgia,serif;margin-bottom:8px;">&#10075;</div><p style="font-size:1.05em;color:#444;line-height:1.75;font-style:italic;margin:0 0 32px;">This product completely transformed the way our team works. Outstanding quality and support.</p><div style="display:flex;align-items:center;gap:16px;"><img src="https://i.pravatar.cc/80?img=47" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:3px solid #f0d8f8;"><div><strong style="display:block;font-size:.95em;color:#333;">Sarah Johnson</strong><span style="display:block;font-size:.82em;color:#a0449e;margin-top:2px;">CEO, Acme Corporation</span><div style="color:#f5a623;font-size:.95em;letter-spacing:2px;margin-top:4px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div></div></div></div></div>' });

  // Trait Handlers
  editor.on('component:add', function(model) {
    if (!model || typeof model.getAttributes !== 'function') return;
    var attrs = model.getAttributes();
    if (!('data-hero-bg' in attrs) && !('data-hero-fullheight' in attrs)) return;

    var bgMap = { gradient:'linear-gradient(135deg,#4d114f,#a0449e)', dark:'#1a1a2e', light:'#f8f0fa', white:'#ffffff' };
    var clMap = { gradient:'#ffffff', dark:'#ffffff', light:'#333333', white:'#333333' };

    function getSectionModel() {
      if (model.components) {
        var found = model.components().find(function(c) { return c.get('tagName') === 'section'; });
        if (found) return found;
      }
      return model;
    }

    model.on('change:attributes', function(m) {
      var changed = m.changed && m.changed.attributes ? m.changed.attributes : {};
      var a = model.getAttributes();
      var target = getSectionModel();

      if ('data-hero-bg' in changed) {
        var bg = a['data-hero-bg'] || 'gradient';
        target.addStyle({ 'background': bgMap[bg] || bgMap.gradient, 'color': clMap[bg] || '#ffffff' });
      }

      if ('data-hero-fullheight' in changed) {
        var fh = a['data-hero-fullheight'] === '1';
        target.addStyle({ 'min-height': fh ? '100vh' : 'auto', 'display': fh ? 'flex' : 'block', 'align-items': fh ? 'center' : '' });
      }

      if ('data-hero-align' in changed) {
        target.addStyle({ 'text-align': a['data-hero-align'] || 'center' });
      }
    });
  });

  editor.on('component:add', function(model) {
    if (!model || typeof model.getAttributes !== 'function') return;
    var attrs = model.getAttributes();

    function child(tag) {
      var found = null;
      if (model.components) {
          model.components().each(function(c) {
            if (!found && c.get('tagName') === tag) found = c;
          });
      }
      return found || model;
    }

    // NAVBAR
    if ('data-nav-bg' in attrs || 'data-nav-logo' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var header = child('header');
        if ('data-nav-bg' in changed) {
          header.addStyle({ 'background': a['data-nav-bg'] || '#ffffff' });
        }
        if ('data-nav-linkcolor' in changed) {
          var color = a['data-nav-linkcolor'] || '#555555';
          if (header.components) {
              header.components().each(function(c) {
                if (c.get('tagName') === 'a') c.addStyle({ 'color': color });
              });
          }
        }
        if ('data-nav-pos' in changed) {
          header.addStyle({ 'position': a['data-nav-pos'] || 'sticky' });
        }
        if ('data-nav-logo' in changed) {
          var logoLink = null;
          if (header.components) {
              header.components().find(function(c) {
                if (c.get('tagName') === 'div') {
                  if (c.components) {
                      c.components().each(function(cc) {
                        if (cc.get('tagName') === 'a' && !logoLink) logoLink = cc;
                      });
                  }
                }
              });
          }
          if (logoLink) logoLink.components().reset([{ type: 'text', content: a['data-nav-logo'] }]);
        }
      });
    }

    // FAQ
    if ('data-faq-accent' in attrs || 'data-faq-bg' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-faq-bg' in changed) {
          section.addStyle({ 'background': a['data-faq-bg'] || '#f9f9f9' });
        }
        if ('data-faq-accent' in changed) {
          var el = section.getEl && section.getEl();
          if (el) {
            var spans = el.querySelectorAll('span[style*="color"]');
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.color = a['data-faq-accent'];
            }
          }
        }
      });
    }

    // NEWSLETTER
    if ('data-nl-btncolor' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        if ('data-nl-btncolor' in changed) {
          function findBtn(cm) {
            if (cm.components) {
                cm.components().each(function(c) {
                  if (c.get('tagName') === 'button') c.addStyle({ 'background': a['data-nl-btncolor'] });
                  else findBtn(c);
                });
            }
          }
          findBtn(model);
        }
        if ('data-nl-btntext' in changed || 'data-nl-placeholder' in changed) {
          var el = model.getEl && model.getEl();
          if (el) {
            if ('data-nl-btntext' in changed) {
              var btn = el.querySelector('button');
              if (btn) btn.textContent = a['data-nl-btntext'] || 'Subscribe';
            }
            if ('data-nl-placeholder' in changed) {
              var inp = el.querySelector('input[type="email"]');
              if (inp) inp.placeholder = a['data-nl-placeholder'] || 'Enter your email address';
            }
          }
        }
      });
    }

    // COOKIE BANNER
    if ('data-cookie-text' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var el = model.getEl && model.getEl();
        if (!el) return;
        if ('data-cookie-text' in changed) {
          var p = el.querySelector('p');
          if (p && p.firstChild) p.firstChild.textContent = a['data-cookie-text'] + ' ';
        }
        if ('data-cookie-accept' in changed) {
          var btns = el.querySelectorAll('button');
          if (btns[1]) btns[1].textContent = a['data-cookie-accept'] || 'Accept All';
        }
        if ('data-cookie-decline' in changed) {
          var btns2 = el.querySelectorAll('button');
          if (btns2[0]) btns2[0].textContent = a['data-cookie-decline'] || 'Decline';
        }
        if ('data-cookie-policy' in changed) {
          var link = el.querySelector('a');
          if (link) link.href = a['data-cookie-policy'] || '#';
        }
      });
    }

    // MAP EMBED
    if ('data-map-url' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var el = model.getEl && model.getEl();
        if (!el) return;
        if ('data-map-url' in changed) {
          var iframe = el.querySelector('iframe');
          if (iframe) iframe.src = a['data-map-url'];
        }
        if ('data-map-address' in changed) {
          var addrEl = el.querySelector('p strong + br');
          if (addrEl && addrEl.parentNode) addrEl.parentNode.childNodes[2].textContent = a['data-map-address'] || '';
        }
        if ('data-map-phone' in changed) {
          var ps = el.querySelectorAll('p');
          for (var i = 0; i < ps.length; i++) {
              if (ps[i].innerHTML.indexOf('Phone') !== -1) {
                  var t = ps[i].querySelectorAll('br');
                  if (t[0] && t[0].nextSibling) t[0].nextSibling.textContent = a['data-map-phone'] || '';
              }
          }
        }
        if ('data-map-sidecolor' in changed) {
          var sidebar = el.querySelector('div[style*="flex-shrink:0"]');
          if (sidebar) sidebar.style.background = a['data-map-sidecolor'] || '#4d114f';
        }
      });
    }

    // BEFORE / AFTER
    if ('data-ba-accent' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-ba-bg' in changed) {
          section.addStyle({ 'background': a['data-ba-bg'] || '#f9f9f9' });
        }
        var el = section.getEl && section.getEl();
        if (!el) return;
        if ('data-ba-accent' in changed) {
          var color = a['data-ba-accent'] || '#4d114f';
          var divider = el.querySelector('#cs-ba-divider');
          var dot     = divider ? divider.querySelector('div') : null;
          if (divider) divider.style.background = color;
          if (dot)     dot.style.background = color;
        }
        if ('data-ba-label-before' in changed) {
          var spans = el.querySelectorAll('span[style*="position:absolute"]');
          if (spans[0]) spans[0].textContent = a['data-ba-label-before'] || 'Before';
        }
        if ('data-ba-label-after' in changed) {
          var spans2 = el.querySelectorAll('span[style*="position:absolute"]');
          if (spans2[1]) spans2[1].textContent = a['data-ba-label-after'] || 'After';
        }
      });
    }

    // PORTFOLIO
    if ('data-pf-accent' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-pf-bg' in changed) {
          section.addStyle({ 'background': a['data-pf-bg'] || '#ffffff' });
        }
        var el = section.getEl && section.getEl();
        if (!el) return;
        if ('data-pf-cols' in changed) {
          var grid = el.querySelector('.cs-pf-grid');
          if (grid) grid.style.gridTemplateColumns = 'repeat(' + (a['data-pf-cols'] || '3') + ',1fr)';
        }
        if ('data-pf-accent' in changed) {
          var color = a['data-pf-accent'] || '#4d114f';
          var ovs = el.querySelectorAll('.cs-pf-ov');
          for (var i = 0; i < ovs.length; i++) {
              ovs[i].style.background = color.replace('#', 'rgba(') + ',0.82)';
          }
          var btns = el.querySelectorAll('button[onclick*=filterPF]');
          for (var j = 0; j < btns.length; j++) {
              if (btns[j].style.background !== 'rgb(255, 255, 255)') btns[j].style.background = color;
          }
        }
        if ('data-pf-radius' in changed) {
          var items = el.querySelectorAll('.cs-pf-item');
          for (var k = 0; k < items.length; k++) {
              items[k].style.borderRadius = a['data-pf-radius'] || '10px';
          }
        }
      });
    }

    // PRICING TABLE
    if ('data-pricing-currency' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-pricing-color' in changed) {
          section.addStyle({ '--pricing-color': a['data-pricing-color'] });
          function walkPricing(cm) {
            if (cm.components) {
                cm.components().each(function(c) {
                  var st = c.getStyle ? c.getStyle() : {};
                  if (st['background'] && st['background'].indexOf('#4d114f') !== -1) {
                    c.addStyle({ 'background': a['data-pricing-color'] });
                  }
                  walkPricing(c);
                });
            }
          }
          walkPricing(section);
        }
        if ('data-pricing-currency' in changed) {
          var sym = a['data-pricing-currency'] || '$';
          function walkCurrency(cm) {
            if (cm.components) {
                cm.components().each(function(c) {
                  var el = c.getEl && c.getEl();
                  if (el && el.classList && el.classList.contains('cs-price')) {
                    var txt = el.innerHTML;
                    el.innerHTML = txt.replace(/^[$€£¥]/, sym);
                  }
                  walkCurrency(c);
                });
            }
          }
          walkCurrency(section);
        }
      });
    }
  });
});
