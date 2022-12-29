import React, { useState, useRef } from 'react';
import './filtersSelect.css';

function Filters() {
  const [filter, setFilter] = useState('none');
  const selectedEl = useRef(null);

  const chosenFilter = () => {
    setFilter();
  };
  return (
    <div>
      <fieldset>
        <div>
          <img id='filter-1977' alt='1977'></img>
        </div>
        <div>
          <img id='filter-aden' alt='aden'></img>
        </div>
        <div>
          <img id='filter-amaro' alt='amaro'></img>
        </div>
        <div>
          <img id='filter-ashby' alt='ashby'></img>
        </div>
        <div>
          <img id='filter-brannan' alt='brannan'></img>
        </div>
        <div>
          <img id='filter-brooklyn' alt='brooklyn'></img>
        </div>
        <div>
          <img id='filter-charmes' alt='charmes'></img>
        </div>
        <div>
          <img id='filter-clarendon' alt='clarendon'></img>
        </div>
        <div>
          <img id='filter-crema' alt='crema'></img>
        </div>
        <div>
          <img id='filter-dogpatch' alt='dogpatch'></img>
        </div>
        <div>
          <img id='filter-earlybird' alt='earlybird'></img>
        </div>
        <div>
          <img id='filter-gingham' alt='gingham'></img>
        </div>
        <div>
          <img id='filter-ginza' alt='ginza'></img>
        </div>
      </fieldset>
    </div>
  );
}

export default Filters;
