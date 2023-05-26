import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import Filter from './Filter';
import ShowFilters from './ShowFilters';

export default function Table() {
  const {
    filteredPlanetsList,
    searchInput,
    inputChange,
  } = useContext(TableContext);
  return (
    <div>
      <section>
        <form>
          <label htmlFor="name-filter">
            <input
              data-testid="name-filter"
              id="name-filter"
              value={ searchInput }
              onChange={ inputChange }
            />
          </label>
        </form>
      </section>
      <section>
        <Filter />
        <ShowFilters />
      </section>
      <table>
        <thead>
          <tr data-testid="table-attributes">
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { (filteredPlanetsList) && filteredPlanetsList.map((planet, index) => (
            <tr key={ index } data-testid="table-planets">
              <th>{ planet.name }</th>
              <th>{ planet.rotation_period }</th>
              <th>{ planet.orbital_period }</th>
              <th>{ planet.diameter }</th>
              <th>{ planet.climate }</th>
              <th>{ planet.gravity }</th>
              <th>{ planet.terrain }</th>
              <th>{ planet.surface_water }</th>
              <th>{ planet.population }</th>
              <th>{ planet.films }</th>
              <th>{ planet.created }</th>
              <th>{ planet.edited }</th>
              <th>{ planet.url }</th>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

// 25:28
