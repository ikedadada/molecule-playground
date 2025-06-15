import type { Element } from '@/components/utils/elements';
import type React from 'react';
// Layout constants for the periodic table grid
const COLS = 10;
const CELL_SIZE = 40;
const PADDING = 10;
const GAP = 10;

export interface PeriodicTableProps {
    elements: Element[];
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements }) => {
    const getPosition = (i: number) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return {
            x: PADDING + col * (CELL_SIZE + GAP),
            y: PADDING + row * (CELL_SIZE + GAP)
        };
    };
    const rows = Math.ceil(elements.length / COLS);
    const width = PADDING * 2 + COLS * CELL_SIZE + (COLS - 1) * GAP;
    const height = PADDING * 2 + rows * CELL_SIZE + (rows - 1) * GAP;
    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height={height}
            aria-label="周期表"
        >
            <title>周期表</title>
            <g fontFamily="sans-serif" fontSize="18" textAnchor="middle">
                {elements.map((el, i) => {
                    const pos = getPosition(i);
                    return (
                        <foreignObject
                            x={pos.x}
                            y={pos.y}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            key={el.symbol}
                        >
                            <button
                                type="button"
                                className="flex h-full w-full items-center justify-center border border-[#333] text-[18px]"
                                style={{ background: el.color }}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData(
                                        'application/json',
                                        JSON.stringify({
                                            symbol: el.symbol,
                                            color: el.color
                                        })
                                    );
                                }}
                                onClick={() =>
                                    alert(`${el.symbol} を選択しました`)
                                }
                                aria-label={el.symbol}
                            >
                                {el.symbol}
                            </button>
                        </foreignObject>
                    );
                })}
            </g>
        </svg>
    );
};
