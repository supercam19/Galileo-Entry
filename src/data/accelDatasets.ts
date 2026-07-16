// @ts-ignore
import z1Raw from './raw/e03z1.tab?raw';
// @ts-ignore
import z2Raw from './raw/e03z2.tab?raw';
// @ts-ignore
import anRaw from './raw/e03an.tab?raw';
import { parseAccelFile } from './parseAccelFile';
import type { AccelSample } from './parseAccelFile';

export const z1Samples: AccelSample[] = parseAccelFile(z1Raw);
export const z2Samples: AccelSample[] = parseAccelFile(z2Raw);
export const latSamples: AccelSample[] = parseAccelFile(anRaw);
