import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('@/components/hooks/useCompounds', () => ({
    useCompounds: () => ({})
}));
vi.mock('@/components/hooks/useElements', () => ({
    useElements: () => []
}));
vi.mock('@/components/features/BuilderWorkspace', () => ({
    BuilderWorkspace: () => <div>workspace</div>
}));
vi.mock('@/components/features/PeriodicTable', () => ({
    PeriodicTable: () => <div>table</div>
}));

import { Home } from './home';

describe('Home page', () => {
    it('renders child components', () => {
        render(<Home />);
        expect(screen.getByText('Molecule Playground')).toBeInTheDocument();
        expect(screen.getByText('workspace')).toBeInTheDocument();
        expect(screen.getByText('table')).toBeInTheDocument();
    });
});
