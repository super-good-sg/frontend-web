import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { expect, test } from '@playwright/test';
import { SCREENS } from './visual-refs.config';

const REFERENCE_BASE_URL =
  'https://raw.githubusercontent.com/super-good-sg/document-specs/main/docs/design/visual-refs';

const duplicateFrameId = SCREENS.map((s) => s.frameId).find((id, i, ids) => ids.indexOf(id) !== i);
if (duplicateFrameId) {
  // Two entries writing the same snapshot path would race under parallel workers.
  throw new Error(`Duplicate frameId "${duplicateFrameId}" in visual-refs.config.ts`);
}

for (const screen of SCREENS) {
  test(`visual: ${screen.name}`, async ({ page }) => {
    const snapshotName = `${screen.frameId}.png`;
    const snapshotPath = test.info().snapshotPath(snapshotName);

    if (!existsSync(snapshotPath)) {
      const response = await fetch(`${REFERENCE_BASE_URL}/${snapshotName}`);
      if (response.status === 404) {
        test.skip(true, `No reference image exported yet for "${screen.name}" (${screen.frameId})`);
        return;
      }
      if (!response.ok) {
        throw new Error(
          `Fetching the reference image for "${screen.name}" (${screen.frameId}) failed: ${response.status} ${response.statusText}`,
        );
      }
      mkdirSync(dirname(snapshotPath), { recursive: true });
      writeFileSync(snapshotPath, Buffer.from(await response.arrayBuffer()));
    }

    await page.setViewportSize(screen.viewport);
    await page.goto(screen.route);
    await expect(page).toHaveScreenshot(snapshotName);
  });
}
