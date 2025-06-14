import { act, renderHook } from '@testing-library/react';
import { useCompoundMatcher } from './useCompoundMatcher';

const compounds = {
    H2O: {
        displayName: 'Water',
        formula: { H: 2, O: 1 },
        layout: [],
        props: {}
    }
};

describe('useCompoundMatcher', () => {
    it('matches compound from elements', () => {
        const { result, rerender } = renderHook(
            ({ elements }) => useCompoundMatcher(elements, compounds),
            { initialProps: { elements: [] } }
        );

        expect(result.current).toBeNull();

        act(() => {
            rerender({
                elements: [
                    { symbol: 'H', color: '#fff' },
                    { symbol: 'O', color: '#fff' },
                    { symbol: 'H', color: '#fff' }
                ]
            });
        });

        expect(result.current).toBe('H2O');
    });
});
