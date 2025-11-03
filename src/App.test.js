import { render, screen } from '@testing-library/react';
import App from './App';

test('affiche le titre principal', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Marchez avec style/i });
  expect(heading).toBeInTheDocument();
});
