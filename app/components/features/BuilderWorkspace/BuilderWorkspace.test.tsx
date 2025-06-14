import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/components/atoms/AtomsCanvas', () => ({
    AtomsCanvas: vi.fn(() => <div data-testid="atoms-canvas" />)
}));

import { AtomsCanvas } from '@/components/atoms/AtomsCanvas';
import { BuilderWorkspace } from './BuilderWorkspace';

// useCompoundMatcher works with provided compounds; here we use real hook

describe('BuilderWorkspace', () => {
    const compounds = {
        H2: {
            displayName: 'Hydrogen',
            formula: { H: 2 },
            layout: [],
            props: {}
        }
    };

    it('adds dropped elements and resets', () => {
        render(<BuilderWorkspace compounds={compounds} />);
        const dropZone = screen
            .getByText('ここに元素をドロップ')
            .closest('div') as HTMLDivElement;

        const data = JSON.stringify({ symbol: 'H', color: '#fff' });
        fireEvent.drop(dropZone, {
            dataTransfer: {
                getData: vi.fn().mockReturnValue(data),
                clearData: vi.fn(),
                setData: vi.fn(),
                types: ['application/json']
            }
        } as unknown as DragEvent);

        // button should appear after drop
        expect(
            screen.getByRole('button', { name: 'リセット' })
        ).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'リセット' }));
        expect(screen.getByText('ここに元素をドロップ')).toBeInTheDocument();
    });
});
