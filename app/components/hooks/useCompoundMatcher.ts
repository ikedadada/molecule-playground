import type { CompoundsJson } from '@/components/utils/compounds';
import type { Element } from '@/components/utils/elements';
import { useEffect, useState } from 'react';

export function useCompoundMatcher(
    droppedElements: Element[],
    compounds: CompoundsJson | null
) {
    const [matched, setMatched] = useState<string | null>(null);
    useEffect(() => {
        if (!compounds) return;
        const formula: Record<string, number> = {};
        for (const el of droppedElements) {
            formula[el.symbol] = (formula[el.symbol] || 0) + 1;
        }
        let found: string | null = null;
        for (const [key, def] of Object.entries(compounds)) {
            if (isFormulaEqual(def.formula, formula)) {
                found = key;
                break;
            }
        }
        setMatched(found);
    }, [droppedElements, compounds]);
    return matched;
}

function isFormulaEqual(
    a: Record<string, number>,
    b: Record<string, number>
): boolean {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
        if ((a[k] || 0) !== (b[k] || 0)) return false;
    }
    return true;
}
