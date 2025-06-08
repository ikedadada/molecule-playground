import { type ElementsJson, fetchElements } from '@/components/utils/elements';
import { useEffect, useState } from 'react';

export function useElements() {
    const [elements, setElements] = useState<ElementsJson | null>(null);
    useEffect(() => {
        fetchElements().then((data: unknown) =>
            setElements(data as ElementsJson)
        );
    }, []);
    return elements || [];
}
