import type { Element } from '@/components/utils/elements';
import type React from 'react';

export interface PeriodicTableProps {
    elements: Element[];
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ elements }) => {
    return (
        <div
            className="md:w-[800px] sm:w-[200px] flex flex-wrap gap-2 justify-center p-2"
            aria-label="周期表"
        >
            {elements.map((el) => (
                <button
                    key={el.symbol}
                    type="button"
                    className="flex items-center justify-center w-10 h-10 border border-gray-800 text-lg cursor-pointer"
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
                    onClick={() => alert(`${el.symbol} を選択しました`)}
                    aria-label={el.symbol}
                >
                    {el.symbol}
                </button>
            ))}
        </div>
    );
};
