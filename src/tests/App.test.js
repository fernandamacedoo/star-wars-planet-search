import React from 'react';
import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import testData from '../../cypress/mocks/testData'

describe('Testa quando a aplicação é inicializada',() => {
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(testData),
  //   })
  // })
  beforeEach(() => {
    render(<App />);
  })
  it('Se são renderizados os inputs de pesquisa e de filtro', () => {
    
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();

    const inputColumn = screen.getByTestId('column-filter');
    expect(inputColumn).toBeInTheDocument();

    const inputComparison = screen.getByTestId('comparison-filter');
    expect(inputComparison).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument();

  });
  it('Se é renderizado o botão de filtrar', () => {
    
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();

  });
  it('Se é renderizada uma tabela com dez planetas', async() => {

    await waitFor(() => {
      expect(screen.getAllByTestId('table-planets')).toHaveLength(10);
    })
 
  });

})

describe('Testa a pesquisa por nome', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Testa se ao digitar ~tato~ aparece apenas um planeta na tabela', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('table-planets')).toHaveLength(10);
    })
    userEvent.type(screen.getByTestId('name-filter'), 'tato');
    expect(screen.getAllByTestId('table-planets')).toHaveLength(1);
  });

  it('Testa se ao digitar ~oo~ aparecem os planetas Tatooine e Naboo', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('table-planets')).toHaveLength(10);
    })
    userEvent.type(screen.getByTestId('name-filter'), 'oo');
    expect(screen.getAllByTestId('table-planets')).toHaveLength(2);
  });
})

describe('Testa os filtros', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Testa se, ao adicionar um filtro, a tabela é atualizada corretamente', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('table-planets')).toHaveLength(10);
    })
    const inputColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(inputColumn, 'rotation_period');

    const inputComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(inputComparison, 'maior que');

    const inputValue = screen.getByTestId('value-filter')
    userEvent.type(inputValue, '25');

    userEvent.click(screen.getByTestId('button-filter'))

    expect(screen.getAllByTestId('table-planets')).toHaveLength(2);

  })

  it('Testa se, ao adicionar dois filtros, a tabela é atualizada corretamente', async () => {

  })

  it('Testa se, ao adicionar remover um filtro, a tabela é atualizada corretamente', async () => {

  })

  it('Testa se, ao clicar no botão de remover todos os filtros, a tabela retorna ao estado inicial', async () => {

  })

})