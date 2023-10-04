import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Alert, List, Select, Space, Tag, Typography } from 'antd';
import Search from 'antd/lib/input/Search';

import styles from './Pokemons.module.scss';

import { usePokemons } from '../../hooks/usePokemons';
import { Loader } from '../../components';
import { LoadingStatus } from '../../root/types';

const Pokemons: FC = () => {
  const {
    pokemons,
    types,
    getPokemonsLoading,
    getPokemonsError,
    nextChunk,
    searchByName,
    filterByType,
  } = usePokemons();

  useEffect(() => {
    const scrollCallback = async () => {
      const scrollHeight = document.body.scrollHeight;
      const totalHeight = window.scrollY + window.innerHeight;

      if (totalHeight >= scrollHeight) {
        window.removeEventListener('scroll', scrollCallback);
        await nextChunk();
      }
    };

    window.addEventListener('scroll', scrollCallback);

    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, [pokemons]);

  return (
    <Space className={styles.container} direction="vertical">
      <Space>
        <Search
          placeholder="input search text"
          onSearch={searchByName}
          enterButton
        />
        <Select
          className={styles.typeSelect}
          placeholder="pokemon type"
          onChange={filterByType}
          options={types.map((type) => ({ value: type, label: type }))}
        />
        {getPokemonsLoading === LoadingStatus.LOADING && (
          <div className={styles.loader}>
            <Typography className={styles.loadingMessage}>
              Pokemons are loading...
            </Typography>{' '}
            <Loader center={false} />
          </div>
        )}
      </Space>
      {!!getPokemonsError && (
        <Alert type="error" description={getPokemonsError} />
      )}
      <List
        size="large"
        bordered
        dataSource={pokemons.map((p) => ({ ...p, key: p.name }))}
        renderItem={(p) => (
          <List.Item>
            <Link to={'/pokemon/' + p.name}>
              <span className={styles.abilityTitle}>{p.name} </span>
              {p.types.map((type) => (
                <Tag key={type}>{type}</Tag>
              ))}
            </Link>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default Pokemons;
