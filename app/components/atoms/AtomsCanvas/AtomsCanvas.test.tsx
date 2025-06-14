import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AtomsCanvas } from './AtomsCanvas';

// Mock three.js related modules so the component can render in jsdom
vi.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: { children: ReactNode }) => (
        <div data-testid="canvas">{children}</div>
    ),
    useFrame: vi.fn()
}));
vi.mock('@react-three/drei', () => ({
    OrbitControls: () => <div data-testid="orbit" />,
    Text: ({ children }: { children: ReactNode }) => <span>{children}</span>
}));
vi.mock('@react-spring/three', () => ({
    useSprings: () => [[{ position: [0, 0, 0] }]],
    a: {
        mesh: ({
            children,
            ...rest
        }: { children: ReactNode } & Record<string, unknown>) => (
            <div data-testid="mesh" {...rest}>
                {children}
            </div>
        )
    }
}));
vi.mock('three', () => ({ Mesh: class {} }));

describe('AtomsCanvas', () => {
    it('renders provided atoms', () => {
        const atoms = [{ symbol: 'H', color: '#fff', x: 0, y: 0, z: 0 }];
        render(<AtomsCanvas atoms={atoms} />);
        expect(screen.getByText('H')).toBeInTheDocument();
        expect(screen.getByTestId('canvas')).toBeInTheDocument();
    });
});
