grapesjs.plugins.add('gjs-media', function(editor, opts) {
  var bm = editor.BlockManager;
  var domt = editor.DomComponents;

  // -- Helper: find descendant by class --
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

  // Register Types
  domt.addType('cs-video-hero', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-video-hero') || (el.hasAttribute && el.hasAttribute('data-vh-url')) ? { type: 'cs-video-hero' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'select', name: 'data-vh-type', label: 'Video Type', options: [{ id:'mp4', name:'MP4 File' }, { id:'youtube', name:'YouTube' }, { id:'vimeo', name:'Vimeo' }] },
      { type: 'text',   name: 'data-vh-url',     label: 'Video URL (.mp4)' },
      { type: 'text',   name: 'data-vh-id',      label: 'YouTube/Vimeo ID' },
      { type: 'checkbox', name: 'data-vh-autoplay', label: 'Autoplay', valueTrue: '1', valueFalse: '0' },
      { type: 'checkbox', name: 'data-vh-loop',     label: 'Loop',     valueTrue: '1', valueFalse: '0' },
      { type: 'select', name: 'data-vh-height',  label: 'Height', options: [{ id:'400px', name:'400px' }, { id:'500px', name:'500px' }, { id:'600px', name:'600px' }, { id:'100vh', name:'Full Screen (100vh)' }] },
      { type: 'select', name: 'data-vh-overlay', label: 'Overlay Opacity', options: [{ id:'0', name:'None' }, { id:'0.3', name:'Light 30%' }, { id:'0.5', name:'Medium 50%' }, { id:'0.7', name:'Dark 70%' }, { id:'0.85', name:'Very Dark 85%' }] },
      { type: 'color',  name: 'data-vh-ovcolor', label: 'Overlay Color' },
      { type: 'select', name: 'data-vh-align',   label: 'Text Align', options: [{ id:'center', name:'Center' }, { id:'left', name:'Left' }, { id:'right', name:'Right' }] },
    ] } },
  });

  domt.addType('cs-video-embed', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-video-embed') || (el.hasAttribute && el.hasAttribute('data-vid-url')) ? { type: 'cs-video-embed' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text',     name: 'data-vid-url',      label: 'Embed URL' },
      { type: 'checkbox', name: 'data-vid-autoplay', label: 'Autoplay', valueTrue: '1', valueFalse: '0' },
      { type: 'checkbox', name: 'data-vid-loop',     label: 'Loop',     valueTrue: '1', valueFalse: '0' },
    ] } },
  });

  domt.addType('cs-image-gallery', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-image-gallery') || (el.hasAttribute && el.hasAttribute('data-gal-cols')) ? { type: 'cs-image-gallery' } : undefined; },
    model: { defaults: { tagName: 'section', traits: [
      { type: 'select', name: 'data-gal-cols',   label: 'Columns', options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
      { type: 'select', name: 'data-gal-gap',    label: 'Gap', options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'color',  name: 'data-gal-bg',     label: 'Background' },
      { type: 'select', name: 'data-gal-radius', label: 'Image Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-image-masonry', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-image-masonry') || (el.hasAttribute && el.hasAttribute('data-mas-bg')) ? { type: 'cs-image-masonry' } : undefined; },
    model: { defaults: { tagName: 'section', traits: [
      { type: 'color',  name: 'data-mas-bg',     label: 'Background' },
      { type: 'select', name: 'data-mas-gap',    label: 'Gap', options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'select', name: 'data-mas-radius', label: 'Image Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-lightbox', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-lightbox') || (el.hasAttribute && el.hasAttribute('data-lb-cols')) ? { type: 'cs-lightbox' } : undefined; },
    model: { defaults: { tagName: 'section', traits: [
      { type: 'select', name: 'data-lb-cols',   label: 'Columns', options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
      { type: 'color',  name: 'data-lb-bg',     label: 'Background' },
      { type: 'select', name: 'data-lb-gap',    label: 'Gap', options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'select', name: 'data-lb-radius', label: 'Image Radius', options: [{ id:'0px', name:'None' }, { id:'8px', name:'Small' }, { id:'16px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-audio-player', {
    isComponent: function(el) { return (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-audio-player') || (el.hasAttribute && el.hasAttribute('data-aud-title')) ? { type: 'cs-audio-player' } : undefined; },
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text',  name: 'data-aud-title',  label: 'Track Title' },
      { type: 'text',  name: 'data-aud-artist', label: 'Artist Name' },
      { type: 'color', name: 'data-aud-accent', label: 'Accent Color' },
      { type: 'color', name: 'data-aud-bg',     label: 'Player Background' },
    ] } },
  });

  // Add Blocks
  bm.add('video-hero', {
    label: 'Video Hero', category: 'Media', attributes: { class: 'fa fa-play-circle-o' },
    content: {
      type: 'cs-video-hero',
      attributes: { 'data-gjs-type': 'cs-video-hero', 'data-vh-type': 'mp4', 'data-vh-url': 'https://www.w3schools.com/html/mov_bbb.mp4', 'data-vh-autoplay': '1', 'data-vh-loop': '1', 'data-vh-height': '500px', 'data-vh-overlay': '0.5', 'data-vh-ovcolor': '#000000', 'data-vh-align': 'center' },
      components: '<section style="position:relative;height:500px;display:flex;align-items:center;justify-content:center;color:#fff;overflow:hidden;font-family:Helvetica,sans-serif;"><div class="cs-video-container" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;overflow:hidden;"><video autoplay loop muted playsinline style="position:absolute;top:50%;left:50%;min-width:100%;min-height:100%;transform:translate(-50%,-50%);object-fit:cover;"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video></div><div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:1;"></div><div style="position:relative;z-index:2;max-width:800px;padding:20px;text-align:center;"><h1>Amazing Video Header</h1><p>Engage your visitors with stunning full-screen video backgrounds.</p></div></section>'
    }
  });

  bm.add('image-gallery', {
    label: 'Image Gallery', category: 'Media', attributes: { class: 'fa fa-th' },
    content: {
      type: 'cs-image-gallery',
      attributes: {
        'data-gjs-type': 'cs-image-gallery',
        'data-gal-cols':   '3',
        'data-gal-gap':    '12px',
        'data-gal-bg':     '#ffffff',
        'data-gal-radius': '6px',
        style: 'padding:80px 20px;background:#ffffff;font-family:Helvetica,sans-serif;text-align:center;',
      },
      components: [
        { tagName: 'div', attributes: { style: 'max-width:1100px;margin:0 auto;' },
          components: [
            { tagName: 'h2', attributes: { style: 'font-size:2em;font-weight:700;color:#333;margin-bottom:45px;' }, components: [{ type: 'text', content: 'Our Gallery' }] },
            { tagName: 'div', attributes: { class: 'cs-gal-grid', style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;' },
              components: [
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal1/600/450) center/cover;border-radius:6px;' } },
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal2/600/450) center/cover;border-radius:6px;' } },
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal3/600/450) center/cover;border-radius:6px;' } },
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal4/600/450) center/cover;border-radius:6px;' } },
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal5/600/450) center/cover;border-radius:6px;' } },
                { tagName: 'div', attributes: { class: 'cs-gal-img', style: 'height:250px;background:url(https://picsum.photos/seed/gal6/600/450) center/cover;border-radius:6px;' } },
              ]
            },
          ]
        }
      ]
    },
  });

  bm.add('image-masonry', {
    label: 'Masonry Gallery', category: 'Media', attributes: { class: 'fa fa-th-large' },
    content: {
      type: 'cs-image-masonry',
      attributes: {
        'data-gjs-type': 'cs-image-masonry',
        'data-mas-bg':     '#f9f9f9',
        'data-mas-gap':    '12px',
        'data-mas-radius': '6px',
        style: 'padding:80px 20px;background:#f9f9f9;font-family:Helvetica,sans-serif;text-align:center;',
      },
      components: [
        { tagName: 'div', attributes: { style: 'max-width:1100px;margin:0 auto;' },
          components: [
            { tagName: 'h2', attributes: { style: 'font-size:2em;font-weight:700;color:#333;margin-bottom:45px;' }, components: [{ type: 'text', content: 'Masonry Layout' }] },
            { tagName: 'div', attributes: { style: 'display:flex;gap:12px;' },
              components: [
                { tagName: 'div', attributes: { style: 'flex:1;display:flex;flex-direction:column;gap:12px;' },
                  components: [
                    { tagName: 'div', attributes: { style: 'height:300px;background:url(https://picsum.photos/seed/m1/400/600) center/cover;border-radius:6px;' } },
                    { tagName: 'div', attributes: { style: 'height:200px;background:url(https://picsum.photos/seed/m2/400/400) center/cover;border-radius:6px;' } },
                  ]
                },
                { tagName: 'div', attributes: { style: 'flex:1;display:flex;flex-direction:column;gap:12px;' },
                  components: [
                    { tagName: 'div', attributes: { style: 'height:200px;background:url(https://picsum.photos/seed/m3/400/400) center/cover;border-radius:6px;' } },
                    { tagName: 'div', attributes: { style: 'height:300px;background:url(https://picsum.photos/seed/m4/400/600) center/cover;border-radius:6px;' } },
                  ]
                },
                { tagName: 'div', attributes: { style: 'flex:1;display:flex;flex-direction:column;gap:12px;' },
                  components: [
                    { tagName: 'div', attributes: { style: 'height:280px;background:url(https://picsum.photos/seed/m5/400/550) center/cover;border-radius:6px;' } },
                    { tagName: 'div', attributes: { style: 'height:220px;background:url(https://picsum.photos/seed/m6/400/450) center/cover;border-radius:6px;' } },
                  ]
                },
              ]
            }
          ]
        }
      ]
    },
  });

  bm.add('lightbox-gallery', {
    label: 'Lightbox Gallery', category: 'Media', attributes: { class: 'fa fa-picture-o' },
    content: {
      type: 'cs-lightbox',
      attributes: {
        'data-gjs-type': 'cs-lightbox',
        'data-lb-cols':   '3',
        'data-lb-bg':     '#ffffff',
        'data-lb-gap':    '12px',
        'data-lb-radius': '8px',
        style: 'padding:70px 20px;background:#ffffff;font-family:Helvetica,sans-serif;text-align:center;',
      },
      components: [
        { tagName: 'div', attributes: { style: 'max-width:1100px;margin:0 auto;' },
          components: [
            { tagName: 'h2', attributes: { style: 'font-size:2em;font-weight:700;color:#333;margin-bottom:40px;' }, components: [{ type: 'text', content: 'Gallery' }] },
            { tagName: 'div', attributes: { class: 'cs-lb-grid', style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:12px;' },
              components: [
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb1/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb1/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb2/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb2/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb3/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb3/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb4/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb4/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb5/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb5/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', style: 'height:200px;background:url(https://picsum.photos/seed/lb6/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb6/1200/800' } },
              ]
            },
          ]
        },
        { tagName: 'div', attributes: { id: 'cs-lb-overlay', style: 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;align-items:center;justify-content:center;cursor:zoom-out;' },
          components: [
            { tagName: 'img', attributes: { id: 'cs-lb-img', src: '', style: 'max-width:90vw;max-height:90vh;border-radius:8px;pointer-events:none;' } },
            { tagName: 'button', attributes: { style: 'position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2em;cursor:pointer;' }, components: [{ type: 'text', content: '✕' }] },
          ]
        }
      ]
    },
  });

  bm.add('audio-player', {
    label: 'Audio Player', category: 'Media', attributes: { class: 'fa fa-music' },
    content: {
      type: 'cs-audio-player',
      attributes: {
        'data-gjs-type': 'cs-audio-player',
        'data-aud-title':  'Track Title',
        'data-aud-artist': 'Artist Name',
        'data-aud-bg':     '#fafafa',
        'data-aud-accent': '#4d114f',
        style: 'padding:20px;background:#ffffff;font-family:Helvetica,sans-serif;',
      },
      components: [
        { tagName: 'div', attributes: { style: 'display:flex;align-items:center;gap:16px;padding:20px 24px;background:#fafafa;border-radius:12px;border:1px solid #eeeeee;box-shadow:0 2px 12px rgba(0,0,0,.06);flex-wrap:wrap;' },
          components: [
            { tagName: 'span', attributes: { style: 'font-size:2em;flex-shrink:0;' }, components: [{ type: 'text', content: '\ud83c\udfb5' }] },
            { tagName: 'div', attributes: { style: 'min-width:120px;' },
              components: [
                { tagName: 'div', attributes: { style: 'font-weight:700;color:#333333;font-size:.95em;' }, components: [{ type: 'text', content: 'Track Title' }] },
                { tagName: 'div', attributes: { style: 'font-size:.82em;color:#4d114f;margin-top:3px;' },  components: [{ type: 'text', content: 'Artist Name' }] },
              ]
            },
            { tagName: 'audio', attributes: { controls: 'true', style: 'flex:1;min-width:200px;height:36px;accent-color:#4d114f;' },
              components: [{ tagName: 'source', attributes: { src: '', type: 'audio/mpeg' } }]
            },
          ]
        }
      ]
    },
  });

  bm.add('video-embed-block', {
    label: 'Video Embed', category: 'Media', attributes: { class: 'fa fa-youtube-play' },
    content: {
      type: 'cs-video-embed',
      attributes: { 'data-gjs-type': 'cs-video-embed', 'data-vid-url': 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      components: '<div style="max-width:800px;margin:20px auto;"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.15);"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></div>'
    },
  });

  bm.add('icon-grid', {
    label: 'Icon Grid', category: 'Media', attributes: { class: 'fa fa-th-large' },
    content: '<section style="padding:80px 20px;background:#fff;font-family:Helvetica,sans-serif;text-align:center;"><div style="max-width:1000px;margin:0 auto;"><h2 style="font-size:2em;font-weight:700;color:#333;margin-bottom:50px;">Why Choose Us</h2><div class="cs-icongrid-grid"><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#9889;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">Lightning Fast</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Optimized for speed.</p></div><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#128274;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">Secure</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Enterprise-grade security.</p></div><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#127757;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">Global CDN</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Delivered worldwide.</p></div><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#128241;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">Mobile Ready</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Perfect on every screen.</p></div><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#128200;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">Analytics</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Real-time insights.</p></div><div style="padding:10px;"><div style="font-size:2.2em;margin-bottom:12px;">&#128172;</div><h3 style="font-size:.95em;font-weight:700;color:#333;margin:0 0 8px;">24/7 Support</h3><p style="font-size:.83em;color:#888;line-height:1.5;margin:0;">Always here to help.</p></div></div></div></section><style>.cs-icongrid-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;}@media(max-width:700px){.cs-icongrid-grid{grid-template-columns:repeat(2,1fr);}}</style>'
  });

  bm.add('carousel-media', {
    label: 'Carousel Media', category: 'Media', attributes: { class: 'fa fa-play-circle' },
    content: '<div class="cs-cmed"><div class="cs-cmed-track"><div class="cs-cmed-slide"><div class="cs-cmed-video"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe></div><div class="cs-cmed-caption"><h4>Video Title One</h4><p>Short description of this video or media item.</p></div></div><div class="cs-cmed-slide"><div class="cs-cmed-video"><iframe src="https://www.youtube.com/embed/ScMzIvxBSi4" frameborder="0" allowfullscreen></iframe></div><div class="cs-cmed-caption"><h4>Video Title Two</h4><p>Short description of this video or media item.</p></div></div><div class="cs-cmed-slide"><div class="cs-cmed-video" style="background:#1e1e1e;display:flex;align-items:center;justify-content:center;min-height:200px;"><audio controls style="width:80%;accent-color:#a0449e;"><source src="" type="audio/mpeg"><p style="color:#fff;">Audio not supported.</p></audio></div><div class="cs-cmed-caption"><h4>Audio Track</h4><p>Replace with your audio file source.</p></div></div></div><div class="cs-cmed-controls"><button class="cs-cmed-prev">&#10094; Prev</button><button class="cs-cmed-next">Next &#10095;</button></div></div><style>.cs-cmed{max-width:700px;margin:0 auto;font-family:Helvetica,sans-serif;overflow:hidden;}.cs-cmed-track{display:flex;transition:transform .45s ease;}.cs-cmed-slide{min-width:100%;}.cs-cmed-video{position:relative;padding-bottom:56.25%;height:0;background:#000;}.cs-cmed-video iframe{position:absolute;inset:0;width:100%;height:100%;}.cs-cmed-caption{padding:16px 20px;background:#fafafa;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;}.cs-cmed-caption h4{margin:0 0 4px;font-size:.95em;color:#333;font-weight:700;}.cs-cmed-caption p{margin:0;font-size:.82em;color:#888;}.cs-cmed-controls{display:flex;justify-content:center;gap:12px;padding:14px;}.cs-cmed-controls button{padding:8px 22px;background:#4d114f;color:#fff;border:none;border-radius:5px;cursor:pointer;font-weight:700;font-size:.88em;}.cs-cmed-controls button:hover{background:#a0449e;}</style>'
  });

  bm.add('carousel-image', {
    label: 'Carousel Image', category: 'Media', attributes: { class: 'fa fa-image' },
    content: '<div class="cs-cimg"><div class="cs-cimg-track"><div class="cs-cimg-slide"><img src="https://via.placeholder.com/1200x500/4d114f/fff?text=Image+1" class="cs-cimg-photo"><div class="cs-cimg-cap">Caption for Image One</div></div><div class="cs-cimg-slide"><img src="https://via.placeholder.com/1200x500/459ba8/fff?text=Image+2" class="cs-cimg-photo"><div class="cs-cimg-cap">Caption for Image Two</div></div><div class="cs-cimg-slide"><img src="https://via.placeholder.com/1200x500/e868a2/fff?text=Image+3" class="cs-cimg-photo"><div class="cs-cimg-cap">Caption for Image Three</div></div></div><button class="cs-cimg-arrow cs-cimg-prev">&#10094;</button><button class="cs-cimg-arrow cs-cimg-next">&#10095;</button><div class="cs-cimg-dots"><span class="cs-cimg-dot cs-cimg-dot-on"></span><span class="cs-cimg-dot"></span><span class="cs-cimg-dot"></span></div></div><style>.cs-cimg{position:relative;overflow:hidden;font-family:Helvetica,sans-serif;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,.12);}.cs-cimg-track{display:flex;transition:transform .5s ease;}.cs-cimg-slide{min-width:100%;position:relative;}.cs-cimg-photo{width:100%;height:400px;object-fit:cover;display:block;}.cs-cimg-cap{position:absolute;bottom:0;left:0;right:0;padding:14px 20px;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff;font-size:.88em;font-weight:500;}.cs-cimg-arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.4);border:none;color:#fff;width:42px;height:42px;border-radius:50%;font-size:1.1em;cursor:pointer;z-index:5;}.cs-cimg-prev{left:12px;}.cs-cimg-next{right:12px;}.cs-cimg-dots{position:absolute;bottom:48px;left:50%;transform:translateX(-50%);display:flex;gap:8px;}.cs-cimg-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;}.cs-cimg-dot-on{background:#fff;}</style>'
  });

  // --- Trait Handlers ---

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

    // Video Hero
    if (attrs['data-vh-url']) {
      model.on('change:attributes', function(m) {
        var a = model.getAttributes();
        var target = child('section') || model;
        var el = target.getEl && target.getEl();
        if (!el) return;
        var container = el.querySelector('.cs-video-container');
        if (container) {
          var type = a['data-vh-type'] || 'mp4';
          if (type === 'mp4') {
            var v = container.querySelector('video');
            if (v) {
                var s = v.querySelector('source');
                if (s) s.src = a['data-vh-url'];
                v.load();
            }
          }
        }
        if (a['data-vh-height']) target.addStyle({ 'height': a['data-vh-height'] });
      });
    }

    // Image Gallery
    if (attrs['data-gal-cols']) {
      model.on('change:attributes', function(m) {
        var a = model.getAttributes();
        var target = child('section') || model;
        var grid = findByClass(target, 'cs-gal-grid');
        if (grid) grid.addStyle({ 'grid-template-columns': 'repeat(' + (a['data-gal-cols'] || '3') + ',1fr)', 'gap': a['data-gal-gap'] || '12px' });
      });
    }
  });
});
