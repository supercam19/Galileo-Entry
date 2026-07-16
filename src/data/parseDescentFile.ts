

export interface DescentSample {
    time: number;
    altitude: number;
    pressure: number;
    temperature: number;
    density: number;
    gravity: number;
    descentVelocity: number;
    temperatureGradient: number;
}

function parseNumber(field: string): number {
    const value = Number(field.trim());

    // Missing value according to descent.lbl
    if (value === -999.99) return NaN;

    return value;
}

export const parseDescentFile = (raw: string): DescentSample[]  =>
    raw
    .split(/\r?\n/)
    .filter((l) => l.trim().length)
    .map((line) => ({
        time: parseNumber(line.slice(0, 10)),
        altitude: parseNumber(line.slice(10, 19)),
        pressure: parseNumber(line.slice(22, 30)),
        temperature: parseNumber(line.slice(33, 36)),
        density: parseNumber(line.slice(39, 46)),
        gravity: parseNumber(line.slice(49, 55)),
        descentVelocity: parseNumber(line.slice(58, 65)),
        temperatureGradient: parseNumber(line.slice(68, 76)),
    }));