import { useHttp } from "../hooks/http-hook";

const PokeService = () => {
  const _apiBase = "https://pokeapi.co/api/v2";
  let _baseLimit = 3;
  const { loading, clearError, error, request } = useHttp();

  const getPokeList = async (limit = _baseLimit, filter) => {
    if (filter === "all") {
      const res = await request(`${_apiBase}/pokemon?limit=${limit}`);
      const promises = res.results.map((e) => getPokeListItem(e.name));
      return Promise.all(promises);
    } else {
      const res = await request(`${_apiBase}/type/${filter}`);
      const totalCount = res.pokemon.length;

      const promises = res.pokemon
        .slice(0, Math.min(limit, totalCount))
        .map((e) => getPokeListItem(e.pokemon.name));

      return Promise.all(promises);
    }
  };

  const getPokeStats = async (id) => {
    const res = await request(`${_apiBase}/pokemon/${id}`);
    return _transformPokemon(res);
  };

  const getPokeListItem = async (pokemonName) => {
    const res = await request(`${_apiBase}/pokemon/${pokemonName}`);
    return _transformPokemon(res);
  };

  const getAllType = async () => {
    const res = await request(`${_apiBase}/type`);
    return res.results;
  };

  const _transformPokemon = (res) => {
    const officialArtwork = res.sprites.other["official-artwork"];
    const arr = [
      { stat: { name: "Type" }, base_stat: res.types[0].type.name },
      ...res.stats,
      { stat: { name: "weight" }, base_stat: res.weight },
      { stat: { name: "Total Moves" }, base_stat: res.moves.length },
    ];
    return {
      name: res.name,
      id: res.id,
      img: officialArtwork.front_default,
      types: res.types.map((e) => e.type.name),
      stats: arr,
    };
  };

  return {
    getPokeList,
    getPokeListItem,
    getPokeStats,
    getAllType,
    loading,
    clearError,
    error,
  };
};

export default PokeService;
