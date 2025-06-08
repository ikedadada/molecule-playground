import type { Meta, StoryObj } from '@storybook/react';

import { AtomsCanvas } from './AtomsCanvas';

const meta = {
    component: AtomsCanvas
} satisfies Meta<typeof AtomsCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleAtoms: Story = {
    args: {
        atoms: [{ symbol: 'H', color: '#b3e5fc', x: 0, y: 0, z: 0 }]
    }
};

export const MultipleAtoms: Story = {
    args: {
        atoms: [
            { symbol: 'H', color: '#b3e5fc', x: 0, y: 0, z: 0 },
            { symbol: 'O', color: '#ff8a80', x: 1, y: 1, z: 1 },
            { symbol: 'C', color: 'bdbdbd', x: -1, y: -1, z: -1 }
        ]
    }
};
