import { BuilderWorkspace } from '@/components/features/BuilderWorkspace';
import { PeriodicTable } from '@/components/features/PeriodicTable';
import { useCompounds } from '@/components/hooks/useCompounds';
import { useElements } from '@/components/hooks/useElements';

export function Home() {
    const compounds = useCompounds();
    const elements = useElements();
    return (
        <main className="flex items-center justify-center py-4">
            <div className="flex-1 flex flex-col items-center gap-4 min-h-0">
                <h1 className="text-3xl font-bold">Molecule Playground</h1>
                <BuilderWorkspace compounds={compounds} />
                <PeriodicTable elements={elements} />
            </div>
        </main>
    );
}
