import { useEffect, useState } from 'react';
import type { CompoundsJson } from '../utils/compounds';
import { fetchCompounds } from '../utils/compounds';

export function useCompounds() {
    const [compounds, setCompounds] = useState<CompoundsJson | null>(null);
    useEffect(() => {
        fetchCompounds().then((data: unknown) =>
            setCompounds(data as CompoundsJson)
        );
    }, []);
    return compounds || {};
}
