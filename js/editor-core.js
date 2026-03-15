(function() {
    // Helper: Initialize Sliders (Media and Extra blocks)
    function csInitSliders(editor) {
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
                                dots[d].classList.toggle(cfg.dotOn, d === idx);
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
        var images = [
            lp + 'team1.jpg', lp + 'team2.jpg', lp + 'team3.jpg',
            plp + '78c5d6/fff', plp + '459ba8/fff', plp + '79c267/fff',
            plp + 'c5d647/fff', plp + 'f28c33/fff', plp + 'e868a2/fff',
            plp + 'cc4360/fff', lp + 'work-desk.jpg', lp + 'phone-app.png',
            lp + 'bg-gr-v.png'
        ];

        // Standard GrapesJS Plugins
        var basePlugins = [
            'gjs-blocks-basic', 'grapesjs-plugin-forms', 'grapesjs-component-countdown',
            'grapesjs-plugin-export', 'grapesjs-tabs', 'grapesjs-custom-code',
            'grapesjs-touch', 'grapesjs-parser-postcss', 'grapesjs-tooltip',
            'grapesjs-tui-image-editor', 'grapesjs-typed', 'grapesjs-style-bg',
            'grapesjs-navbar', 'grapesjs-lory-slider', 'grapesjs-blocks-flexbox',
            'grapesjs-style-filter', 'grapesjs-preset-webpage'
        ];

        // Combine with dynamic plugins
        var allPlugins = basePlugins.concat(pluginList || []);

        var editor = grapesjs.init({
            height: '100%',
            container: '#gjs',
            fromElement: true,
            showOffsets: true,
            assetManager: { embedAsBase64: true, assets: images },
            selectorManager: { componentFirst: true },
            styleManager: {
                sectors: [
                    {
                        name: 'General',
                        properties: [
                            {
                                extend: 'float', type: 'radio', default: 'none',
                                options: [
                                    { value: 'none', className: 'fa fa-times' },
                                    { value: 'left', className: 'fa fa-align-left' },
                                    { value: 'right', className: 'fa fa-align-right' }
                                ],
                            },
                            'display', { extend: 'position', type: 'select' },
                            'top', 'right', 'left', 'bottom',
                            { property: 'z-index', name: 'Z-Index', type: 'integer', default: 'auto' },
                        ],
                    },
                    {
                        name: 'Dimension', open: false,
                        properties: [
                            'width', { id: 'flex-width', type: 'integer', name: 'Width', units: ['px', '%'], property: 'flex-basis', toRequire: 1 },
                            'height', 'max-width', 'min-height', 'margin', 'padding'
                        ],
                    },
                    {
                        name: 'Typography', open: false,
                        properties: [
                            'font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height',
                            {
                                extend: 'text-align',
                                options: [
                                    { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                                    { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                                    { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                                    { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
                                ],
                            },
                            {
                                property: 'text-decoration', type: 'radio', default: 'none',
                                options: [
                                    { id: 'none', label: 'None', className: 'fa fa-times' },
                                    { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                                    { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
                                ],
                            },
                            'text-shadow'
                        ],
                    },
                    { name: 'Decorations', open: false, properties: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'] },
                    { name: 'Extra', open: false, buildProps: ['transition', 'perspective', 'transform'] },
                    {
                        name: 'Flex', open: false,
                        properties: [
                            { name: 'Flex Container', property: 'display', type: 'select', defaults: 'block', list: [{ value: 'block', name: 'Disable' }, { value: 'flex', name: 'Enable' }] },
                            { name: 'Flex Parent', property: 'label-parent-flex', type: 'integer' },
                            {
                                name: 'Direction', property: 'flex-direction', type: 'radio', defaults: 'row',
                                list: [
                                    { value: 'row', name: 'Row', className: 'icons-flex icon-dir-row', title: 'Row' },
                                    { value: 'row-reverse', name: 'Row reverse', className: 'icons-flex icon-dir-row-rev', title: 'Row reverse' },
                                    { value: 'column', name: 'Column', title: 'Column', className: 'icons-flex icon-dir-col' },
                                    { value: 'column-reverse', name: 'Column reverse', title: 'Column reverse', className: 'icons-flex icon-dir-col-rev' }
                                ],
                            },
                            {
                                name: 'Justify', property: 'justify-content', type: 'radio', defaults: 'flex-start',
                                list: [
                                    { value: 'flex-start', className: 'icons-flex icon-just-start', title: 'Start' },
                                    { value: 'flex-end', title: 'End', className: 'icons-flex icon-just-end' },
                                    { value: 'space-between', title: 'Space between', className: 'icons-flex icon-just-sp-bet' },
                                    { value: 'space-around', title: 'Space around', className: 'icons-flex icon-just-sp-ar' },
                                    { value: 'center', title: 'Center', className: 'icons-flex icon-just-sp-cent' }
                                ],
                            },
                            {
                                name: 'Align', property: 'align-items', type: 'radio', defaults: 'center',
                                list: [
                                    { value: 'flex-start', title: 'Start', className: 'icons-flex icon-al-start' },
                                    { value: 'flex-end', title: 'End', className: 'icons-flex icon-al-end' },
                                    { value: 'stretch', title: 'Stretch', className: 'icons-flex icon-al-str' },
                                    { value: 'center', title: 'Center', className: 'icons-flex icon-al-center' }
                                ],
                            },
                            { name: 'Flex Children', property: 'label-parent-flex', type: 'integer' },
                            { name: 'Order', property: 'order', type: 'integer', defaults: 0, min: 0 },
                            {
                                name: 'Flex', property: 'flex', type: 'composite',
                                properties: [
                                    { name: 'Grow', property: 'flex-grow', type: 'integer', defaults: 0, min: 0 },
                                    { name: 'Shrink', property: 'flex-shrink', type: 'integer', defaults: 0, min: 0 },
                                    { name: 'Basis', property: 'flex-basis', type: 'integer', units: ['px', '%', ''], unit: '', defaults: 'auto' }
                                ],
                            },
                            {
                                name: 'Align', property: 'align-self', type: 'radio', defaults: 'auto',
                                list: [
                                    { value: 'auto', name: 'Auto' },
                                    { value: 'flex-start', title: 'Start', className: 'icons-flex icon-al-start' },
                                    { value: 'flex-end', title: 'End', className: 'icons-flex icon-al-end' },
                                    { value: 'stretch', title: 'Stretch', className: 'icons-flex icon-al-str' },
                                    { value: 'center', title: 'Center', className: 'icons-flex icon-al-center' }
                                ],
                            }
                        ]
                    }
                ],
            },
            plugins: allPlugins,
            pluginsOpts: {
                'gjs-blocks-basic': { flexGrid: true },
                'grapesjs-tui-image-editor': {
                    script: [
                        'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
                        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
                        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
                    ],
                    style: [
                        'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
                        'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
                    ],
                },
                'grapesjs-tabs': { tabsBlock: { category: 'Extra' } },
                'grapesjs-typed': {
                    block: {
                        category: 'Extra',
                        content: { type: 'typed', 'type-speed': 40, strings: ['Text row one', 'Text row two', 'Text row three'] }
                    }
                },
                'grapesjs-preset-webpage': {
                    modalImportTitle: 'Import Template',
                    modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
                    modalImportContent: function (editor) { return editor.getHtml() + '<style>' + editor.getCss() + '</style>' },
                },
                'grapesjs-navbar': {},
                'grapesjs-lory-slider': { sliderBlock: { category: 'Extra' } },
                'grapesjs-blocks-flexbox': { flexboxBlock: { category: 'Layout', label: 'Flexbox', media: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h20v4H2zm0 6h6v12H2zm8 0h6v5h-6zm8 0h4v12h-4zm-8 7h6v5h-6z"/></svg>' } },
                'grapesjs-style-filter': {},
            },
        });

        // UI & Core Logic
        setupCoreLogic(editor);
        return editor;
    };

    function setupCoreLogic(editor) {
        var pn = editor.Panels;
        var modal = editor.Modal;
        var cmdm = editor.Commands;

        // I18n
        editor.I18n.addMessages({
            en: { styleManager: { properties: { 'background-repeat': 'Repeat', 'background-position': 'Position', 'background-attachment': 'Attachment', 'background-size': 'Size' } } }
        });

        // Layer highlighting
        editor.on('component:selected', function(model) {
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

        // Commands
        cmdm.add('canvas-clear', function () {
            if (confirm('Are you sure to clean the canvas?')) {
                editor.runCommand('core:canvas-clear');
                setTimeout(function () { localStorage.removeItem('gjsProject'); }, 0);
            }
        });

        var mdlClass = 'gjs-mdl-dialog-sm';
        var infoContainer = document.getElementById('info-panel');
        cmdm.add('open-info', function () {
            var mdlDialog = document.querySelector('.gjs-mdl-dialog');
            mdlDialog.className += ' ' + mdlClass;
            if (infoContainer) infoContainer.style.display = 'block';
            modal.setTitle('About this demo');
            modal.setContent(infoContainer || 'GrapesJS Editor');
            modal.open();
            modal.getModel().once('change:open', function () { mdlDialog.className = mdlDialog.className.replace(mdlClass, ''); })
        });

        // Panels & Buttons
        pn.addButton('options', { id: 'open-project-manager', className: 'fa fa-folder-open-o', command: 'open-project-manager', attributes: { title: 'Project Manager', 'data-tooltip-pos': 'bottom' } });
        pn.addButton('options', { id: 'open-info', className: 'fa fa-question-circle', command: function () { editor.runCommand('open-info') }, attributes: { 'title': 'About', 'data-tooltip-pos': 'bottom' } });

        // Tooltips cleanup
        var tooltipItems = [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'], ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'], ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']];
        for (var k = 0; k < tooltipItems.length; k++) {
            var btn = pn.getButton('options', tooltipItems[k][0]);
            if (btn) btn.set('attributes', { title: tooltipItems[k][1], 'data-tooltip-pos': 'bottom' });
        }

        var viewItems = [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks'], ['open-site-settings', 'Site Settings']];
        for (var l = 0; l < viewItems.length; l++) {
            var vBtn = pn.getButton('views', viewItems[l][0]);
            if (vBtn) vBtn.set('attributes', { title: viewItems[l][1], 'data-tooltip-pos': 'bottom' });
        }

        var titles = document.querySelectorAll('*[title]');
        for (var i = 0; i < titles.length; i++) {
            var el = titles[i];
            var title = el.getAttribute('title');
            if (title) {
                el.setAttribute('data-tooltip', title.trim());
                el.setAttribute('title', '');
            }
        }

        // On Load Logic
        editor.on('load', function () {
            var $ = grapesjs.$;
            var swBtn = pn.getButton('options', 'sw-visibility');
            if (swBtn) swBtn.set({ command: 'core:component-outline', 'active': true });

            var logoCont = document.querySelector('.gjs-logo-cont');
            if (logoCont) {
                var ver = document.querySelector('.gjs-logo-version');
                if (ver) ver.innerHTML = 'v' + grapesjs.version;
                var logoPanel = document.querySelector('.gjs-pn-commands');
                if (logoPanel) logoPanel.appendChild(logoCont);
            }

            var openTmBtn = pn.getButton('views', 'open-tm');
            if (openTmBtn) openTmBtn.set('active', 1);
            var openSm = pn.getButton('views', 'open-sm');
            if (openSm) openSm.set('active', 1);

            pn.removeButton('views', 'open-tm');

            var traitsSector = $('<div class="gjs-sm-sector no-select">' +
                '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
                '<div class="gjs-sm-properties" style="display: none;"></div></div>');
            var traitsProps = traitsSector.find('.gjs-sm-properties');
            traitsProps.append($('.gjs-traits-cs'));
            $('.gjs-sm-sectors').before(traitsSector);
            traitsSector.find('.gjs-sm-sector-title').on('click', function () {
                var traitStyle = traitsProps.get(0).style;
                traitStyle.display = traitStyle.display == 'none' ? 'block' : 'none';
            });

            var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
            if (openBlocksBtn) openBlocksBtn.set('active', 1);

            // -- Site Settings Panel Logic --
            pn.addButton('views', { id: 'open-site-settings', className: 'fa fa-cog', command: 'open-site-settings', attributes: { title: 'Site Settings', 'data-tooltip-pos': 'bottom' }, active: false });

            editor.Commands.add('open-site-settings', {
                run: function (editor, sender) {
                    if (sender) sender.set('active', true);
                    window._ssBlockCategoryState = {};
                    var categories = document.querySelectorAll('.gjs-block-category');
                    for (var i = 0; i < categories.length; i++) {
                        var cat = categories[i];
                        var label = cat.querySelector('.gjs-title');
                        var labelText = label ? label.textContent.trim() : cat.className;
                        window._ssBlockCategoryState[labelText] = cat.classList.contains('gjs-open');
                    }
                    var vcEl = document.querySelector('.gjs-pn-views-container') || document.getElementById('gjs-pn-views-container');
                    if (vcEl) vcEl.classList.add('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (vcEl && ssPanel && !vcEl.contains(ssPanel)) vcEl.insertBefore(ssPanel, vcEl.firstChild);
                    if (ssPanel) ssPanel.classList.add('ss-visible');
                },
                stop: function (editor, sender) {
                    if (sender) sender.set('active', false);
                    var vcEl = document.querySelector('.gjs-pn-views-container') || document.getElementById('gjs-pn-views-container');
                    if (vcEl) vcEl.classList.remove('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (ssPanel) ssPanel.classList.remove('ss-visible');
                }
            });

            var viewBtns = ['open-sm', 'open-layers', 'open-blocks'];
            for (var m = 0; m < viewBtns.length; m++) {
                (function(btnId) {
                    var btn = pn.getButton('views', btnId);
                    if (!btn) return;
                    btn.on('change:active', function () {
                        if (btn.get('active')) {
                            var ssPanel = document.getElementById('site-settings-panel');
                            if (ssPanel) ssPanel.classList.remove('ss-visible');
                            var ssBtn = pn.getButton('views', 'open-site-settings');
                            if (ssBtn) ssBtn.set('active', false);
                            if (btnId === 'open-blocks' && window._ssBlockCategoryState) {
                                setTimeout(function () {
                                    var categories = document.querySelectorAll('.gjs-block-category');
                                    for (var i = 0; i < categories.length; i++) {
                                        var cat = categories[i];
                                        var label = cat.querySelector('.gjs-title');
                                        var labelText = label ? label.textContent.trim() : cat.className;
                                        var wasOpen = window._ssBlockCategoryState[labelText];
                                        if (wasOpen !== cat.classList.contains('gjs-open')) {
                                            if (label) label.click();
                                        }
                                    }
                                }, 50);
                            }
                        }
                    });
                })(viewBtns[m]);
            }

            // Site Settings UI Listeners
            setupSiteSettingsListeners(editor);

            // Project Manager Logic
            setupProjectManager(editor);

            // Saved Blocks Logic
            setupSavedBlocks(editor);

            // Sliders init
            csInitSliders(editor);
            editor.on('component:add component:update', function () { setTimeout(function() { csInitSliders(editor); }, 100); });
            var frame = editor.Canvas.getFrameEl();
            if (frame) {
                frame.addEventListener('load', function () { setTimeout(function() { csInitSliders(editor); }, 200); });
            }
        });
    }

    function setupSiteSettingsListeners(editor) {
        var titles = document.querySelectorAll('.ss-section-title');
        for (var i = 0; i < titles.length; i++) {
            titles[i].addEventListener('click', function () {
                var targetId = this.getAttribute('data-ss-target');
                var body = document.getElementById(targetId);
                if (body) { body.classList.toggle('ss-open'); this.classList.toggle('ss-open'); }
            });
        }

        var pickers = document.querySelectorAll('.ss-color-swatch input[type="color"]');
        for (var j = 0; j < pickers.length; j++) {
            (function(picker) {
                var varName = picker.getAttribute('data-ss-colorvar');
                var swatch = picker.parentElement;
                var hexInput = document.querySelector('[data-ss-colorhex="' + varName + '"]');
                picker.addEventListener('input', function () {
                    swatch.style.background = picker.value;
                    if (hexInput) hexInput.value = picker.value;
                });
                if (hexInput) {
                    hexInput.addEventListener('input', function () {
                        var v = hexInput.value.trim();
                        if (/^#[0-9a-fA-F]{6}$/.test(v)) { picker.value = v; swatch.style.background = v; }
                    });
                }
            })(pickers[j]);
        }

        var bgTypeSelect = document.getElementById('ss-bg-type');
        if (bgTypeSelect) bgTypeSelect.addEventListener('change', function() {
            var t = bgTypeSelect.value;
            var cWrap = document.getElementById('ss-bg-color-wrap');
            var gWrap = document.getElementById('ss-bg-gradient-wrap');
            var iWrap = document.getElementById('ss-bg-image-wrap');
            if (cWrap) cWrap.style.display = t === 'color' ? '' : 'none';
            if (gWrap) gWrap.style.display = t === 'gradient' ? '' : 'none';
            if (iWrap) iWrap.style.display = t === 'image' ? '' : 'none';
        });

        // Apply Buttons
        var applyColors = document.getElementById('ss-apply-colors');
        if (applyColors) applyColors.addEventListener('click', function () {
            var vars = '';
            var rows = document.querySelectorAll('#ss-color-list .ss-color-row');
            for (var i = 0; i < rows.length; i++) {
                var picker = rows[i].querySelector('input[type="color"]');
                var varName = picker ? picker.getAttribute('data-ss-colorvar') : null;
                if (varName) vars += varName + ':' + picker.value + ';';
            }
            injectCSS(editor, 'ss-global-colors', ':root{' + vars + '}');
        });

        var applyFonts = document.getElementById('ss-apply-fonts');
        if (applyFonts) applyFonts.addEventListener('click', function () {
            var hEl = document.getElementById('ss-font-heading');
            var bEl = document.getElementById('ss-font-body');
            if (!hEl || !bEl) return;
            var headingFont = hEl.value;
            var bodyFont = bEl.value;
            var monoFont = document.getElementById('ss-font-mono') ? document.getElementById('ss-font-mono').value : 'monospace';
            var gUrlEl = document.getElementById('ss-gfont-url');
            var gfontUrl = gUrlEl ? gUrlEl.value.trim() : '';
            var doc = editor.Canvas.getDocument();
            if (!doc) return;
            var existingLink = doc.getElementById('ss-gfont-link');
            if (existingLink) existingLink.remove();
            if (gfontUrl) {
                var link = doc.createElement('link');
                link.id = 'ss-gfont-link'; link.rel = 'stylesheet'; link.href = gfontUrl;
                doc.head.appendChild(link);
            }
            var css = ':root{--font-heading:' + headingFont + ';--font-body:' + bodyFont + ';--font-mono:' + monoFont + ';}' +
                      'body{font-family:' + bodyFont + '!important;}' +
                      'h1,h2,h3,h4,h5,h6{font-family:' + headingFont + '!important;}' +
                      'code,pre{font-family:' + monoFont + '!important;}';
            injectCSS(editor, 'ss-global-fonts', css);
        });

        var applyTypo = document.getElementById('ss-apply-typo');
        if (applyTypo) applyTypo.addEventListener('click', function () {
            var bSize = document.getElementById('ss-typo-base');
            var lH = document.getElementById('ss-typo-lh');
            if (!bSize || !lH) return;
            var base = bSize.value, lh = lH.value;
            var h1El = document.getElementById('ss-typo-h1');
            var h1 = h1El ? h1El.value : '2em';
            var css = 'body{font-size:' + base + '!important;line-height:' + lh + '!important;}' +
                      'h1{font-size:' + h1 + '!important;}';
            injectCSS(editor, 'ss-typography', css);
        });

        var applyBtns = document.getElementById('ss-apply-buttons');
        if (applyBtns) applyBtns.addEventListener('click', function () {
            var bgElement = document.getElementById('ss-btn-bg');
            var colElement = document.getElementById('ss-btn-color');
            if (bgElement && colElement) {
                var bg = bgElement.value, col = colElement.value;
                var css = 'button,.btn,[class*="btn"],[class*="-btn"]{background-color:' + bg + '!important;color:' + col + '!important;border:none;cursor:pointer;transition:all .3s ease;}';
                injectCSS(editor, 'ss-buttons-style', css);
            }
        });

        var applyImg = document.getElementById('ss-apply-images');
        if (applyImg) applyImg.addEventListener('click', function () {
            var brEl = document.getElementById('ss-img-br');
            var fitEl = document.getElementById('ss-img-fit');
            var br = brEl ? brEl.value : '0px';
            var fit = fitEl ? fitEl.value : 'cover';
            var css = 'img{border-radius:' + br + '!important;object-fit:' + fit + '!important;}';
            injectCSS(editor, 'ss-images-style', css);
        });

        var applyBg = document.getElementById('ss-apply-bg');
        if (applyBg) applyBg.addEventListener('click', function () {
            var typeSelect = document.getElementById('ss-bg-type');
            if (typeSelect) {
                var type = typeSelect.value, css = '';
                if (type === 'color') {
                    var cEl = document.getElementById('ss-bg-color');
                    if (cEl) css = 'body{background:' + cEl.value + '!important;}';
                }
                else if (type === 'gradient') {
                    var gcEl = document.getElementById('ss-bg-gradient-custom');
                    var gEl = document.getElementById('ss-bg-gradient');
                    var gc = gcEl ? gcEl.value.trim() : '';
                    var g = gEl ? gEl.value : '';
                    css = 'body{background:' + (gc || g) + '!important;}';
                }
                else if (type === 'image') {
                    var iEl = document.getElementById('ss-bg-img-url');
                    if (iEl) css = 'body{background-image:url("' + iEl.value + '")!important;background-size:cover!important;background-repeat:no-repeat!important;}';
                }
                injectCSS(editor, 'ss-background-style', css);
            }
        });

        var applyLayout = document.getElementById('ss-apply-layout');
        if (applyLayout) applyLayout.addEventListener('click', function () {
            var mwEl = document.getElementById('ss-layout-maxw');
            if (!mwEl) return;
            var maxw = mwEl.value || '1150px';
            var css = ':root {--layout-maxw:'+maxw+';}' +
                      '.container-width,[class*="-inner"],[class*="__inner"],.cs-section-inner{max-width:'+maxw+'!important;margin-left:auto!important;margin-right:auto!important;box-sizing:border-box!important;}';
            injectCSS(editor, 'ss-layout-style', css);
        });

        var applyCss = document.getElementById('ss-apply-css');
        if (applyCss) applyCss.addEventListener('click', function () {
            var cEl = document.getElementById('ss-custom-css');
            if (cEl) injectCSS(editor, 'ss-custom-css-style', cEl.value);
        });
    }

    function injectCSS(editor, id, css) {
        var doc = editor.Canvas.getDocument();
        if (!doc) return;
        var existing = doc.getElementById(id);
        if (existing) existing.parentNode.removeChild(existing);
        var style = doc.createElement('style');
        style.id = id; style.textContent = css;
        doc.head.appendChild(style);
    }

    function setupProjectManager(editor) {
        var PM_KEY = 'gjs_projects';
        function get() { try { return JSON.parse(localStorage.getItem(PM_KEY) || '[]'); } catch(e) { return []; } }
        function save(l) { localStorage.setItem(PM_KEY, JSON.stringify(l)); }

        function render() {
            var list = get(), container = document.getElementById('pm-project-list');
            if (!container) return;
            if (!list.length) { container.innerHTML = '<div class="pm-empty"><i class="fa fa-folder-open-o"></i>No saved projects yet.</div>'; return; }
            container.innerHTML = list.map(function (p, i) {
                var d = new Date(p.ts);
                return '<div class="pm-project-item"><i class="fa fa-file-code-o pm-project-icon"></i><div class="pm-project-info"><div class="pm-project-name">' + p.name + '</div><div class="pm-project-meta">Saved: ' + d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</div></div><div class="pm-project-actions"><button class="pm-project-btn pm-project-btn-load" data-idx="' + i + '">Load</button><button class="pm-project-btn pm-project-btn-del" data-idx="' + i + '">&#128465;</button></div></div>';
            }).join('');

            var loadBtns = container.querySelectorAll('.pm-project-btn-load');
            for (var i = 0; i < loadBtns.length; i++) {
                loadBtns[i].addEventListener('click', function () {
                    var idx = parseInt(this.getAttribute('data-idx')), proj = get()[idx];
                    if (proj && confirm('Load "' + proj.name + '"? Unsaved changes will be lost.')) { editor.loadProjectData(proj.data); close(); toastr.success('Project loaded.'); }
                });
            }
            var delBtns = container.querySelectorAll('.pm-project-btn-del');
            for (var j = 0; j < delBtns.length; j++) {
                delBtns[j].addEventListener('click', function () {
                    var idx = parseInt(this.getAttribute('data-idx')), l = get(), name = l[idx].name;
                    if (confirm('Delete "' + name + '"?')) { l.splice(idx, 1); save(l); render(); toastr.warning('Project deleted.'); }
                });
            }
        }

        function open() { render(); var el = document.getElementById('pm-overlay'); if (el) el.classList.add('pm-visible'); }
        function close() { var el = document.getElementById('pm-overlay'); if (el) el.classList.remove('pm-visible'); }

        editor.Commands.add('open-project-manager', { run: open, stop: close });
        var pmClose = document.getElementById('pm-close');
        if (pmClose) pmClose.addEventListener('click', close);
        var pmOverlay = document.getElementById('pm-overlay');
        if (pmOverlay) pmOverlay.addEventListener('click', function (e) { if (e.target === this) close(); });

        var pmTabs = document.querySelectorAll('.pm-tab');
        for (var k = 0; k < pmTabs.length; k++) {
            pmTabs[k].addEventListener('click', function () {
                var tabs = document.querySelectorAll('.pm-tab');
                for (var l = 0; l < tabs.length; l++) tabs[l].classList.remove('pm-tab-active');
                var panes = document.querySelectorAll('.pm-pane');
                for (var m = 0; m < panes.length; m++) panes[m].classList.remove('pm-pane-active');
                this.classList.add('pm-tab-active');
                var pane = document.getElementById(this.getAttribute('data-pm-tab'));
                if (pane) pane.classList.add('pm-pane-active');
            });
        }

        var saveBtn = document.getElementById('pm-save-btn');
        if (saveBtn) saveBtn.addEventListener('click', function () {
            var nameInput = document.getElementById('pm-save-name'), name = nameInput.value.trim();
            if (!name) { toastr.warning('Please enter a project name.'); return; }
            var list = get(), existing = -1;
            for (var i = 0; i < list.length; i++) if (list[i].name === name) existing = i;
            var entry = { name: name, ts: Date.now(), data: editor.getProjectData() };
            if (existing >= 0) list[existing] = entry; else list.push(entry);
            save(list); nameInput.value = ''; render();
            toastr.success('Project saved.');
        });

        var exportJson = document.getElementById('pm-export-json');
        if (exportJson) exportJson.addEventListener('click', function () {
            var data = JSON.stringify(editor.getProjectData(), null, 2), blob = new Blob([data], { type: 'application/json' });
            var url = URL.createObjectURL(blob), a = document.createElement('a');
            var sName = document.getElementById('pm-save-name');
            a.href = url; a.download = (sName ? sName.value.trim() : 'project') + '.json'; a.click();
            URL.revokeObjectURL(url);
        });

        var exportHtml = document.getElementById('pm-export-html');
        if (exportHtml) exportHtml.addEventListener('click', function () {
            var full = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Exported Page</title>\n<style>\n' + editor.getCss() + '\n</style>\n</head>\n<body>\n' + editor.getHtml() + '\n</body>\n</html>';
            var blob = new Blob([full], { type: 'text/html' }), url = URL.createObjectURL(blob), a = document.createElement('a');
            a.href = url; a.download = 'page.html'; a.click(); URL.revokeObjectURL(url);
        });

        var importBtn = document.getElementById('pm-import-btn');
        if (importBtn) importBtn.addEventListener('click', function () { var f = document.getElementById('pm-import-file'); if (f) f.click(); });
        var importFile = document.getElementById('pm-import-file');
        if (importFile) importFile.addEventListener('change', function () {
            var file = this.files[0]; if (!file) return;
            var reader = new FileReader();
            reader.onload = function (e) {
                try { var data = JSON.parse(e.target.result); if (confirm('Import "' + file.name + '"?')) { editor.loadProjectData(data); close(); } } catch (err) { toastr.error('Invalid JSON.'); }
            };
            reader.readAsText(file); this.value = '';
        });
    }

    function setupSavedBlocks(editor) {
        var SB_KEY = 'gjs_saved_blocks';
        function get() { try { return JSON.parse(localStorage.getItem(SB_KEY) || '[]'); } catch(e) { return []; } }
        function set(l) { localStorage.setItem(SB_KEY, JSON.stringify(l)); }

        function registerAll() {
            var bm = editor.BlockManager;
            var list = get();
            var blocks = bm.getAll();
            if (blocks.models) blocks = blocks.models; // Handle Backbone Collection

            var toRemove = [];
            for (var i = 0; i < blocks.length; i++) {
                var cat = blocks[i].get('category');
                var catLabel = (cat && typeof cat === 'object') ? cat.label : cat;
                if (catLabel === 'My Blocks') {
                    toRemove.push(blocks[i].id || blocks[i].get('id'));
                }
            }
            for (var k = 0; k < toRemove.length; k++) {
                bm.remove(toRemove[k]);
            }
            for (var j = 0; j < list.length; j++) registerOne(list[j]);
        }

        function registerOne(block) {
            editor.BlockManager.add(block.id, {
                label: '<div style="font-size:11px;font-weight:700;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + block.name + '</div><span class="sb-block-del" data-sb-id="' + block.id + '">&#10005;</span>',
                category: 'My Blocks', attributes: { class: 'fa fa-bookmark', 'data-sb-custom': '1' }, content: block.html
            });
        }

        editor.on('component:selected', function (component) {
            var toolbar = component.get('toolbar');
            var already = false;
            for (var i = 0; i < toolbar.length; i++) if (toolbar[i].id === 'sb-toolbar-save') already = true;
            if (already) return;
            toolbar.splice(toolbar.length - 1, 0, {
                id: 'sb-toolbar-save',
                label: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10v4z"/></svg>',
                attributes: { title: 'Save as Block' },
                command: function () {
                    var sel = editor.getSelected(); if (!sel) return;
                    var input = document.getElementById('sb-name-input');
                    if (input) {
                        input.value = sel.getName() || sel.get('type') || 'My Block';
                        var overlay = document.getElementById('sb-name-overlay');
                        if (overlay) overlay.classList.add('sb-visible');
                        setTimeout(function () { input.focus(); input.select(); }, 50);
                    }
                }
            });
            component.set('toolbar', toolbar);
        });

        var sbConfirm = document.getElementById('sb-name-confirm');
        if (sbConfirm) sbConfirm.addEventListener('click', function() {
            var sel = editor.getSelected(), nameInput = document.getElementById('sb-name-input');
            if (!nameInput) return;
            var name = nameInput.value.trim();
            if (!name || !sel) return;
            var html = sel.toHTML(), css = editor.CodeManager.getCode(sel, 'css') || '', id = 'sb-custom-' + Date.now();
            var list = get(); list.push({ id: id, name: name, html: html + (css ? '<style>' + css + '</style>' : ''), ts: Date.now() });
            set(list); registerOne({ id: id, name: name, html: html + (css ? '<style>' + css + '</style>' : '') });
            var overlay = document.getElementById('sb-name-overlay');
            if (overlay) overlay.classList.remove('sb-visible');
            toastr.success('Saved to My Blocks!');
        });
        var sbCancel = document.getElementById('sb-name-cancel');
        if (sbCancel) sbCancel.addEventListener('click', function() { var el = document.getElementById('sb-name-overlay'); if (el) el.classList.remove('sb-visible'); });

        registerAll();
        editor.on('block:custom', registerAll);

        // Delete action
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('sb-block-del')) {
                var id = e.target.getAttribute('data-sb-id');
                if (confirm('Delete this block?')) {
                    set(get().filter(function(b) { return b.id !== id; }));
                    registerAll(); toastr.warning('Block deleted.');
                }
            }
        });
    }
})();
