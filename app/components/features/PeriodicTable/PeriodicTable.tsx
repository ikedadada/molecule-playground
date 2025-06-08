import type React from 'react';
import type { Element } from '../../utils/elements';

export interface PeriodicTableProps {
    elements: Element[];
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements }) => (
    <svg viewBox="0 0 400 120" width="100%" height="120" aria-label="周期表">
        <title>周期表</title>
        <g fontFamily="sans-serif" fontSize="18" textAnchor="middle">
            {elements.map((el, i) => (
                <foreignObject
                    x={10 + i * 50}
                    y={10}
                    width={40}
                    height={40}
                    key={el.symbol}
                >
                    <button
                        type="button"
                        style={{
                            width: '100%',
                            height: '100%',
                            background: el.color,
                            border: '1px solid #333',
                            fontSize: 18,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            padding: 0,
                            margin: 0,
                            outline: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
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
                        onClick={() => alert(`${el.symbol} を選択しました`)}
                        aria-label={el.symbol}
                    >
                        {el.symbol}
                    </button>
                </foreignObject>
            ))}
        </g>
    </svg>
);
