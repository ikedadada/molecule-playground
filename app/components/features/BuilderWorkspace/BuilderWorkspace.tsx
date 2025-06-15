import { AtomsCanvas } from '@/components/atoms/AtomsCanvas';
import type { AtomPosition } from '@/components/atoms/AtomsCanvas/AtomsCanvas';
import { useCompoundMatcher } from '@/components/hooks/useCompoundMatcher';
import { Button } from '@/components/ui/button';
import type { CompoundsJson } from '@/components/utils/compounds';
import type { Element } from '@/components/utils/elements';
import type React from 'react';
import { useState } from 'react';

export interface BuilderWorkspaceProps {
    compounds: CompoundsJson;
}

export const BuilderWorkspace: React.FC<BuilderWorkspaceProps> = ({
    compounds
}) => {
    const [droppedElements, setDroppedElements] = useState<Element[]>([]);
    const matched = useCompoundMatcher(droppedElements, compounds);
    let atomPositions: AtomPosition[];
    if (matched && compounds[matched]?.layout) {
        // display atoms based on predefined layout
        atomPositions = compounds[matched].layout.map((layoutAtom) => {
            // use dropped color when available
            const dropped = droppedElements.find(
                (el) => el.symbol === layoutAtom.symbol
            );
            return {
                symbol: layoutAtom.symbol,
                color: dropped?.color ?? '#e0e0e0',
                x: layoutAtom.x,
                y: layoutAtom.y,
                z: 0
            };
        });
    } else {
        // fall back to drop order
        atomPositions = droppedElements.map((el, i) => ({
            symbol: el.symbol,
            color: el.color,
            x: (i - (droppedElements.length - 1) / 2) * 2.5,
            y: 0,
            z: 0
        }));
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const jsonStr = e.dataTransfer.getData('application/json');
        if (!jsonStr) return;
        const data = JSON.parse(jsonStr) as Element;
        if (!data || !data.symbol) return;
        setDroppedElements([...droppedElements, data]);
        e.dataTransfer.clearData();
    };
    const resetDroppedElements = () => {
        setDroppedElements([]);
    };
    return (
        <div
            className="md:w-[800px] sm:w-[200px] h-[320px] flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#aaa] bg-slate-50 p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <AtomsCanvas atoms={atomPositions} isFloating={!matched} />
            <div className="h-[50px] w-full flex flex-col items-center justify-center gap-2">
                {droppedElements.length === 0 ? (
                    <span className="text-gray-500">ここに元素をドロップ</span>
                ) : (
                    <div className="flex justify-between w-full">
                        <div className="flex flex-wrap justify-center w-full">
                            {matched && (
                                <span className="mt-2 text-[18px] font-bold text-green-700">
                                    ✓ {compounds[matched].displayName}（
                                    {matched}
                                    ）と一致！
                                </span>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => resetDroppedElements()}
                        >
                            リセット
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
