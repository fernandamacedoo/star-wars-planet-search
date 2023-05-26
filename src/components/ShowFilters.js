import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function ShowFilters() {
  const {
    filterByNumericValues,
    deleteFilter,
    removeAllFilters,
  } = useContext(TableContext);

  return (
    <div>
      { filterByNumericValues && filterByNumericValues.map((filter, i) => (
        <div key={ i } data-testid="filter">
          <h5>
            { `${filter.columnInput} ${
              filter.comparisonInput} ${
              filter.valueInput}` }

          </h5>
          <button
            type="button"
            onClick={ () => deleteFilter(filter) }
          >
            Remover filtro
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover Filtragens
      </button>
    </div>
  );
}
