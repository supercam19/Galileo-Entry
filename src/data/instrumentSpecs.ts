export interface RangeSpec {
  min: number;
  max: number;
  resolution: number;
}

export type InstrumentKey = 'z1' | 'z2' | 'lat';

export interface InstrumentSpec {
  key: InstrumentKey;
  ranges: RangeSpec[];
}

export const instrumentSpecs: InstrumentSpec[] = [
  {
    key: 'z1',
    ranges: [
      { min: 0, max: 0.123, resolution: 0.00003 },
      { min: 0, max: 3.92, resolution: 0.00096 },
      { min: -62.7, max: 62.7, resolution: 0.0306 },
      { min: 0, max: 4016, resolution: 0.98 },
    ],
  },
  {
    key: 'z2',
    ranges: [
      { min: 0, max: 0.123, resolution: 0.00003 },
      { min: 0, max: 3.92, resolution: 0.00096 },
      { min: -62.7, max: 62.7, resolution: 0.0306 },
      { min: 0, max: 4016, resolution: 0.98 },
    ],
  },
  {
    key: 'lat',
    ranges: [
      { min: -0.17, max: 0.17, resolution: 0.00068 },
      { min: -11.0, max: 11.0, resolution: 0.0435 },
      { min: -177, max: 177, resolution: 0.696 },
    ],
  },
];
