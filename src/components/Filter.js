import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const {
    filterForm,
    handleChange,
    addFilter,
    columnFilterOptions,
  } = useContext(TableContext);

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        addFilter();
      } }
    >
      <label htmlFor="column-filter">
        <select
          name="columnInput"
          value={ filterForm.columnInput }
          id="column-filter"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          {columnFilterOptions.map((e, i) => <option key={ i } value={ e }>{e}</option>)}

        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparisonInput"
          value={ filterForm.comparisonInput }
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          name="valueInput"
          data-testid="value-filter"
          id="value"
          value={ filterForm.valueInput }
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="button-filter"
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}
