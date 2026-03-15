// GrapesJS Editor Configuration
// Add or remove plugins from the array below to customize the editor.

var editorConfig = {
    // List of custom plugins to load from the js/plugins/ directory
    plugins: [
        'gjs-custom-basic',
        'gjs-layout',
        'gjs-sections',
        'gjs-media',
        'gjs-extra'
    ],

    // Mapping of plugin names to their file paths
    pluginFiles: {
        'gjs-custom-basic': 'js/plugins/gjs-custom-basic.js',
        'gjs-layout': 'js/plugins/gjs-layout.js',
        'gjs-sections': 'js/plugins/gjs-sections.js',
        'gjs-media': 'js/plugins/gjs-media.js',
        'gjs-extra': 'js/plugins/gjs-extra.js'
    }
};

// Global initialization logic
(function() {
    console.log('--- Editor Loader Started ---');

    var loadedCount = 0;
    var pluginsToLoad = editorConfig.plugins;
    var totalToLoad = pluginsToLoad.length;

    function startEditor() {
        console.log('Initializing GrapesJS Editor...');
        if (typeof window.initEditor === 'function') {
            try {
                window.editor = window.initEditor(editorConfig.plugins);
                console.log('Editor initialized successfully.');
            } catch (e) {
                console.error('CRITICAL: Error during editor initialization:', e);
                // Try to show something to the user if it fails
                document.body.innerHTML += '<div style="position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:20px;z-index:999999;">Editor failed to load. Check console for details.</div>';
            }
        } else {
            console.error('CRITICAL: initEditor function not found! Check js/editor-core.js load status.');
        }
    }

    function loadPlugin(index) {
        if (index >= totalToLoad) {
            startEditor();
            return;
        }

        var pluginId = pluginsToLoad[index];
        var script = document.createElement('script');
        script.src = editorConfig.pluginFiles[pluginId] + '?t=' + Date.now();

        script.onload = function() {
            console.log('Plugin loaded: ' + pluginId);
            loadPlugin(index + 1);
        };

        script.onerror = function() {
            console.error('ERROR: Failed to load plugin: ' + pluginId + ' from ' + script.src);
            loadPlugin(index + 1);
        };

        document.head.appendChild(script);
    }

    if (totalToLoad === 0) {
        startEditor();
    } else {
        console.log('Loading ' + totalToLoad + ' plugins sequentially...');
        loadPlugin(0);
    }
})();
