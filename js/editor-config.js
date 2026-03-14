// GrapesJS Editor Configuration
// Add or remove plugins from the array below to customize the editor.

const editorConfig = {
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

    // Load plugin files dynamically before initializing the editor
    let loadedCount = 0;
    const totalToLoad = editorConfig.plugins.length;

    if (totalToLoad === 0) {
        startEditor();
    } else {
        editorConfig.plugins.forEach(pluginId => {
            const script = document.createElement('script');
            script.src = editorConfig.pluginFiles[pluginId];
            script.onload = () => {
                loadedCount++;
                if (loadedCount === totalToLoad) {
                    startEditor();
                }
            };
            document.head.appendChild(script);
        });
    }

    function startEditor() {
        console.log('All plugins loaded. Initializing GrapesJS...');
        // window.initEditor is defined in js/editor-core.js
        if (typeof window.initEditor === 'function') {
            window.editor = window.initEditor(editorConfig.plugins);
        } else {
            console.error('initEditor function not found! Make sure js/editor-core.js is loaded.');
        }
    }
})();
