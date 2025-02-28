/* This code snippet is a unit test written in JavaScript using the Jest testing framework and the
React Testing Library. */
import { render, screen } from '@testing-library/react';
import Header from './components/Header';

test('nombre del jugador', () => {
  const playerName = "Adri";
  render(<Header playerName={playerName} matches={0} errors={0} time={0} />);

  const playerNameElement = screen.getByText(/Juan/i);
  expect(playerNameElement).toBeInTheDocument();
});