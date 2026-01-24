import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
import { Btn } from './Btn';

test('test btn', () => {
  render(<Btn>Test Btn</Btn>);
});
