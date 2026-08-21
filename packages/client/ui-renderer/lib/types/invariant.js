/**
 * Package-owned invariant companion for `@deepseek-ai/dsh-client-ui-renderer`.
 * @module @deepseek-ai/dsh-client-ui-renderer/invariant
 */
const PACKAGE_NAME = '@deepseek-ai/dsh-client-ui-renderer';
/** Cordis companion plugin name. */
export const name = 'client-ui-renderer-invariant';
/** Service required before the companion can reserve package ownership. */
export const inject = ['invariants'];
/**
 * No runtime invariant: the package installs the render adapter and provides a
 * mount callback but owns no event stream or mutable cross-plugin data relation.
 */
const install = () => { };
/**
 * Register this package's invariant companion.
 * @param ctx - Cordis context carrying the invariant service.
 * @returns the installed registration's disposer after setup succeeds.
 */
export const apply = (ctx) => Promise.resolve(ctx.invariants.register(PACKAGE_NAME, install));
/* jscpd:ignore-end */
//# sourceMappingURL=invariant.js.map