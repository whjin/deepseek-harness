/** Raster inspection: full decode at admission, header-only probe on verified reads. */
import type { ImageMediaType } from '@deepseek-ai/dsh-attachment';
/** Decoded metadata from a supported image. */
export interface DetectedImage {
    mediaType: ImageMediaType;
    width: number;
    height: number;
}
/**
 * Parse a supported raster's header and return its intrinsic metadata without
 * decoding pixels. Digest-verified reads use this: admission already proved
 * that these exact bytes decode completely, so the read path only re-derives
 * the reference fields instead of paying the full-raster decode again.
 * @param data - complete encoded image bytes.
 * @returns verified format and dimensions.
 */
export declare function probeImage(data: Uint8Array): Promise<DetectedImage>;
/** Admission limits applied to a decoded raster's intrinsic dimensions. */
export interface DecodedImageLimits {
    /** Decoded-pixel (width times height) admission limit. */
    maxPixels?: number;
    /** Per-side admission limit applied to width and height independently. */
    maxDimension?: number;
}
/**
 * Fully decode a supported raster and return its intrinsic metadata.
 * @param data - complete encoded image bytes.
 * @param limits - intrinsic-dimension admission limits.
 * @returns verified format and dimensions.
 */
export declare function detectImage(data: Uint8Array, limits?: DecodedImageLimits): Promise<DetectedImage>;
//# sourceMappingURL=image.d.ts.map