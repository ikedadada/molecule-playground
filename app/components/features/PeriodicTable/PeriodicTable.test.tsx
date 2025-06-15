import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { PeriodicTable } from './PeriodicTable';

describe('PeriodicTable', () => {
    const elements = [
        { symbol: 'H', color: '#aaa' },
        { symbol: 'O', color: '#bbb' }
    ];

    it('positions buttons and handles events', () => {
        window.alert = vi.fn();
        render(<PeriodicTable elements={elements} />);

        const objects = screen.getAllByRole('button');
        expect(objects).toHaveLength(2);

        const foreignObjects = screen
            .getAllByRole('button')
            .map((btn) => btn.parentElement);
        expect(foreignObjects[1]).toHaveAttribute('x', '60');
        expect(foreignObjects[1]).toHaveAttribute('y', '10');

        const dataTransfer = { setData: vi.fn() } as unknown as DataTransfer;
        fireEvent.dragStart(objects[0], { dataTransfer });
        expect(dataTransfer.setData).toHaveBeenCalledWith(
            'application/json',
            JSON.stringify({ symbol: 'H', color: '#aaa' })
        );

        fireEvent.click(objects[0]);
        expect(window.alert).toHaveBeenCalledWith('H を選択しました');
    });
});
