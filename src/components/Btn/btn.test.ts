import Btn from './Btn';

import { describe, test, expect } from 'vitest';

describe('Btn', () => {
  test('should render a button', () => {
    const btn = Btn({
      children: 'Click me!',
      tag: 'button',
      type: 'button',
    });

    expect(btn.tagName).toBe('BUTTON');
    expect(btn.textContent).toBe('Click me!');
  });

  test('should render a link', () => {
    const btn = Btn({
      children: 'Click me!',
      tag: 'link',
      to: '/home',
    });

    expect(btn.tagName).toBe('A');
    expect(btn.textContent).toBe('Click me!');
  });
});