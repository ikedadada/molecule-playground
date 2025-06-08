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
        // layout順で表示
        atomPositions = compounds[matched].layout.map((layoutAtom) => {
            // droppedElementsから該当symbolのcolorを取得（なければデフォルト）
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
        // ドロップ順で表示
        atomPositions = droppedElements.map((el, i) => ({
            symbol: el.symbol,
            color: el.color, // Default color, can be customized
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
            style={{
                minHeight: 320,
                border: '2px dashed #aaa',
                borderRadius: 12,
                margin: '24px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                background: '#f8fafc',
                width: '100%',
                justifyContent: 'center'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <AtomsCanvas atoms={atomPositions} />
            {droppedElements.length === 0 ? (
                <span style={{ color: '#888' }}>ここに元素をドロップ</span>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => resetDroppedElements()}
                >
                    リセット
                </Button>
            )}
            {matched && (
                <span
                    style={{
                        color: '#388e3c',
                        fontWeight: 'bold',
                        marginTop: 8,
                        fontSize: 18
                    }}
                >
                    ✓ {compounds[matched].displayName}（{matched}）と一致！
                </span>
            )}
        </div>
    );
};
