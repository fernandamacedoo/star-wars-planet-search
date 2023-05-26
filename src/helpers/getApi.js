const fetchData = async () => {
  const data = await (await fetch('https://swapi.dev/api/planets/')).json();
  const { results } = data;
  const response = results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return response;
};

export default fetchData;
