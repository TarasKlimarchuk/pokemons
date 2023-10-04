import { renderHook, waitFor } from '@testing-library/react';
import { usePokemon } from './usePokemon'; // Import your custom hook here
import { PokemonsApi } from '../api/pokemons';

// Mock the PokemonsApi.getPokemonByID function and is404requestError function
jest.mock('../api/pokemons', () => ({
  PokemonsApi: {
    getPokemonByID: jest.fn(),
  },
}));
const mockGetPokemonByID = PokemonsApi.getPokemonByID as jest.Mock;

test('usePokemon returns the expected data when successful', async () => {
  const mockPokemon = { id: '1', name: 'Pikachu' };
  mockGetPokemonByID.mockResolvedValue(mockPokemon);

  const { result } = renderHook(() => usePokemon('1'));

  expect(result.current.loading).toBe(true);
  expect(result.current.error).toBe('');

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.pokemon).toEqual(mockPokemon);
  });
});

test('usePokemon handles API error', async () => {
  const FakeErrorMessage = 'Fake Error';
  const error = new Error(FakeErrorMessage);
  mockGetPokemonByID.mockRejectedValue(error);

  const { result } = renderHook(() => usePokemon('1'));

  expect(result.current.loading).toBe(true);
  expect(result.current.error).toBe('');

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(FakeErrorMessage);
    expect(result.current.pokemon).toBeUndefined();
  });
});
