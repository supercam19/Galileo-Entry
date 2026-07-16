// @ts-ignore
import descentRaw from './raw/descent.tab?raw';
import { parseDescentFile } from './parseDescentFile';
import type { DescentSample } from './parseDescentFile';

export const descentSamples: DescentSample[] = parseDescentFile(descentRaw);
