grapesjs.plugins.add('gjs-media', (editor, opts = {}) => {
  const bm = editor.BlockManager;
  const domt = editor.DomComponents;

  // -- Helper: find descendant by class --
  function findByClass(cm, className) {
    var found = null;
    function walk(m) {
      if (found) return;
      var cl = (m.getAttributes ? m.getAttributes().class : '') || '';
      if (cl.split(' ').indexOf(className) !== -1) { found = m; return; }
      m.components && m.components().each(walk);
    }
    walk(cm);
    return found;
  }

  // Register Types
  domt.addType('cs-video-hero', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-vh-url')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-video-hero') ? { type: 'cs-video-hero' } : undefined,
    model: { defaults: { tagName: 'div', traits: [
      { type: 'select', name: 'data-vh-type', label: 'Video Type', changeProp: 0,
        options: [{ id:'mp4', name:'MP4 File' }, { id:'youtube', name:'YouTube' }, { id:'vimeo', name:'Vimeo' }] },
      { type: 'text',   name: 'data-vh-url',     label: 'Video URL (.mp4)', changeProp: 0 },
      { type: 'text',   name: 'data-vh-id',      label: 'YouTube/Vimeo ID', changeProp: 0 },
      { type: 'checkbox', name: 'data-vh-autoplay', label: 'Autoplay', changeProp: 0, valueTrue: '1', valueFalse: '0' },
      { type: 'checkbox', name: 'data-vh-loop',     label: 'Loop',     changeProp: 0, valueTrue: '1', valueFalse: '0' },
      { type: 'select', name: 'data-vh-height',  label: 'Height', changeProp: 0,
        options: [{ id:'400px', name:'400px' }, { id:'500px', name:'500px' }, { id:'600px', name:'600px' }, { id:'100vh', name:'Full Screen (100vh)' }] },
      { type: 'select', name: 'data-vh-overlay', label: 'Overlay Opacity', changeProp: 0,
        options: [{ id:'0', name:'None' }, { id:'0.3', name:'Light 30%' }, { id:'0.5', name:'Medium 50%' }, { id:'0.7', name:'Dark 70%' }, { id:'0.85', name:'Very Dark 85%' }] },
      { type: 'color',  name: 'data-vh-ovcolor', label: 'Overlay Color', changeProp: 0 },
      { type: 'select', name: 'data-vh-align',   label: 'Text Align', changeProp: 0,
        options: [{ id:'center', name:'Center' }, { id:'left', name:'Left' }, { id:'right', name:'Right' }] },
    ] } },
  });

  domt.addType('cs-video-embed', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-vid-url')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-video-embed') ? { type: 'cs-video-embed' } : undefined,
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text',     name: 'data-vid-url',      label: 'Embed URL', changeProp: 0 },
      { type: 'checkbox', name: 'data-vid-autoplay', label: 'Autoplay', changeProp: 0, valueTrue: '1', valueFalse: '0' },
      { type: 'checkbox', name: 'data-vid-loop',     label: 'Loop',     changeProp: 0, valueTrue: '1', valueFalse: '0' },
    ] } },
  });

  domt.addType('cs-image-gallery', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-gal-cols')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-image-gallery') ? { type: 'cs-image-gallery' } : undefined,
    model: { defaults: { tagName: 'section', traits: [
      { type: 'select', name: 'data-gal-cols',   label: 'Columns', changeProp: 0,
        options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
      { type: 'select', name: 'data-gal-gap',    label: 'Gap', changeProp: 0,
        options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'color',  name: 'data-gal-bg',     label: 'Background', changeProp: 0 },
      { type: 'select', name: 'data-gal-radius', label: 'Image Radius', changeProp: 0,
        options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-image-masonry', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-mas-bg')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-image-masonry') ? { type: 'cs-image-masonry' } : undefined,
    model: { defaults: { tagName: 'section', traits: [
      { type: 'color',  name: 'data-mas-bg',     label: 'Background', changeProp: 0 },
      { type: 'select', name: 'data-mas-gap',    label: 'Gap', changeProp: 0,
        options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'select', name: 'data-mas-radius', label: 'Image Radius', changeProp: 0,
        options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-lightbox', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-lb-cols')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-lightbox') ? { type: 'cs-lightbox' } : undefined,
    model: { defaults: { tagName: 'section', traits: [
      { type: 'select', name: 'data-lb-cols',   label: 'Columns', changeProp: 0,
        options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
      { type: 'color',  name: 'data-lb-bg',     label: 'Background', changeProp: 0 },
      { type: 'select', name: 'data-lb-gap',    label: 'Gap', changeProp: 0,
        options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
      { type: 'select', name: 'data-lb-radius', label: 'Image Radius', changeProp: 0,
        options: [{ id:'0px', name:'None' }, { id:'8px', name:'Small' }, { id:'16px', name:'Large' }] },
    ] } },
  });

  domt.addType('cs-audio-player', {
    isComponent: el => (el.hasAttribute && el.hasAttribute('data-aud-title')) || (el.getAttribute && el.getAttribute('data-gjs-type') === 'cs-audio-player') ? { type: 'cs-audio-player' } : undefined,
    model: { defaults: { tagName: 'div', traits: [
      { type: 'text',  name: 'data-aud-title',  label: 'Track Title', changeProp: 0 },
      { type: 'text',  name: 'data-aud-artist', label: 'Artist Name', changeProp: 0 },
      { type: 'color', name: 'data-aud-accent', label: 'Accent Color', changeProp: 0 },
      { type: 'color', name: 'data-aud-bg',     label: 'Player Background', changeProp: 0 },
    ] } },
  });

  // Add Blocks
  bm.add('video-hero', {
    label: 'Video Hero', category: 'Media', attributes: { class: 'fa fa-play-circle-o' },
    content: {
      type: 'cs-video-hero', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-video-hero', 'data-vh-type': 'mp4', 'data-vh-url': 'https://www.w3schools.com/html/mov_bbb.mp4', 'data-vh-autoplay': '1', 'data-vh-loop': '1', 'data-vh-height': '500px', 'data-vh-overlay': '0.5', 'data-vh-ovcolor': '#000000', 'data-vh-align': 'center' },
      components: '<section style="position:relative;height:500px;display:flex;align-items:center;justify-content:center;color:#fff;overflow:hidden;font-family:Helvetica,sans-serif;"><div class="cs-video-container" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;overflow:hidden;"><video autoplay loop muted playsinline style="position:absolute;top:50%;left:50%;min-width:100%;min-height:100%;transform:translate(-50%,-50%);object-fit:cover;"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"></video></div><div style="position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:1;"></div><div style="position:relative;z-index:2;max-width:800px;padding:20px;text-align:center;"><h1>Amazing Video Header</h1><p>Engage your visitors with stunning full-screen video backgrounds.</p></div></section>',
      traits: [
        { type: 'select', name: 'data-vh-type', label: 'Video Type', options: [{ id:'mp4', name:'MP4 File' }, { id:'youtube', name:'YouTube' }, { id:'vimeo', name:'Vimeo' }] },
        { type: 'text',   name: 'data-vh-url',     label: 'Video URL (.mp4)' },
        { type: 'text',   name: 'data-vh-id',      label: 'YouTube/Vimeo ID' },
        { type: 'checkbox', name: 'data-vh-autoplay', label: 'Autoplay', valueTrue: '1', valueFalse: '0' },
        { type: 'checkbox', name: 'data-vh-loop',     label: 'Loop',     valueTrue: '1', valueFalse: '0' },
        { type: 'select', name: 'data-vh-height',  label: 'Height', options: [{ id:'400px', name:'400px' }, { id:'500px', name:'500px' }, { id:'600px', name:'600px' }, { id:'100vh', name:'Full Screen (100vh)' }] },
        { type: 'select', name: 'data-vh-overlay', label: 'Overlay Opacity', options: [{ id:'0', name:'None' }, { id:'0.3', name:'Light 30%' }, { id:'0.5', name:'Medium 50%' }, { id:'0.7', name:'Dark 70%' }, { id:'0.85', name:'Very Dark 85%' }] },
        { type: 'color',  name: 'data-vh-ovcolor', label: 'Overlay Color' },
        { type: 'select', name: 'data-vh-align',   label: 'Text Align', options: [{ id:'center', name:'Center' }, { id:'left', name:'Left' }, { id:'right', name:'Right' }] },
      ]
    }
  });

  bm.add('image-gallery', {
    label: 'Image Gallery', category: 'Media', attributes: { class: 'fa fa-th' },
    content: {
      type: 'cs-image-gallery',
      tagName: 'section',
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
        },
        { tagName: 'style', components: [{ type: 'text', content: '@media(max-width:700px){.cs-gal-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:480px){.cs-gal-grid{grid-template-columns:1fr!important;}}' }] }
      ],
      traits: [
        { type: 'select', name: 'data-gal-cols',   label: 'Columns',      options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
        { type: 'select', name: 'data-gal-gap',    label: 'Gap',          options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
        { type: 'color',  name: 'data-gal-bg',     label: 'Background' },
        { type: 'select', name: 'data-gal-radius', label: 'Image Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
      ],
    },
  });

  bm.add('image-masonry', {
    label: 'Masonry Gallery', category: 'Media', attributes: { class: 'fa fa-th-large' },
    content: {
      type: 'cs-image-masonry',
      tagName: 'section',
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
        },
        { tagName: 'style', components: [{ type: 'text', content: '@media(max-width:600px){[style*="display:flex"]{flex-direction:column!important;}}' }] }
      ],
      traits: [
        { type: 'color',  name: 'data-mas-bg',     label: 'Background' },
        { type: 'select', name: 'data-mas-gap',    label: 'Gap',          options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
        { type: 'select', name: 'data-mas-radius', label: 'Image Radius', options: [{ id:'0px', name:'None' }, { id:'6px', name:'Small' }, { id:'12px', name:'Medium' }, { id:'20px', name:'Large' }] },
      ],
    },
  });

  bm.add('lightbox-gallery', {
    label: 'Lightbox Gallery', category: 'Media', attributes: { class: 'fa fa-picture-o' },
    content: {
      type: 'cs-lightbox',
      tagName: 'section',
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
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb1/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb1/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb2/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb2/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb3/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb3/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb4/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb4/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb5/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb5/1200/800' } },
                { tagName: 'div', attributes: { class: 'cs-lb-img', onclick: 'csLbOpen(this)', style: 'height:200px;background:url(https://picsum.photos/seed/lb6/600/400) center/cover;border-radius:8px;cursor:pointer;transition:transform .3s;', 'data-full': 'https://picsum.photos/seed/lb6/1200/800' } },
              ]
            },
          ]
        },
        { tagName: 'div', attributes: { id: 'cs-lb-overlay', style: 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;align-items:center;justify-content:center;cursor:zoom-out;' },
          components: [
            { tagName: 'img', attributes: { id: 'cs-lb-img', src: '', style: 'max-width:90vw;max-height:90vh;border-radius:8px;pointer-events:none;' } },
            { tagName: 'button', attributes: { style: 'position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2em;cursor:pointer;' }, components: [{ type: 'text', content: '✕' }] },
          ]
        },
        { tagName: 'style', components: [{ type: 'text', content: '.cs-lb-grid div:hover{transform:scale(1.04);}@media(max-width:600px){.cs-lb-grid{grid-template-columns:repeat(2,1fr)!important;}}' }] },
        {
          tagName: 'script',
          components: [{ type: 'text', content: 'window.csLbOpen = function(el) { var ov = document.getElementById("cs-lb-overlay"); var img = document.getElementById("cs-lb-img"); if(!ov || !img) return; img.src = el.dataset.full || ""; ov.style.display = "flex"; ov.onclick = function() { ov.style.display = "none"; }; var btn = ov.querySelector("button"); if(btn) btn.onclick = function(e) { e.stopPropagation(); ov.style.display = "none"; }; };' }]
        },
      ],
      traits: [
        { type: 'select', name: 'data-lb-cols',   label: 'Columns',      changeProp: 0,
          options: [{ id:'2', name:'2 Columns' }, { id:'3', name:'3 Columns' }, { id:'4', name:'4 Columns' }] },
        { type: 'color',  name: 'data-lb-bg',     label: 'Background',   changeProp: 0 },
        { type: 'select', name: 'data-lb-gap',    label: 'Gap',          changeProp: 0,
          options: [{ id:'4px', name:'Tight' }, { id:'12px', name:'Normal' }, { id:'24px', name:'Wide' }] },
        { type: 'select', name: 'data-lb-radius', label: 'Image Radius', changeProp: 0,
          options: [{ id:'0px', name:'None' }, { id:'8px', name:'Small' }, { id:'16px', name:'Large' }] },
      ],
    },
  });

  bm.add('audio-player', {
    label: 'Audio Player', category: 'Media', attributes: { class: 'fa fa-music' },
    content: {
      type: 'cs-audio-player',
      tagName: 'div',
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
      ],
      traits: [
        { type: 'text',  name: 'data-aud-title',  label: 'Track Title',        changeProp: 0 },
        { type: 'text',  name: 'data-aud-artist', label: 'Artist Name',        changeProp: 0 },
        { type: 'color', name: 'data-aud-accent', label: 'Accent Color',       changeProp: 0 },
        { type: 'color', name: 'data-aud-bg',     label: 'Player Background',  changeProp: 0 },
      ],
    },
  });

  bm.add('video-embed-block', {
    label: 'Video Embed', category: 'Media', attributes: { class: 'fa fa-youtube-play' },
    content: {
      type: 'cs-video-embed', tagName: 'div',
      attributes: { 'data-gjs-type': 'cs-video-embed', 'data-vid-url': 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      components: '<div style="max-width:800px;margin:20px auto;"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,.15);"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></div>',
      traits: [
        { type: 'text',     name: 'data-vid-url',      label: 'Embed URL' },
        { type: 'checkbox', name: 'data-vid-autoplay', label: 'Autoplay', valueTrue: '1', valueFalse: '0' },
        { type: 'checkbox', name: 'data-vid-loop',     label: 'Loop',     valueTrue: '1', valueFalse: '0' },
      ],
    },
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

    // VIDEO HERO
    if ('data-vh-url' in attrs || 'data-vh-type' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        var el = section.getEl && section.getEl();
        if (!el) return;

        if ('data-vh-type' in changed || 'data-vh-url' in changed || 'data-vh-id' in changed || 'data-vh-autoplay' in changed || 'data-vh-loop' in changed) {
          var type = a['data-vh-type'] || 'mp4';
          var autoplay = a['data-vh-autoplay'] === '1';
          var loop = a['data-vh-loop'] === '1';
          var container = el.querySelector('.cs-video-container');
          if (!container) {
             container = document.createElement('div');
             container.className = 'cs-video-container';
             container.style = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;overflow:hidden;';
             el.insertBefore(container, el.firstChild);
          }
          container.innerHTML = '';

          if (type === 'mp4') {
            var video = document.createElement('video');
            video.style = 'position:absolute;top:50%;left:50%;min-width:100%;min-height:100%;transform:translate(-50%,-50%);object-fit:cover;';
            if (autoplay) video.setAttribute('autoplay', 'true');
            if (loop) video.setAttribute('loop', 'true');
            video.setAttribute('muted', 'true');
            video.setAttribute('playsinline', 'true');
            var source = document.createElement('source');
            source.src = a['data-vh-url'] || 'https://www.w3schools.com/html/mov_bbb.mp4';
            source.type = 'video/mp4';
            video.appendChild(source);
            container.appendChild(video);
            video.load();
          } else if (type === 'youtube') {
            var id = a['data-vh-id'] || 'dQw4w9WgXcQ';
            var iframe = document.createElement('iframe');
            var params = ['controls=0', 'showinfo=0', 'rel=0', 'mute=1', 'iv_load_policy=3', 'enablejsapi=1'];
            if (autoplay) params.push('autoplay=1');
            if (loop) params.push('loop=1', 'playlist=' + id);
            iframe.src = 'https://www.youtube.com/embed/' + id + '?' + params.join('&');
            iframe.style = 'position:absolute;top:50%;left:50%;width:100vw;height:56.25vw;min-height:100vh;min-width:177.77vh;transform:translate(-50%,-50%);pointer-events:none;border:none;';
            container.appendChild(iframe);
          } else if (type === 'vimeo') {
            var id = a['data-vh-id'] || '76979871';
            var iframe = document.createElement('iframe');
            var params = ['background=1', 'muted=1'];
            if (autoplay) params.push('autoplay=1');
            if (loop) params.push('loop=1');
            iframe.src = 'https://player.vimeo.com/video/' + id + '?' + params.join('&');
            iframe.style = 'position:absolute;top:50%;left:50%;width:100vw;height:56.25vw;min-height:100vh;min-width:177.77vh;transform:translate(-50%,-50%);pointer-events:none;border:none;';
            container.appendChild(iframe);
          }
        }
        if ('data-vh-height' in changed) {
          section.addStyle({ 'height': a['data-vh-height'] || '500px' });
        }
        if ('data-vh-overlay' in changed || 'data-vh-ovcolor' in changed) {
          var ov = el.querySelector('div[style*="z-index:1"]');
          if (ov) {
            var hex = a['data-vh-ovcolor'] || '#000000';
            var op  = parseFloat(a['data-vh-overlay'] || '0.5');
            var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
            ov.style.background = 'rgba(' + r + ',' + g + ',' + b + ',' + op + ')';
          }
        }
        if ('data-vh-align' in changed) {
          var cnt = el.querySelector('div[style*="z-index:2"]');
          if (cnt) cnt.style.textAlign = a['data-vh-align'] || 'center';
        }
      });
    }

    // IMAGE GALLERY
    if ('data-gal-cols' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-gal-bg' in changed) {
          section.addStyle({ 'background': a['data-gal-bg'] || '#ffffff' });
        }
        if ('data-gal-cols' in changed || 'data-gal-gap' in changed) {
          var cols = a['data-gal-cols'] || '3';
          var gap = a['data-gal-gap'] || '12px';
          var grid = findByClass(section, 'cs-gal-grid');
          if (grid) {
            grid.addStyle({ 'display': 'grid', 'grid-template-columns': 'repeat(' + cols + ',1fr)', 'gap': gap });
          }
        }
        if ('data-gal-radius' in changed) {
          var radius = a['data-gal-radius'] || '6px';
          function setRadius(cm) {
            cm.components().each(function(c) {
              var cl = (c.getAttributes ? c.getAttributes().class : '') || '';
              if (cl.split(' ').indexOf('cs-gal-img') !== -1) {
                c.addStyle({ 'border-radius': radius });
              }
              setRadius(c);
            });
          }
          setRadius(section);
        }
      });
    }

    // IMAGE MASONRY
    if ('data-mas-bg' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-mas-bg' in changed) {
          section.addStyle({ 'background': a['data-mas-bg'] || '#f9f9f9' });
        }
        var el = section.getEl && section.getEl();
        if (!el) return;
        var wrap = el.querySelector('div[style*="display:flex;gap"]');
        if ('data-mas-gap' in changed && wrap) {
          wrap.style.gap = a['data-mas-gap'] || '12px';
          wrap.querySelectorAll('div[style*="flex-direction:column"]').forEach(function(col) {
            col.style.gap = a['data-mas-gap'] || '12px';
          });
        }
        if ('data-mas-radius' in changed) {
          el.querySelectorAll('div[style*="background:url"]').forEach(function(d) {
            d.style.borderRadius = a['data-mas-radius'] || '6px';
          });
        }
      });
    }

    // LIGHTBOX GALLERY
    if ('data-lb-cols' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var section = child('section');
        if ('data-lb-bg' in changed) {
          section.addStyle({ 'background': a['data-lb-bg'] || '#ffffff' });
        }
        if ('data-lb-cols' in changed || 'data-lb-gap' in changed) {
          var cols = a['data-lb-cols'] || '3';
          var gap = a['data-lb-gap'] || '12px';
          var grid = findByClass(section, 'cs-lb-grid');
          if (grid) {
            grid.addStyle({ 'display': 'grid', 'grid-template-columns': 'repeat(' + cols + ',1fr)', 'gap': gap });
          }
        }
        if ('data-lb-radius' in changed) {
          var radius = a['data-lb-radius'] || '8px';
          function setRadius(cm) {
            cm.components().each(function(c) {
              var cl = (c.getAttributes ? c.getAttributes().class : '') || '';
              if (cl.split(' ').indexOf('cs-lb-img') !== -1) {
                c.addStyle({ 'border-radius': radius });
              }
              setRadius(c);
            });
          }
          setRadius(section);
        }
      });
    }

    // AUDIO PLAYER
    if ('data-aud-title' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var el = model.getEl && model.getEl();
        if (!el) return;
        if ('data-aud-title' in changed) {
          var t = el.querySelector('div[style*="font-weight:700"]');
          if (t) t.textContent = a['data-aud-title'] || 'Track Title';
        }
        if ('data-aud-artist' in changed) {
          var ar = el.querySelector('div[style*="color:#4d114f"]');
          if (ar) ar.textContent = a['data-aud-artist'] || 'Artist Name';
        }
        if ('data-aud-accent' in changed) {
          var color = a['data-aud-accent'] || '#4d114f';
          var ar2 = el.querySelector('div[style*="color:#4d114f"]');
          if (ar2) ar2.style.color = color;
          var audio = el.querySelector('audio');
          if (audio) audio.style.accentColor = color;
        }
        if ('data-aud-bg' in changed) {
          var card = el.querySelector('div[style*="border-radius:12px"]');
          if (card) card.style.background = a['data-aud-bg'] || '#fafafa';
        }
      });
    }

    // VIDEO EMBED
    if ('data-vid-url' in attrs) {
      model.on('change:attributes', function(m) {
        var changed = (m.changed && m.changed.attributes) || {};
        var a = model.getAttributes();
        var iframe = null;
        function findIframe(cm) { cm.components && cm.components().each(function(c) { if (c.get('tagName') === 'iframe') { iframe = c; } else findIframe(c); }); }
        findIframe(model);
        if (!iframe) return;
        if ('data-vid-url' in changed || 'data-vid-autoplay' in changed || 'data-vid-loop' in changed) {
          var base = a['data-vid-url'] || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
          var params = [];
          if (a['data-vid-autoplay'] === '1') params.push('autoplay=1');
          if (a['data-vid-loop']     === '1') params.push('loop=1');
          var url = base + (params.length ? '?' + params.join('&') : '');
          iframe.addAttributes({ src: url });
        }
      });
    }
  });
});
