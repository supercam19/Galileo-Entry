import type { AccelSample } from './parseAccelFile';
import type { RangeSpec } from './instrumentSpecs';

export const classifyRangeIndex = (value: number, ranges: RangeSpec[]): number => {
  const magnitude = Math.abs(value);
  for (let i = 0; i < ranges.length; i += 1) {
    if (magnitude <= Math.abs(ranges[i].max)) {
      return i;
    }
  }
  return ranges.length - 1;
};

export const computeRangeCounts = (samples: AccelSample[], ranges: RangeSpec[]): number[] => {
  const counts = new Array(ranges.length).fill(0) as number[];
  samples.forEach((sample) => {
    const index = classifyRangeIndex(sample.value, ranges);
    counts[index] += 1;
  });
  return counts;
};
