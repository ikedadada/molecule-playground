import { renderHook, waitFor } from '@testing-library/react';
import { useElements } from './useElements';

vi.mock('@/components/utils/elements', () => ({
    fetchElements: vi.fn(() =>
        Promise.resolve([{ symbol: 'H', color: '#fff' }])
    )
}));

describe('useElements', () => {
    it('fetches elements', async () => {
        const { result } = renderHook(() => useElements());
        await waitFor(() => {
            expect(result.current.length).toBe(1);
        });
    });
});
