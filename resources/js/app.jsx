import '../css/app.css';
import './bootstrap';
import "flyonui/flyonui";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

window.HSStaticMethods.autoInit();

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        window.HSStaticMethods.autoInit();
    }
});

observer.observe(document.body, {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true,
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);

        delete el.dataset.page;
    },
    progress: {
        color: '#4B5563',
    },
});
