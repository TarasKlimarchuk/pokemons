import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Card, Descriptions, DescriptionsProps, Result } from 'antd';
import Meta from 'antd/lib/card/Meta';

import styles from './FullPokemon.module.scss';

import { usePokemon } from '../../hooks/usePokemon';
import { Loader } from '../../components';

const FullPokemon: FC = () => {
  const params = useParams<{ id: string }>();

  const { pokemon, loading, error } = usePokemon(params.id || '');

  const statItems: DescriptionsProps['items'] = pokemon?.stats.map((stat) => ({
    key: stat.name,
    label: stat.name,
    children: (
      <div>
        base stat: {stat.baseStat}, effort: {stat.effort}
      </div>
    ),
  }));

  return (
    <div className={styles.container}>
      <Button type={'link'}>
        <Link to={'/'}>All pokemons</Link>
      </Button>
      {error ? (
        <Result className={styles.result} status="error" title={error} />
      ) : loading ? (
        <Loader />
      ) : (
        <Card
          className={styles.card}
          cover={
            <img
              alt="example"
              src="https://cdn.vox-cdn.com/thumbor/-famZFxgMFo2h1HQ5UjIIcBszrI=/0x0:1920x1080/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg"
            />
          }
        >
          <Meta
            title={<span className={styles.pokemonName}>{pokemon?.name}</span>}
            description={
              <div>
                <Descriptions title="Stats:" items={statItems} />
                <div className={styles.ability}>
                  <span className={styles.abilityTitle}>Abilities:</span>{' '}
                  {pokemon?.abilities.map((ability, index) => (
                    <span key={ability.name}>
                      {ability.name},{' '}
                      <span className={styles.hiddenTitle}>hidden</span>:{' '}
                      {ability.isHidden ? 'yes' : 'no'}
                      {index + 1 !== pokemon.abilities.length && '; '}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        </Card>
      )}
    </div>
  );
};

export default FullPokemon;
