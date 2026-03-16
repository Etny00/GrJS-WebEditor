(function() {
    // Helper: Initialize Sliders (Media and Extra blocks)
    function csInitSliders(editor) {
        if (!editor || !editor.Canvas) return;
        var doc = editor.Canvas.getDocument();
        if (!doc) return;

        var configs = [
            { wrap: '.cs-sl', track: '.cs-sl-track', prev: '.cs-sl-prev', next: '.cs-sl-next', dot: '.cs-sl-dot', dotOn: 'cs-sl-dot-active' },
            { wrap: '.cs-cn', track: '.cs-cn-track', prev: '.cs-cn-prev', next: '.cs-cn-next', dot: null },
            { wrap: '.cs-cmed', track: '.cs-cmed-track', prev: '.cs-cmed-prev', next: '.cs-cmed-next', dot: null },
            { wrap: '.cs-cimg', track: '.cs-cimg-track', prev: '.cs-cimg-prev', next: '.cs-cimg-next', dot: '.cs-cimg-dot', dotOn: 'cs-cimg-dot-on' }
        ];

        for (var i = 0; i < configs.length; i++) {
            var cfg = configs[i];
            var els = doc.querySelectorAll(cfg.wrap);
            for (var j = 0; j < els.length; j++) {
                var el = els[j];
                if (el._csInited) continue;
                el._csInited = true;
                el.setAttribute('data-cur', '0');
                var track = el.querySelector(cfg.track);
                var slides = track ? track.children : [];
                var n = slides.length;
                if (!track || n === 0) continue;

                (function(el, track, n, cfg) {
                    function goTo(idx) {
                        idx = ((idx % n) + n) % n;
                        el.setAttribute('data-cur', idx);
                        track.style.transform = 'translateX(-' + (idx * 100) + '%)';
                        if (cfg.dot) {
                            var dots = el.querySelectorAll(cfg.dot);
                            for (var d = 0; d < dots.length; d++) {
                                if (dots[d].classList) {
                                    dots[d].classList.toggle(cfg.dotOn, d === idx);
                                }
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
                        for (var dIdx = 0; dIdx < dots.length; dIdx++) {
                            (function(di) {
                                dots[di].addEventListener('click', function (e) {
                                    e.stopPropagation();
                                    goTo(di);
                                });
                            })(dIdx);
                        }
                    }
                })(el, track, n, cfg);
            }
        }
    }

    // Initialize Editor
    window.initEditor = function(pluginList) {
        var lp = './img/';
        var plp = 'https://via.placeholder.com/350x250/';
        var assets = [
            lp + 'team1.jpg', lp + 'team2.jpg', lp + 'team3.jpg',
            plp + '78c5d6/fff', plp + '459ba8/fff', plp + '79c267/fff',
            plp + 'c5d647/fff', plp + 'f28c33/fff', plp + 'e868a2/fff',
            plp + 'cc4360/fff', lp + 'work-desk.jpg', lp + 'phone-app.png',
            lp + 'bg-gr-v.png'
        ];

        var basePlugins = [
            'gjs-blocks-basic', 'grapesjs-plugin-forms', 'grapesjs-component-countdown',
            'grapesjs-plugin-export', 'grapesjs-tabs', 'grapesjs-custom-code',
            'grapesjs-touch', 'grapesjs-parser-postcss', 'grapesjs-tooltip',
            'grapesjs-tui-image-editor', 'grapesjs-typed', 'grapesjs-style-bg',
            'grapesjs-navbar', 'grapesjs-lory-slider', 'grapesjs-blocks-flexbox',
            'grapesjs-style-filter', 'grapesjs-preset-webpage'
        ];

        var allPlugins = basePlugins.concat(pluginList || []);

        var editor = grapesjs.init({
            height: '100%',
            container: '#gjs',
            fromElement: true,
            showOffsets: true,
            assetManager: { embedAsBase64: true, assets: assets },
            selectorManager: { componentFirst: true },
            styleManager: {
                sectors: [
                    {
                        name: 'General',
                        properties: [
                            {
                                extend: 'float', type: 'radio', default: 'none',
                                options: [{ value: 'none', className: 'fa fa-times' }, { value: 'left', className: 'fa fa-align-left' }, { value: 'right', className: 'fa fa-align-right' }],
                            },
                            'display', { extend: 'position', type: 'select' },
                            'top', 'right', 'left', 'bottom',
                            { property: 'z-index', name: 'Z-Index', type: 'integer', default: 'auto' },
                        ],
                    },
                    {
                        name: 'Flex',
                        open: false,
                        properties: [
                            {
                                name: ' ',
                                property: 'flex-info',
                                type: 'label',
                                label: '<div id="flex-warning-note" style="padding: 10px; background-color: #45465A; color: #8B9FE0; border-radius: 3px; font-size: 11px; text-align: center; margin-bottom: 10px;">Set "Display" to "Flex" first</div>',
                            },
                            {
                                property: 'flex-direction',
                                type: 'radio',
                                default: 'row',
                                options: [
                                    { value: 'row', title: 'Row', className: 'icons-flex icon-dir-row' },
                                    { value: 'row-reverse', title: 'Row Reverse', className: 'icons-flex icon-dir-row-rev' },
                                    { value: 'column', title: 'Column', className: 'icons-flex icon-dir-col' },
                                    { value: 'column-reverse', title: 'Column Reverse', className: 'icons-flex icon-dir-col-rev' },
                                ],
                            },
                            {
                                property: 'flex-wrap',
                                type: 'radio',
                                default: 'nowrap',
                                options: [
                                    { value: 'nowrap', title: 'No Wrap', className: 'fa fa-minus' },
                                    { value: 'wrap', title: 'Wrap', className: 'fa fa-level-down' },
                                    { value: 'wrap-reverse', title: 'Wrap Reverse', className: 'fa fa-level-up' },
                                ],
                            },
                            {
                                property: 'justify-content',
                                type: 'radio',
                                default: 'flex-start',
                                options: [
                                    { value: 'flex-start', className: 'icons-flex icon-just-start' },
                                    { value: 'flex-end', className: 'icons-flex icon-just-end' },
                                    { value: 'space-between', className: 'icons-flex icon-just-sp-bet' },
                                    { value: 'space-around', className: 'icons-flex icon-just-sp-ar' },
                                    { value: 'center', className: 'icons-flex icon-just-sp-cent' },
                                ],
                            },
                            {
                                property: 'align-items',
                                type: 'radio',
                                default: 'stretch',
                                options: [
                                    { value: 'flex-start', className: 'icons-flex icon-al-start' },
                                    { value: 'flex-end', className: 'icons-flex icon-al-end' },
                                    { value: 'stretch', className: 'icons-flex icon-al-str' },
                                    { value: 'center', className: 'icons-flex icon-al-center' },
                                ],
                            },
                            {
                                property: 'align-content',
                                type: 'radio',
                                default: 'stretch',
                                options: [
                                    { value: 'flex-start', title: 'Start', className: 'fa fa-arrow-up' },
                                    { value: 'flex-end', title: 'End', className: 'fa fa-arrow-down' },
                                    { value: 'center', title: 'Center', className: 'fa fa-arrows-v' },
                                    { value: 'space-between', title: 'Space Between', className: 'fa fa-ellipsis-v' },
                                    { value: 'space-around', title: 'Space Around', className: 'fa fa-ellipsis-h' },
                                    { value: 'stretch', title: 'Stretch', className: 'fa fa-align-justify' },
                                ],
                            },
                            { property: 'gap', type: 'integer', default: '0', units: ['px', '%', 'em', 'rem', 'vh', 'vw'] },
                            { property: 'flex-grow', type: 'integer', default: '0' },
                            { property: 'flex-shrink', type: 'integer', default: '1' },
                            { property: 'flex-basis', type: 'integer', default: 'auto', units: ['px', '%', 'em', 'rem', 'vh', 'vw'] },
                            {
                                property: 'align-self',
                                type: 'radio',
                                default: 'auto',
                                options: [
                                    { value: 'auto', name: 'Auto' },
                                    { value: 'flex-start', className: 'icons-flex icon-al-start' },
                                    { value: 'flex-end', className: 'icons-flex icon-al-end' },
                                    { value: 'stretch', className: 'icons-flex icon-al-str' },
                                    { value: 'center', className: 'icons-flex icon-al-center' },
                                ],
                            },
                            { property: 'order', type: 'integer', default: '0' },
                        ],
                    },
                    {
                        name: 'Dimension', open: false,
                        properties: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
                    },
                    {
                        name: 'Typography', open: false,
                        properties: [
                            'font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height',
                            {
                                extend: 'text-align',
                                options: [{ id: 'left', label: 'Left', className: 'fa fa-align-left' }, { id: 'center', label: 'Center', className: 'fa fa-align-center' }, { id: 'right', label: 'Right', className: 'fa fa-align-right' }, { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }],
                            },
                            {
                                property: 'text-decoration', type: 'radio', default: 'none',
                                options: [{ id: 'none', label: 'None', className: 'fa fa-times' }, { id: 'underline', label: 'underline', className: 'fa fa-underline' }, { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }],
                            },
                            'text-shadow'
                        ],
                    },
                    { name: 'Decorations', open: false, properties: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'] },
                    { name: 'Extra', open: false, buildProps: ['transition', 'perspective', 'transform'] },
                ],
            },
            plugins: allPlugins,
            pluginsOpts: {
                'gjs-blocks-basic': { flexGrid: true },
                'grapesjs-preset-webpage': {
                    modalImportTitle: 'Import Template',
                    modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                    modalImportContent: function (editor) { return editor.getHtml() + '<style>' + editor.getCss() + '</style>' },
                },
                'grapesjs-tabs': { tabsBlock: { category: 'Extra' } },
                'grapesjs-navbar': {},
                'grapesjs-lory-slider': { sliderBlock: { category: 'Extra' } },
                'grapesjs-blocks-flexbox': {
                    flexboxBlock: {
                        category: 'Layout',
                        label: 'Flexbox',
                        attributes: { class: 'fa fa-th-large' }
                    }
                },
                'grapesjs-typed': {
                    block: {
                        category: 'Extra',
                        label: 'Typed Text',
                        attributes: { class: 'fa fa-i-cursor' },
                        content: { type: 'typed', 'type-speed': 40, strings: ['Text row one', 'Text row two', 'Text row three'] }
                    }
                },
            },
        });

        setupCoreLogic(editor);
        return editor;
    };

    function setupCoreLogic(editor) {
        var pn = editor.Panels;
        var modal = editor.Modal;
        var cmdm = editor.Commands;

        // Layer highlighting
        editor.on('component:selected', function(model) {
            if (!model) return;
            var layers = document.querySelectorAll('.gjs-layer');
            for (var i = 0; i < layers.length; i++) {
                layers[i].classList.remove('gjs-layer-selected');
            }
            var cid = model.cid;
            for (var j = 0; j < layers.length; j++) {
                if (layers[j].dataset && layers[j].dataset.id === cid) {
                    layers[j].classList.add('gjs-layer-selected');
                }
            }
        });

        cmdm.add('canvas-clear', function () {
            if (confirm('Are you sure to clean the canvas?')) {
                editor.runCommand('core:canvas-clear');
                setTimeout(function () { localStorage.removeItem('gjsProject'); }, 0);
            }
        });

        cmdm.add('open-info', function () {
            var mdlDialog = document.querySelector('.gjs-mdl-dialog');
            if (mdlDialog) mdlDialog.className += ' gjs-mdl-dialog-sm';
            var info = document.getElementById('info-panel');
            if (info) info.style.display = 'block';
            modal.setTitle('About this build');
            modal.setContent(info || 'GrapesJS Modular Editor');
            modal.open();
        });

        // Add custom buttons
        pn.addButton('options', { id: 'open-project-manager', className: 'fa fa-folder-open-o', command: 'open-project-manager', attributes: { title: 'Project Manager' } });
        pn.addButton('options', { id: 'open-info', className: 'fa fa-question-circle', command: 'open-info', attributes: { title: 'About' } });
        pn.addButton('views', { id: 'open-site-settings', className: 'fa fa-cog', command: 'open-site-settings', attributes: { title: 'Site Settings' } });

        editor.on('load', function () {
            var openSm = pn.getButton('views', 'open-sm');
            if (openSm) openSm.set('active', 1);

            // Handle Flex sector note visibility
            var updateFlexNote = function() {
                var selected = editor.getSelected();
                var flexNote = document.getElementById('flex-warning-note');
                if (selected && flexNote) {
                    var display = selected.getStyle().display || selected.getAttributes().display || '';
                    // Check computed style if not explicitly set in model
                    if (!display && selected.getEl()) {
                        display = window.getComputedStyle(selected.getEl()).display;
                    }
                    flexNote.style.display = (display === 'flex' || display === 'inline-flex') ? 'none' : 'block';
                }
            };

            editor.on('component:selected component:update:style component:style:update', updateFlexNote);

            var openBlocksBtn = pn.getButton('views', 'open-blocks');
            if (openBlocksBtn) openBlocksBtn.set('active', 1);

            // Move Traits to Style Manager as "Settings" sector
            var $ = grapesjs.$;
            if ($) {
                var traitsSector = $('<div class="gjs-sm-sector no-select gjs-open">' +
                    '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
                    '<div class="gjs-sm-properties" style="display: block;"></div></div>');
                var traitsProps = traitsSector.find('.gjs-sm-properties');

                // We'll move the Traits container once it's available
                var moveTraits = function() {
                    var $traits = $('.gjs-traits-cs, .gjs-traits-c, .gjs-trt-traits, .gjs-pn-traits-c');
                    if ($traits.length && !$.contains(traitsSector[0], $traits[0])) {
                        traitsProps.append($traits);
                    }
                };

                $('.gjs-sm-sectors').before(traitsSector);

                editor.on('load', function() {
                    setTimeout(moveTraits, 50);
                });

                editor.on('component:selected', function() {
                    moveTraits();
                });

                traitsSector.find('.gjs-sm-sector-title').on('click', function () {
                    traitsProps.toggle();
                    traitsSector.toggleClass('gjs-open');
                });
            }

            // Remove the default traits view button
            pn.removeButton('views', 'open-tm');

            // Logo & Version
            var logoCont = document.querySelector('.gjs-logo-cont');
            var logoPanel = document.querySelector('.gjs-pn-commands');
            if (logoCont && logoPanel && logoPanel.appendChild) {
                var ver = logoCont.querySelector('.gjs-logo-version');
                if (ver) ver.innerHTML = 'v' + grapesjs.version;
                try {
                    // Make sure it's visible and add it to the panel
                    logoCont.style.display = 'block';
                    logoPanel.appendChild(logoCont);
                } catch (e) {}
            }

            // Site Settings logic
            cmdm.add('open-site-settings', {
                run: function(editor, sender) {
                    if (sender) sender.set('active', true);
                    var vcEl = document.querySelector('.gjs-pn-views-container');
                    if (vcEl) vcEl.classList.add('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (ssPanel) {
                        if (vcEl && !vcEl.contains(ssPanel)) vcEl.insertBefore(ssPanel, vcEl.firstChild);
                        ssPanel.classList.add('ss-visible');
                    }
                },
                stop: function(editor, sender) {
                    if (sender) sender.set('active', false);
                    var vcEl = document.querySelector('.gjs-pn-views-container');
                    if (vcEl) vcEl.classList.remove('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (ssPanel) ssPanel.classList.remove('ss-visible');
                }
            });

            // Project Manager & Saved Blocks
            setupProjectManager(editor);
            setupSavedBlocks(editor);
            setupSiteSettingsListeners(editor);

            // Sliders
            csInitSliders(editor);
            editor.on('component:add component:update', function() { setTimeout(function() { csInitSliders(editor); }, 100); });
        });
    }

    function setupSiteSettingsListeners(editor) {
        var titles = document.querySelectorAll('.ss-section-title');
        for (var i = 0; i < titles.length; i++) {
            titles[i].addEventListener('click', function() {
                var targetId = this.getAttribute('data-ss-target');
                var body = document.getElementById(targetId);
                if (body) { body.classList.toggle('ss-open'); this.classList.toggle('ss-open'); }
            });
        }

        var applyLayout = document.getElementById('ss-apply-layout');
        if (applyLayout) {
            applyLayout.addEventListener('click', function() {
                var mw = document.getElementById('ss-layout-maxw');
                if (mw && editor.Canvas) {
                    var doc = editor.Canvas.getDocument();
                    if (doc) {
                        var styleId = 'ss-layout-style';
                        var ex = doc.getElementById(styleId); if (ex) ex.remove();
                        var s = doc.createElement('style'); s.id = styleId;
                        s.textContent = '.container-width,[class*="-inner"]{max-width:' + mw.value + '!important;margin:0 auto!important;}';
                        doc.head.appendChild(s);
                    }
                }
            });
        }
    }

    function setupProjectManager(editor) {
        var KEY = 'gjs_projects';
        function get() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e) { return []; } }
        function save(l) { localStorage.setItem(KEY, JSON.stringify(l)); }

        function render() {
            var list = get(), cont = document.getElementById('pm-project-list');
            if (!cont) return;
            if (!list.length) { cont.innerHTML = '<div class="pm-empty">No projects yet.</div>'; return; }
            cont.innerHTML = list.map(function (p, i) {
                return '<div class="pm-project-item"><div class="pm-project-info"><div class="pm-project-name">' + p.name + '</div></div><div class="pm-project-actions"><button class="pm-btn-load" data-idx="' + i + '">Load</button><button class="pm-btn-del" data-idx="' + i + '">&#128465;</button></div></div>';
            }).join('');

            var loads = cont.querySelectorAll('.pm-btn-load');
            for (var i=0; i<loads.length; i++) {
                loads[i].onclick = function() {
                    var p = get()[this.getAttribute('data-idx')];
                    if (p && confirm('Load project?')) { editor.loadProjectData(p.data); document.getElementById('pm-overlay').classList.remove('pm-visible'); }
                };
            }
            var dels = cont.querySelectorAll('.pm-btn-del');
            for (var j=0; j<dels.length; j++) {
                dels[j].onclick = function() {
                    var l = get();
                    if (confirm('Delete?')) { l.splice(this.getAttribute('data-idx'), 1); save(l); render(); }
                };
            }
        }

        editor.Commands.add('open-project-manager', {
            run: function() { render(); var ov = document.getElementById('pm-overlay'); if (ov) ov.classList.add('pm-visible'); },
            stop: function() { var ov = document.getElementById('pm-overlay'); if (ov) ov.classList.remove('pm-visible'); }
        });

        var pmClose = document.getElementById('pm-close'); if (pmClose) pmClose.onclick = function() { editor.stopCommand('open-project-manager'); };

        var saveBtn = document.getElementById('pm-save-btn');
        if (saveBtn) saveBtn.onclick = function() {
            var nameEl = document.getElementById('pm-save-name');
            var name = nameEl ? nameEl.value.trim() : '';
            if (!name) return alert('Enter name');
            var l = get(); l.push({ name: name, data: editor.getProjectData() });
            save(l); render(); if(nameEl) nameEl.value = '';
        };
    }

    function setupSavedBlocks(editor) {
        var KEY = 'gjs_saved_blocks';
        function get() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e) { return []; } }
        function set(l) { localStorage.setItem(KEY, JSON.stringify(l)); }

        function registerAll() {
            var bm = editor.BlockManager;
            var list = get();
            var blocks = bm.getAll();
            var blocksArr = blocks.models || blocks;
            if (!blocksArr || !blocksArr.length) {
                // If called too early, list might still be populated but bm.getAll() empty.
                for (var k=0; k<list.length; k++) registerOne(list[k]);
                return;
            }

            var toRemove = [];
            for (var i = 0; i < blocksArr.length; i++) {
                var b = blocksArr[i];
                var cat = b.get ? b.get('category') : b.category;
                var catLabel = (cat && typeof cat === 'object') ? (cat.get ? cat.get('label') : cat.label) : cat;
                if (catLabel === 'My Blocks') toRemove.push(b.id || (b.get ? b.get('id') : null));
            }
            for (var j=0; j<toRemove.length; j++) if(toRemove[j]) bm.remove(toRemove[j]);
            for (var m=0; m<list.length; m++) registerOne(list[m]);
        }

        function registerOne(block) {
            editor.BlockManager.add(block.id, {
                label: '<div style="font-size:11px">' + block.name + '</div><span class="sb-block-del" data-sb-id="' + block.id + '">&#10005;</span>',
                category: 'My Blocks', attributes: { class: 'fa fa-bookmark', 'data-sb-custom': '1' }, content: block.html
            });
        }

        editor.on('component:selected', function (component) {
            if (!component) return;
            var toolbar = component.get('toolbar');
            var exists = false;
            for (var i=0; i<toolbar.length; i++) if (toolbar[i].id === 'sb-toolbar-save') exists = true;
            if (exists) return;

            toolbar.splice(toolbar.length - 1, 0, {
                id: 'sb-toolbar-save',
                label: '<i class="fa fa-bookmark"></i>',
                attributes: { title: 'Save as Block' },
                command: function () {
                    var sel = editor.getSelected(); if (!sel) return;
                    var inp = document.getElementById('sb-name-input');
                    if (inp) {
                        inp.value = sel.getName ? sel.getName() : (sel.get ? sel.get('type') : 'My Block');
                        var ov = document.getElementById('sb-name-overlay');
                        if (ov) ov.classList.add('sb-visible');
                    }
                }
            });
            component.set('toolbar', toolbar);
        });

        var sbConfirm = document.getElementById('sb-name-confirm');
        if (sbConfirm) sbConfirm.onclick = function() {
            var sel = editor.getSelected();
            var nameEl = document.getElementById('sb-name-input');
            var name = nameEl ? nameEl.value.trim() : '';
            if (!name || !sel) return;
            var id = 'sb-' + Date.now(), html = sel.toHTML ? sel.toHTML() : '', css = editor.CodeManager.getCode(sel, 'css') || '';
            var l = get(); l.push({ id: id, name: name, html: html + '<style>' + css + '</style>' });
            set(l); registerOne(l[l.length-1]);
            var ov = document.getElementById('sb-name-overlay'); if (ov) ov.classList.remove('sb-visible');
        };

        var sbCancel = document.getElementById('sb-name-cancel');
        if (sbCancel) sbCancel.onclick = function() {
            var ov = document.getElementById('sb-name-overlay'); if (ov) ov.classList.remove('sb-visible');
        };

        registerAll();

        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList && e.target.classList.contains('sb-block-del')) {
                var id = e.target.getAttribute('data-sb-id');
                if (id && confirm('Delete block?')) {
                    set(get().filter(function(b) { return b.id !== id; }));
                    registerAll();
                }
            }
        });
    }
})();
