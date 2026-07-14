export interface AccelSample {
  time: number;
  value: number;
}

export const parseAccelFile = (raw: string): AccelSample[] =>
  raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [timeToken, valueToken] = line.split(/\s+/);
      return { time: parseFloat(timeToken), value: parseFloat(valueToken) };
    })
    .filter((sample) => Number.isFinite(sample.time) && Number.isFinite(sample.value))
    .sort((a, b) => a.time - b.time);
