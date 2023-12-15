import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { InjectorErrorComponent } from './injector-error.component';

const meta: Meta<InjectorErrorComponent> = {
  title: 'Injector Error',
  component: InjectorErrorComponent,
  tags: ['autodocs'],
  render: (args: InjectorErrorComponent) => {
    console.log('HI)');
    return {
      props: {
        ...args,
      },
      template: `
        <app-injector-error
            ${argsToTemplate(args)}></app-injector-error>`,
    };
  },
};

export default meta;
type Story = StoryObj<InjectorErrorComponent>;

export const First: Story = {
  args: {
    list: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
    ],
  },
};

export const Second: Story = {
  args: {
    list: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6',
      'Item 7',
    ],
  },
};
