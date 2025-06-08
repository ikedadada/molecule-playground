export interface Element {
    symbol: string;
    color: string;
}
export type ElementsJson = Element[];

export async function fetchElements(): Promise<ElementsJson> {
    const url = `${import.meta.env.BASE_URL}elements.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load elements.json');
    return res.json();
}
