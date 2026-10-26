export interface ScreenRef {
  /** Frame ID from document-specs' docs/design/screens.md, e.g. "Hd7KW". */
  frameId: string;
  /** Human-readable name, for test titles and skip messages only. */
  name: string;
  route: string;
  viewport: { width: number; height: number };
}

/**
 * Screens checked against their super-good.pen reference image (SIE-100).
 * Add an entry here once a screen is built and its reference PNG has been
 * exported to document-specs' docs/design/visual-refs/<frameId>.png — see
 * that folder's README for the export convention. A screen with no entry
 * here is simply not checked yet.
 */
export const SCREENS: ScreenRef[] = [];
