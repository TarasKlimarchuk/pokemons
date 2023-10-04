import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FullPokemon from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

jest.mock('../../hooks/usePokemon', () => ({
  usePokemon: (id: number | string) => ({
    pokemon: {
      id: 1,
      name: 'Pikachu',
      stats: [
        { name: 'HP', baseStat: 35, effort: 0 },
        { name: 'Attack', baseStat: 55, effort: 0 },
      ],
      abilities: [
        { name: 'Static', isHidden: false },
        { name: 'Lightning Rod', isHidden: true },
      ],
    },
    loading: false,
    error: null,
  }),
}));

describe('FullPokemon', () => {
  beforeAll(() => {
    global.matchMedia =
      global.matchMedia ||
      function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  });

  it('should render FullPokemon component', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <FullPokemon />
      </MemoryRouter>
    );

    expect(screen.getByText(/Pikachu/)).toBeInTheDocument();
    expect(screen.getByText(/Stats:/)).toBeInTheDocument();
    expect(screen.getByText(/HP/)).toBeInTheDocument();
    expect(screen.getByText(/Attack/)).toBeInTheDocument();
    expect(screen.getByText(/Abilities:/)).toBeInTheDocument();
    expect(screen.getByText(/Static/)).toBeInTheDocument();
    expect(screen.getByText(/Lightning Rod/)).toBeInTheDocument();
  });

  it('should navigate to home', async () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <FullPokemon />
      </MemoryRouter>
    );

    const linkButton = screen.getByText('All pokemons');

    userEvent.click(linkButton);

    expect(window.location.pathname).toBe('/');
  });
});
