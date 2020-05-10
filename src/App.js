import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

function App() {
  const apiurl = "http://www.omdbapi.com/?apikey=48b224f3";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const search = (e) => {
    if (e.key === "Enter")
    {
      axios(apiurl + "&s=" + state.s).then(({ data })=>{

        let results = data.Search;
        setState(prevState => {
          return {...prevState, results: results};
        });
      });
    }

  }
  const handleInput = (e) => {
    let s = e.target.value;
    console.log(s);

    setState(prevState => {
      return {...prevState, s: s}
    });

    console.log(state.s);
  }

  const openPopup = (id) => {
    console.log("openPopup");
    axios(apiurl + "&i=" + id).then(( {data} ) => {
      let result = data;
      console.log("openpopup with " + result);
      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, selected: {}};
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search
          handleInput={handleInput}
          search={search}        
        />
        <Results results={state.results} openPopup={openPopup}/>
        {(typeof state.selected.Title != "undefined") ?
        <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
