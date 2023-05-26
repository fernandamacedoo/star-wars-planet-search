import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';
import getApi from '../helpers/getApi';

export default function TableProvider({ children }) {
  const [planetsList, setPlanetsList] = useState(null);
  const [filteredPlanetsList, setFilteredPlanetsList] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [columnFilterOptions, setColumnFilterOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filterForm, setFilterForm] = useState({
    columnInput: columnFilterOptions[0],
    comparisonInput: 'maior que',
    valueInput: '0',
  });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const planets = async () => {
      const getPlanets = await getApi();
      setPlanetsList(getPlanets);
      setFilteredPlanetsList(getPlanets);
    };
    planets();
  }, []);

  const inputChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
    setFilteredPlanetsList(planetsList.filter(
      (planet) => planet.name.toLowerCase().includes(value.toLowerCase()),
    ));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterForm({
      ...filterForm,
      [name]: value,
    });
  };

  const filterFunc = (allFilters) => {
    if (allFilters.length) {
      let arrayFilteredPlanets = planetsList;
      allFilters.forEach((fltr) => {
        const { columnInput, valueInput, comparisonInput } = fltr;

        switch (comparisonInput) {
        case 'maior que':
          arrayFilteredPlanets = arrayFilteredPlanets
            ?.filter((planet) => +planet[columnInput] > +valueInput);
          break;
        case 'menor que':
          arrayFilteredPlanets = arrayFilteredPlanets
            ?.filter((planet) => +planet[columnInput] < +valueInput);
          break;
        case 'igual a':
          arrayFilteredPlanets = arrayFilteredPlanets
            ?.filter((planet) => +planet[columnInput] === +valueInput);
          break;
        default:
          console.log('default');
        }
      });
      setFilteredPlanetsList(arrayFilteredPlanets);
    } else {
      setFilteredPlanetsList(planetsList);
    }
  };

  const addFilter = () => {
    const filterToAdd = filterForm;
    const allFilters = [...filterByNumericValues, filterToAdd];
    const columnOptions = columnFilterOptions
      .filter((el) => el !== filterToAdd.columnInput);
    setColumnFilterOptions(columnOptions);
    setFilterByNumericValues(allFilters);
    setFilterForm({
      columnInput: columnOptions[0],
      comparisonInput: 'maior que',
      valueInput: '0',
    });
    filterFunc(allFilters);
  };

  const deleteFilter = (filterToDelete) => {
    const filtersSet = filterByNumericValues;
    const allFilters = filtersSet.filter((f) => f !== filterToDelete);
    setColumnFilterOptions([...columnFilterOptions, filterToDelete.columnInput]);
    setFilterByNumericValues(allFilters);
    filterFunc(allFilters);
  };

  const removeAllFilters = () => {
    setFilteredPlanetsList(planetsList);
    setColumnFilterOptions(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
    setFilterByNumericValues([]);
  };

  const values = {
    planetsList,
    filteredPlanetsList,
    searchInput,
    filterForm,
    columnFilterOptions,
    filterByNumericValues,
    deleteFilter,
    inputChange,
    handleChange,
    addFilter,
    removeAllFilters,
  };

  return (
    <TableContext.Provider value={ values }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
