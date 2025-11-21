import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ZapLink app', () => {
  render(<App />);
  const linkElement = screen.getByText(/ZapLink/i);
  expect(linkElement).toBeInTheDocument();
});
