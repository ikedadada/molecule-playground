export interface CompoundDef {
    displayName: string;
    formula: Record<string, number>;
    layout: Array<{ symbol: string; x: number; y: number }>;
    props: Record<string, number>;
}
export type CompoundsJson = Record<string, CompoundDef>;

export async function fetchCompounds(): Promise<CompoundsJson> {
    const res = await fetch('/compounds.json');
    if (!res.ok) throw new Error('Failed to load compounds.json');
    return res.json();
}
