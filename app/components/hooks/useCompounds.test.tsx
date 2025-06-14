import { renderHook, waitFor } from '@testing-library/react';
import { useCompounds } from './useCompounds';

vi.mock('@/components/utils/compounds', () => ({
    fetchCompounds: vi.fn(() =>
        Promise.resolve({
            test: { displayName: 'T', formula: {}, layout: [], props: {} }
        })
    )
}));

describe('useCompounds', () => {
    it('fetches compounds', async () => {
        const { result } = renderHook(() => useCompounds());
        await waitFor(() => {
            expect(result.current).toHaveProperty('test');
        });
    });
});
