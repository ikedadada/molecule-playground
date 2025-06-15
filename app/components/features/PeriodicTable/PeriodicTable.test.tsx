import { fireEvent, render, screen } from '@testing-library/react';
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
        expect(foreignObjects).toHaveLength(2);

        const dataTransfer = { setData: vi.fn() } as unknown as DataTransfer;
        fireEvent.dragStart(objects[0], { dataTransfer });
        expect(dataTransfer.setData).toHaveBeenCalledWith(
            'application/json',
            JSON.stringify({ symbol: 'H', color: '#aaa' })
        );
    });
});
