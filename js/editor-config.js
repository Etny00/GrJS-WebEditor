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
    console.log('Loading Editor Configuration...');

    var loadedCount = 0;
    var pluginsToLoad = editorConfig.plugins;
    var totalToLoad = pluginsToLoad.length;

    function startEditor() {
        console.log('Initializing GrapesJS...');
        if (typeof window.initEditor === 'function') {
            try {
                window.editor = window.initEditor(editorConfig.plugins);
            } catch (e) {
                console.error('Error during editor initialization:', e);
            }
        } else {
            console.error('initEditor function not found! Make sure js/editor-core.js is loaded.');
        }
    }

    if (totalToLoad === 0) {
        startEditor();
    } else {
        for (var i = 0; i < totalToLoad; i++) {
            (function(pluginId) {
                var script = document.createElement('script');
                script.src = editorConfig.pluginFiles[pluginId];
                script.onload = function() {
                    loadedCount++;
                    if (loadedCount === totalToLoad) {
                        startEditor();
                    }
                };
                script.onerror = function() {
                    console.error('Failed to load plugin: ' + pluginId);
                    loadedCount++;
                    if (loadedCount === totalToLoad) {
                        startEditor();
                    }
                };
                document.head.appendChild(script);
            })(pluginsToLoad[i]);
        }
    }
})();
