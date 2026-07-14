import z1Raw from './e03z1.tab?raw';
import z2Raw from './e03z2.tab?raw';
import anRaw from './e03an.tab?raw';
import { parseAccelFile } from './parseAccelFile';
import type { AccelSample } from './parseAccelFile';

export const z1Samples: AccelSample[] = parseAccelFile(z1Raw);
export const z2Samples: AccelSample[] = parseAccelFile(z2Raw);
export const latSamples: AccelSample[] = parseAccelFile(anRaw);
