import { useEffect, useState } from 'react';
import type { ElementsJson } from '../utils/elements';
import { fetchElements } from '../utils/elements';

export function useElements() {
    const [elements, setElements] = useState<ElementsJson | null>(null);
    useEffect(() => {
        fetchElements().then((data: unknown) =>
            setElements(data as ElementsJson)
        );
    }, []);
    return elements || [];
}
