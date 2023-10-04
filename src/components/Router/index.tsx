import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Pokemons = lazy(() => import('../../pages/Pokemons'));
const FullPokemon = lazy(() => import('../../pages/FullPokemon'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage'));

const Router: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div />}>
            <Pokemons />
          </Suspense>
        }
      />
      <Route
        path="pokemon/:id"
        element={
          <Suspense fallback={<div />}>
            <FullPokemon />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div />}>
            <ErrorPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Router;
