import { useEffect } from 'react';
const DEFAULT_CLIENT_TITLE = 'DSH Local Build';
/**
 * Project the selected durable session title into the browser title and
 * restore the build-selected product title when unmounted.
 * @param props - Selected session title projection.
 * @returns No rendered content.
 */
export function DocumentTitle({ title }) {
    const productTitle = process.env.DSH_CLIENT_TITLE ?? DEFAULT_CLIENT_TITLE;
    useEffect(() => {
        document.title = title === undefined ? productTitle : `${title} — ${productTitle}`;
        return () => { document.title = productTitle; };
    }, [productTitle, title]);
    return null;
}
//# sourceMappingURL=DocumentTitle.js.map