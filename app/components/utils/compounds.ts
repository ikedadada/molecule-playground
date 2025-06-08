import { basename } from '../../config';

export interface CompoundDef {
    displayName: string;
    formula: Record<string, number>;
    layout: Array<{ symbol: string; x: number; y: number }>;
    props: Record<string, number>;
}
export type CompoundsJson = Record<string, CompoundDef>;

export async function fetchCompounds(): Promise<CompoundsJson> {
    const url = new URL('compounds.json', import.meta.env.BASE_URL);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load compounds.json');
    return res.json();
}
