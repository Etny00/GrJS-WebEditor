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

        configs.forEach(function (cfg) {
            doc.querySelectorAll(cfg.wrap).forEach(function (el) {
                if (el._csInited) return;
                el._csInited = true;
                el.setAttribute('data-cur', '0');
                var track = el.querySelector(cfg.track);
                var slides = track ? track.children : [];
                var n = slides.length;
                if (!track || n === 0) return;

                function goTo(i) {
                    i = ((i % n) + n) % n;
                    el.setAttribute('data-cur', i);
                    track.style.transform = 'translateX(-' + (i * 100) + '%)';
                    if (cfg.dot) {
                        el.querySelectorAll(cfg.dot).forEach(function (d, j) {
                            d.classList.toggle(cfg.dotOn, j === i);
                        });
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
                    el.querySelectorAll(cfg.dot).forEach(function (d, idx) {
                        d.addEventListener('click', function (e) {
                            e.stopPropagation();
                            goTo(idx);
                        });
                    });
                }
            });
        });
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
            document.querySelectorAll('.gjs-layer').forEach(function(el) { el.classList.remove('gjs-layer-selected'); });
            var cid = model.cid;
            document.querySelectorAll('.gjs-layer').forEach(function(el) { if (el.dataset && el.dataset.id === cid) { el.classList.add('gjs-layer-selected'); } });
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
            infoContainer.style.display = 'block';
            modal.setTitle('About this demo');
            modal.setContent(infoContainer);
            modal.open();
            modal.getModel().once('change:open', function () { mdlDialog.className = mdlDialog.className.replace(mdlClass, ''); })
        });

        // Panels & Buttons
        pn.addButton('options', { id: 'open-project-manager', className: 'fa fa-folder-open-o', command: 'open-project-manager', attributes: { title: 'Project Manager', 'data-tooltip-pos': 'bottom' } });
        pn.addButton('options', { id: 'open-info', className: 'fa fa-question-circle', command: function () { editor.runCommand('open-info') }, attributes: { 'title': 'About', 'data-tooltip-pos': 'bottom' } });

        // Tooltips cleanup
        [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'], ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'], ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
        .forEach(function (item) {
            var btn = pn.getButton('options', item[0]);
            if (btn) btn.set('attributes', { title: item[1], 'data-tooltip-pos': 'bottom' });
        });

        [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks'], ['open-site-settings', 'Site Settings']]
        .forEach(function (item) { var btn = pn.getButton('views', item[0]); btn && btn.set('attributes', { title: item[1], 'data-tooltip-pos': 'bottom' }); });

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
                document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
                var logoPanel = document.querySelector('.gjs-pn-commands');
                if (logoPanel) logoPanel.appendChild(logoCont);
            }

            var openTmBtn = pn.getButton('views', 'open-tm');
            openTmBtn && openTmBtn.set('active', 1);
            var openSm = pn.getButton('views', 'open-sm');
            openSm && openSm.set('active', 1);

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
            openBlocksBtn && openBlocksBtn.set('active', 1);

            // -- Site Settings Panel Logic --
            pn.addButton('views', { id: 'open-site-settings', className: 'fa fa-cog', command: 'open-site-settings', attributes: { title: 'Site Settings', 'data-tooltip-pos': 'bottom' }, active: false });

            editor.Commands.add('open-site-settings', {
                run: function (editor, sender) {
                    sender && sender.set('active', true);
                    window._ssBlockCategoryState = {};
                    document.querySelectorAll('.gjs-block-category').forEach(function (cat) {
                        var label = cat.querySelector('.gjs-title');
                        var labelText = label ? label.textContent.trim() : cat.className;
                        window._ssBlockCategoryState[labelText] = cat.classList.contains('gjs-open');
                    });
                    var vcEl = document.querySelector('.gjs-pn-views-container') || document.getElementById('gjs-pn-views-container');
                    if (vcEl) vcEl.classList.add('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (vcEl && ssPanel && !vcEl.contains(ssPanel)) vcEl.insertBefore(ssPanel, vcEl.firstChild);
                    if (ssPanel) ssPanel.classList.add('ss-visible');
                },
                stop: function (editor, sender) {
                    sender && sender.set('active', false);
                    var vcEl = document.querySelector('.gjs-pn-views-container') || document.getElementById('gjs-pn-views-container');
                    if (vcEl) vcEl.classList.remove('ss-active');
                    var ssPanel = document.getElementById('site-settings-panel');
                    if (ssPanel) ssPanel.classList.remove('ss-visible');
                }
            });

            ['open-sm', 'open-layers', 'open-blocks'].forEach(function (btnId) {
                var btn = pn.getButton('views', btnId);
                if (!btn) return;
                btn.on('change:active', function () {
                    if (btn.get('active')) {
                        var ssPanel = document.getElementById('site-settings-panel');
                        if (ssPanel) ssPanel.classList.remove('ss-visible');
                        var ssBtn = pn.getButton('views', 'open-site-settings');
                        ssBtn && ssBtn.set('active', false);
                        if (btnId === 'open-blocks' && window._ssBlockCategoryState) {
                            setTimeout(function () {
                                document.querySelectorAll('.gjs-block-category').forEach(function (cat) {
                                    var label = cat.querySelector('.gjs-title');
                                    var labelText = label ? label.textContent.trim() : cat.className;
                                    var wasOpen = window._ssBlockCategoryState[labelText];
                                    if (wasOpen !== cat.classList.contains('gjs-open')) label && label.click();
                                });
                            }, 50);
                        }
                    }
                });
            });

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
        document.querySelectorAll('.ss-section-title').forEach(function (title) {
            title.addEventListener('click', function () {
                var targetId = title.getAttribute('data-ss-target');
                var body = document.getElementById(targetId);
                if (body) { body.classList.toggle('ss-open'); title.classList.toggle('ss-open'); }
            });
        });

        document.querySelectorAll('.ss-color-swatch input[type="color"]').forEach(function (picker) {
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
        });

        var bgTypeSelect = document.getElementById('ss-bg-type');
        if (bgTypeSelect) bgTypeSelect.addEventListener('change', function() {
            var t = bgTypeSelect.value;
            document.getElementById('ss-bg-color-wrap').style.display = t === 'color' ? '' : 'none';
            document.getElementById('ss-bg-gradient-wrap').style.display = t === 'gradient' ? '' : 'none';
            document.getElementById('ss-bg-image-wrap').style.display = t === 'image' ? '' : 'none';
        });

        // Apply Buttons
        document.getElementById('ss-apply-colors')?.addEventListener('click', function () {
            var vars = '';
            document.querySelectorAll('#ss-color-list .ss-color-row').forEach(function (row) {
                var picker = row.querySelector('input[type="color"]');
                var varName = picker?.getAttribute('data-ss-colorvar');
                if (varName) vars += varName + ':' + picker.value + ';';
            });
            injectCSS(editor, 'ss-global-colors', ':root{' + vars + '}');
        });

        document.getElementById('ss-apply-fonts')?.addEventListener('click', function () {
            var headingFont = document.getElementById('ss-font-heading').value;
            var bodyFont = document.getElementById('ss-font-body').value;
            var monoFont = document.getElementById('ss-font-mono').value;
            var gfontUrl = document.getElementById('ss-gfont-url').value.trim();
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

        document.getElementById('ss-apply-typo')?.addEventListener('click', function () {
            var base = document.getElementById('ss-typo-base').value, lh = document.getElementById('ss-typo-lh').value;
            var h1 = document.getElementById('ss-typo-h1').value, h2 = document.getElementById('ss-typo-h2').value, h3 = document.getElementById('ss-typo-h3').value;
            var ls = document.getElementById('ss-typo-ls').value, hw = document.getElementById('ss-typo-hw').value;
            var css = 'body{font-size:' + base + '!important;line-height:' + lh + '!important;}' +
                      'h1{font-size:' + h1 + '!important;font-weight:' + hw + '!important;letter-spacing:' + ls + '!important;}' +
                      'h2{font-size:' + h2 + '!important;font-weight:' + hw + '!important;letter-spacing:' + ls + '!important;}' +
                      'h3{font-size:' + h3 + '!important;font-weight:' + hw + '!important;letter-spacing:' + ls + '!important;}';
            injectCSS(editor, 'ss-typography', css);
        });

        document.getElementById('ss-apply-buttons')?.addEventListener('click', function () {
            var bg = document.getElementById('ss-btn-bg').value, col = document.getElementById('ss-btn-color').value;
            var hbg = document.getElementById('ss-btn-hover-bg').value, hcol = document.getElementById('ss-btn-hover-color').value;
            var pad = document.getElementById('ss-btn-ph').value, br = document.getElementById('ss-btn-br').value;
            var fs = document.getElementById('ss-btn-fs').value, fw = document.getElementById('ss-btn-fw').value;
            var css = 'button,.btn,[class*="btn"],[class*="-btn"]{background-color:' + bg + '!important;color:' + col + '!important;padding:' + pad + '!important;border-radius:' + br + '!important;font-size:' + fs + '!important;font-weight:' + fw + '!important;border:none;cursor:pointer;transition:all .3s ease;}' +
                      'button:hover,.btn:hover,[class*="btn"]:hover,[class*="-btn"]:hover{background-color:' + hbg + '!important;color:' + hcol + '!important;}';
            injectCSS(editor, 'ss-buttons-style', css);
        });

        document.getElementById('ss-apply-images')?.addEventListener('click', function () {
            var br = document.getElementById('ss-img-br').value, fit = document.getElementById('ss-img-fit').value;
            var shadow = document.getElementById('ss-img-shadow').value, filter = document.getElementById('ss-img-filter').value;
            var css = 'img{border-radius:' + br + '!important;object-fit:' + fit + '!important;box-shadow:' + shadow + '!important;filter:' + filter + '!important;}';
            injectCSS(editor, 'ss-images-style', css);
        });

        document.getElementById('ss-apply-bg')?.addEventListener('click', function () {
            var type = document.getElementById('ss-bg-type').value, css = '';
            if (type === 'color') css = 'body{background:' + document.getElementById('ss-bg-color').value + '!important;}';
            else if (type === 'gradient') css = 'body{background:' + (document.getElementById('ss-bg-gradient-custom').value.trim() || document.getElementById('ss-bg-gradient').value) + '!important;}';
            else if (type === 'image') css = 'body{background-image:url("' + document.getElementById('ss-bg-img-url').value + '")!important;background-size:' + document.getElementById('ss-bg-img-size').value + '!important;background-position:' + document.getElementById('ss-bg-img-pos').value + '!important;background-repeat:no-repeat!important;}';
            injectCSS(editor, 'ss-background-style', css);
        });

        document.getElementById('ss-apply-layout')?.addEventListener('click', function () {
            var maxw = document.getElementById('ss-layout-maxw').value || '1150px', hpad = document.getElementById('ss-layout-hpad').value || '20px';
            var secpad = document.getElementById('ss-layout-secpad').value || '60px', gap = document.getElementById('ss-layout-gap').value || '24px';
            var radius = document.getElementById('ss-layout-radius').value || '8px', shadow = document.getElementById('ss-layout-shadow').value;
            var pagemaxw = document.getElementById('ss-layout-pagemaxw').value || '100%', trans = document.getElementById('ss-layout-transition').value || '0.25s';
            var css = ':root {--layout-maxw:'+maxw+';--layout-hpad:'+hpad+';--layout-secpad:'+secpad+';--layout-gap:'+gap+';--layout-radius:'+radius+';--layout-shadow:'+shadow+';--layout-pagemaxw:'+pagemaxw+';--layout-transition:'+trans+';}' +
                      '.container-width,[class*="-inner"],[class*="__inner"],.cs-section-inner{max-width:'+maxw+'!important;margin-left:auto!important;margin-right:auto!important;padding-left:'+hpad+'!important;padding-right:'+hpad+'!important;box-sizing:border-box!important;}' +
                      'section,.cs-section{padding-top:'+secpad+'!important;padding-bottom:'+secpad+'!important;}' +
                      '[class*="-grid"],[class*="-cards"],.cards,.badges{gap:'+gap+'!important;}' +
                      '[class*="-card"],[class*="-box"],[class*="-item"],.card,.badge,.price-card{border-radius:'+radius+'!important;}' +
                      '[class*="-card"],[class*="-box"],.card,.badge,.price-card{box-shadow:'+shadow+'!important;}' +
                      'body > *,#gjs > *{max-width:'+pagemaxw+';box-sizing:border-box;}' +
                      'a,button,[class*="-btn"],.card,[class*="-item"],img{transition-duration:'+trans+'!important;}';
            injectCSS(editor, 'ss-layout-style', css);
        });

        document.getElementById('ss-apply-css')?.addEventListener('click', function () {
            injectCSS(editor, 'ss-custom-css-style', document.getElementById('ss-custom-css').value);
        });
    }

    function injectCSS(editor, id, css) {
        var doc = editor.Canvas.getDocument();
        if (!doc) return;
        var existing = doc.getElementById(id);
        if (existing) existing.remove();
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

            container.querySelectorAll('.pm-project-btn-load').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var idx = parseInt(btn.getAttribute('data-idx')), proj = get()[idx];
                    if (proj && confirm('Load "' + proj.name + '"? Unsaved changes will be lost.')) { editor.loadProjectData(proj.data); close(); toastr.success('Project loaded.'); }
                });
            });
            container.querySelectorAll('.pm-project-btn-del').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var idx = parseInt(btn.getAttribute('data-idx')), list = get(), name = list[idx].name;
                    if (confirm('Delete "' + name + '"?')) { list.splice(idx, 1); save(list); render(); toastr.warning('Project deleted.'); }
                });
            });
        }

        function open() { render(); document.getElementById('pm-overlay').classList.add('pm-visible'); }
        function close() { document.getElementById('pm-overlay').classList.remove('pm-visible'); }

        editor.Commands.add('open-project-manager', { run: open, stop: close });
        document.getElementById('pm-close')?.addEventListener('click', close);
        document.getElementById('pm-overlay')?.addEventListener('click', function (e) { if (e.target === this) close(); });

        document.querySelectorAll('.pm-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.pm-tab').forEach(function (t) { t.classList.remove('pm-tab-active'); });
                document.querySelectorAll('.pm-pane').forEach(function (p) { p.classList.remove('pm-pane-active'); });
                tab.classList.add('pm-tab-active');
                var pane = document.getElementById(tab.getAttribute('data-pm-tab'));
                if (pane) pane.classList.add('pm-pane-active');
            });
        });

        document.getElementById('pm-save-btn')?.addEventListener('click', function () {
            var nameInput = document.getElementById('pm-save-name'), name = nameInput.value.trim();
            if (!name) { toastr.warning('Please enter a project name.'); return; }
            var list = get(), existing = list.findIndex(function (p) { return p.name === name; }), entry = { name: name, ts: Date.now(), data: editor.getProjectData() };
            if (existing >= 0) list[existing] = entry; else list.push(entry);
            save(list); nameInput.value = ''; render();
            toastr.success('Project saved.');
        });

        document.getElementById('pm-export-json')?.addEventListener('click', function () {
            var data = JSON.stringify(editor.getProjectData(), null, 2), blob = new Blob([data], { type: 'application/json' });
            var url = URL.createObjectURL(blob), a = document.createElement('a');
            a.href = url; a.download = (document.getElementById('pm-save-name').value.trim() || 'project') + '.json'; a.click();
            URL.revokeObjectURL(url);
        });

        document.getElementById('pm-export-html')?.addEventListener('click', function () {
            var full = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Exported Page</title>\n<style>\n' + editor.getCss() + '\n</style>\n</head>\n<body>\n' + editor.getHtml() + '\n</body>\n</html>';
            var blob = new Blob([full], { type: 'text/html' }), url = URL.createObjectURL(blob), a = document.createElement('a');
            a.href = url; a.download = 'page.html'; a.click(); URL.revokeObjectURL(url);
        });

        document.getElementById('pm-import-btn')?.addEventListener('click', function () { document.getElementById('pm-import-file').click(); });
        document.getElementById('pm-import-file')?.addEventListener('change', function () {
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
            var bm = editor.BlockManager, list = get();
            bm.getAll().filter(function (b) { return b.get('category') === 'My Blocks'; }).forEach(function (b) { bm.remove(b.id); });
            list.forEach(registerOne);
        }

        function registerOne(block) {
            editor.BlockManager.add(block.id, {
                label: '<div style="font-size:11px;font-weight:700;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + block.name + '</div><span class="sb-block-del" data-sb-id="' + block.id + '">&#10005;</span>',
                category: 'My Blocks', attributes: { class: 'fa fa-bookmark', 'data-sb-custom': '1' }, content: block.html
            });
        }

        editor.on('component:selected', function (component) {
            var toolbar = component.get('toolbar');
            if (toolbar.some(function (item) { return item.id === 'sb-toolbar-save'; })) return;
            toolbar.splice(toolbar.length - 1, 0, {
                id: 'sb-toolbar-save',
                label: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10H5V5h10v4z"/></svg>',
                attributes: { title: 'Save as Block' },
                command: function () {
                    var sel = editor.getSelected(); if (!sel) return;
                    var input = document.getElementById('sb-name-input');
                    if (input) {
                        input.value = sel.getName() || sel.get('type') || 'My Block';
                        document.getElementById('sb-name-overlay').classList.add('sb-visible');
                        setTimeout(function () { input.focus(); input.select(); }, 50);
                    }
                }
            });
            component.set('toolbar', toolbar);
        });

        document.getElementById('sb-name-confirm')?.addEventListener('click', function() {
            var sel = editor.getSelected(), name = document.getElementById('sb-name-input').value.trim();
            if (!name || !sel) return;
            var html = sel.toHTML(), css = editor.CodeManager.getCode(sel, 'css') || '', id = 'sb-custom-' + Date.now();
            var list = get(); list.push({ id: id, name: name, html: html + (css ? '<style>' + css + '</style>' : ''), ts: Date.now() });
            set(list); registerOne({ id: id, name: name, html: html + (css ? '<style>' + css + '</style>' : '') });
            document.getElementById('sb-name-overlay').classList.remove('sb-visible');
            toastr.success('Saved to My Blocks!');
        });
        document.getElementById('sb-name-cancel')?.addEventListener('click', function() { document.getElementById('sb-name-overlay').classList.remove('sb-visible'); });

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
