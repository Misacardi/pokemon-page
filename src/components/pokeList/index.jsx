import React, { useEffect, useState } from "react";
import "./pokeList.css";
import PokeService from "../../services/pokeService";
import Spinner from "../../utils/spinner";
import Error from "../../utils/error";





export default function PokeList(props) {
  const [pok, setPok] = useState([]);
  let [limit, setLimit] = useState(12);
  const [types, setTypes] = useState([]);
  const [selecType, setSelecType] = useState('all')








  const { getPokeList,getAllType, loading, error } = PokeService();

  useEffect(() => {
    setPok(null)
    getPokemon();
    getAllType()
      .then(setTypes)
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecType]);



  const getPokemon = () => {
    
    getPokeList(limit, selecType).then(setPok);
    setLimit((limit) => limit + 9);
  };


  const viewPokemon =
    pok &&
    pok.map((e) => {
      const setTypes = e.types.map((t, i) => {
        return <span key={i} className={"type " + t}>{t}</span>;
      });

      return (
        <li onClick={() => {props.setId(e.id)}} key={e.id} className="pokeList__item">
          <img src={e.img} alt="" />
          <span>{e.name}</span>
          <div className="types">{setTypes}</div>
        </li>
      );
    });
  return (
    <div className="pokeList">
<div className="container">
        <select value={selecType} onChange={e => {setSelecType(e.target.value); setLimit(12)}}>
          <option value="all">All Pokemons</option>
            {types && types.map(e => {
              return(
                <option value={e.name}>{e.name}</option>
              )
            })}
        </select>



          <ul className="pokeList__inner">
                    
                        
                
                {pok ? viewPokemon : null}
                {error ? <Error/>: null}
                {loading | !pok?  <Spinner/> :  <button onClick={getPokemon}>Load More</button>}
      
        
          </ul>
      
       
        

    </div>

    </div>
    
  );
}
