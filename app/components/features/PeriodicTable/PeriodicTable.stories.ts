import type { Meta, StoryObj } from '@storybook/react';

import { PeriodicTable } from './PeriodicTable';

const meta = {
    component: PeriodicTable
} satisfies Meta<typeof PeriodicTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        elements: [
            { symbol: 'H', color: '#e0f7fa' },
            { symbol: 'O', color: '#fce4ec' },
            { symbol: 'C', color: '#e8f5e9' },
            { symbol: 'N', color: '#fff3e0' },
            { symbol: 'Na', color: '#e3f2fd' },
            { symbol: 'Cl', color: '#f9fbe7' },
            { symbol: 'S', color: '#f3e5f5' }
        ]
    }
};
