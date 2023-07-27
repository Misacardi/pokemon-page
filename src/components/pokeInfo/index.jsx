import React, { useEffect, useState } from "react";
import "./pokeinfo.css";
import PokeService from "./../../services/pokeService";
import Spinner from "../../utils/spinner";
export default function PokeInfo({ getId, setId }) {
  const [inf, setInf] = useState(null);

  const { getPokeStats, loading } = PokeService();

  useEffect(() => {
    setPoke();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getId]);
  
  const setPoke = () => {
    if (!getId) {
      return;
    }
    getPokeStats(getId).then(setInf);
  };
  const open = getId ? 'info open': 'info'

  const View = () => {
    const { img, name, stats } = inf;

    return (
      <div className="info__inner">
        <img src={img} alt="" className="info__img" />
        <div className="info__title">{name} #{getId}</div>
        <ul className="info__stats">
          <div className="x" onClick={e => setId(null)} >X</div>
          {stats.map((e, i) => {
            return (
              <li key={i} className="stat">
                <div className="stat__title">
                  <div>{e.stat.name} </div>
                </div>
                <div className="stat__value">{e.base_stat}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };




  return (
  
        <div className={open}>

          {inf && !loading ? <View /> : null}
          {loading ? <Spinner/> : null  }
          
          </div>
          )
}
