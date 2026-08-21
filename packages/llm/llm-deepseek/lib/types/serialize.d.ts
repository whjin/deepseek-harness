/**
 * Serialize harness messages into DeepSeek chat completions. Text-only
 * requests retain string user content; the image path resolves durable
 * attachments into ordered data-URL parts. Tool-result images follow their
 * string-only tool messages in a separate user message.
 * @module dsh-llm-deepseek/serialize
 */
import type { GenerateOptions, Message } from '@deepseek-ai/dsh-llm';
import type { AttachmentStore } from '@deepseek-ai/dsh-attachment';
import type { WireMessage, WireRequest } from './types.ts';
/** Adapter-level request defaults (from plugin config). */
export interface RequestDefaults {
    thinking?: 'enabled' | 'disabled' | undefined;
    reasoningEffort?: 'off' | 'low' | 'high' | 'max' | undefined;
}
/** Dependencies required only when the request contains image input. */
export interface ImageSerializationOptions {
    /** Durable resolver for canonical image references. */
    attachments: AttachmentStore;
    /** Positive bound on accumulated base64 image payload. */
    maxRequestImageBytes: number;
    /** Cancellation shared with the provider request. */
    signal: AbortSignal;
}
/**
 * Serialize the conversation. `tool-result` blocks become standalone
 * `{role: 'tool'}` messages; the harness puts each tool result in its own
 * user-role message, so a mixed user message contributes its text first and
 * its tool results as separate wire messages after.
 * @param messages - the harness conversation, in order.
 * @returns the wire messages; order preserved, each tool result expanded into its own entry.
 */
export declare function serializeMessages(messages: Message[]): WireMessage[];
/**
 * Serialize image-capable history after resolving durable attachments.
 * Consecutive tool results keep string `tool` messages and share one following
 * user message containing their images.
 * @param messages - transient request history after request-size offloading.
 * @param attachments - durable image resolver.
 * @param signal - cancellation for attachment reads.
 * @returns ordered DeepSeek wire messages.
 */
export declare function serializeMessagesWithImages(messages: readonly Message[], attachments: AttachmentStore, signal: AbortSignal): Promise<WireMessage[]>;
/**
 * Build the full wire request. Always streaming (`stream: true`, usage
 * reporting on); optional fields are omitted rather than sent as null, so
 * provider defaults apply.
 * @param options - the harness request (model, history, system, tools, sampling).
 * @param defaults - adapter-level thinking defaults; undefined fields put nothing on the wire.
 * @returns the chat-completions request body.
 */
export declare function serializeRequest(options: GenerateOptions, defaults?: RequestDefaults): WireRequest;
/**
 * Build one image-capable request while keeping durable bytes out of session
 * messages. Oversized oldest images become deterministic text before any
 * attachment read.
 * @param options - harness request containing image-capable user content.
 * @param images - attachment resolver, request bound, and cancellation.
 * @param defaults - adapter-level thinking defaults.
 * @returns the fully materialized DeepSeek request body.
 */
export declare function serializeRequestWithImages(options: GenerateOptions, images: ImageSerializationOptions, defaults?: RequestDefaults): Promise<WireRequest>;
//# sourceMappingURL=serialize.d.ts.map