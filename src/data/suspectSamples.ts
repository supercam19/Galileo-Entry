export type SuspectChannel = 'z1' | 'z2';

export const suspectTimes: Record<SuspectChannel, number[]> = {
  z1: [-157.742, -140.867, -128.992, -62.117],
  z2: [-156.805, -140.555, -129.305, -62.43],
};

const tolerance = 0.01;

export const isSuspectTime = (channel: SuspectChannel, time: number): boolean =>
  suspectTimes[channel].some((flaggedTime) => Math.abs(flaggedTime - time) < tolerance);
