import ratiosRaw from './raw/ratios.tab?raw';
import { parseRatiosFile } from './parseRatiosFile';
import type { RatioEntry } from './parseRatiosFile';

export const ratioEntries: RatioEntry[] = parseRatiosFile(ratiosRaw);
