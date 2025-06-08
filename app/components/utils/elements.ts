import { basename } from '../../config';
export interface Element {
    symbol: string;
    color: string;
}
export type ElementsJson = Element[];

export async function fetchElements(): Promise<ElementsJson> {
    const res = await fetch(`${basename}/elements.json`);
    if (!res.ok) throw new Error('Failed to load elements.json');
    return res.json();
}
