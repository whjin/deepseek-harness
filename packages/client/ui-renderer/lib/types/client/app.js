import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { bindSnapshotSelector } from "./bind.js";
import { DocumentTitle } from "./DocumentTitle.js";
/**
 * Build the assembled application factory.
 * @param deps - Active UI-renderer dependencies.
 * @returns Factory producing the application React tree.
 */
export function buildRenderApp(deps) {
    const { ctx } = deps;
    const sessions = ctx.get('sessions');
    if (sessions === undefined)
        throw new Error('ui renderer: sessions service unavailable');
    const useSessions = bindSnapshotSelector(sessions.list);
    const SessionDocumentTitle = () => {
        const title = useSessions((state) => {
            const id = state.current;
            return id === undefined ? undefined : state.byId[id]?.title;
        });
        return _jsx(DocumentTitle, { ...title === undefined ? {} : { title } });
    };
    return () => (_jsxs(_Fragment, { children: [_jsx(SessionDocumentTitle, {}), ctx.slots.renderSlot('root', {})] }));
}
//# sourceMappingURL=app.js.map