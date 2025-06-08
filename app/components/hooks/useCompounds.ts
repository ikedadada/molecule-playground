import {
    type CompoundsJson,
    fetchCompounds
} from '@/components/utils/compounds';
import { useEffect, useState } from 'react';

export function useCompounds() {
    const [compounds, setCompounds] = useState<CompoundsJson | null>(null);
    useEffect(() => {
        fetchCompounds().then((data: unknown) =>
            setCompounds(data as CompoundsJson)
        );
    }, []);
    return compounds || {};
}
