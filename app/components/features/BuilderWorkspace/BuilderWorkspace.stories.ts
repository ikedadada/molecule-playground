import type { Meta, StoryObj } from '@storybook/react';

import { BuilderWorkspace } from './BuilderWorkspace';

const meta = {
    component: BuilderWorkspace
} satisfies Meta<typeof BuilderWorkspace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        compounds: {}
    }
};
