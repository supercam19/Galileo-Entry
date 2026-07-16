export interface RatioEntry {
    speciesOrRatio: string;
    mixingRatioOrIsotopeRatio: string | number | null;
    moleFraction: string | number | null;
    ratioToSolar: string | number | null;
}

function parseValue(value: string): string | number | null {
    let s = value.trim();

    if (!s || s.toUpperCase() === "N/A") return null;

    // Normalize legacy scientific notation:
    //   2.1 10^-6
    //   2.1x10^-6
    //   2.1 X 10^-6
    s = s.replace(
        /^([+-]?\d*\.?\d+)\s*[xX]?\s*10\^?([+-]?\d+)$/,
        "$1e$2"
    );

    const n = Number(s);
    return Number.isNaN(n) ? s : n;
}

function speciesWithoutPressure(species: string): string {
    return species
        .replace(
            /\s+\((?:[^)]*\bbar\b|[^)]*[<>]=?\s*\d+(?:\.\d+)?\s*bar?)\)\s*$/i,
            ""
        )
        .trim();
}

function numericValue(value: string | number | null): number | null {
    if (typeof value === "number") return value;
    if (value === null) return null;

    const match = value.match(
        /[<>]=?\s*([+-]?\d*\.?\d+)\s*(?:[xX]?\s*10\^?\s*([+-]?\d+))?/
    );

    if (!match) return null;

    const base = Number(match[1]);
    const exponent = match[2] ? Number(match[2]) : 0;

    return base * 10 ** exponent;
}

function sumValues(
    values: Array<string | number | null>
): string | number | null {
    const numbers = values
        .map(numericValue)
        .filter((value): value is number => value !== null);

    if (!numbers.length) return null;

    const sum = numbers.reduce((total, value) => total + value, 0);
    const hasLowerBound = values.some(
        (value) => typeof value === "string" && /^\s*>/.test(value)
    );

    return hasLowerBound ? `> ${sum}` : sum;
}

export const parseRatiosFile = (raw: string): RatioEntry[] => {
    const entries = raw
        .split(/\r?\n/)
        .filter((line) => line.trim().length)
        .map((line) => ({
            // Fixed-width fields from ratios.lbl
            speciesOrRatio: line.slice(0, 16).trim(),
            mixingRatioOrIsotopeRatio: parseValue(line.slice(17, 35)),
            moleFraction: parseValue(line.slice(36, 54)),
            ratioToSolar: parseValue(line.slice(55, 66)),
        }));

    const grouped = new Map<string, RatioEntry[]>();

    for (const entry of entries) {
        const species = speciesWithoutPressure(entry.speciesOrRatio);
        const group = grouped.get(species) ?? [];

        group.push(entry);
        grouped.set(species, group);
    }

    return Array.from(grouped, ([speciesOrRatio, group]) => ({
        speciesOrRatio,
        mixingRatioOrIsotopeRatio: sumValues(
            group.map((entry) => entry.mixingRatioOrIsotopeRatio)
        ),
        moleFraction: sumValues(
            group.map((entry) => entry.moleFraction)
        ),
        ratioToSolar: sumValues(
            group.map((entry) => entry.ratioToSolar)
        ),
    }));
}