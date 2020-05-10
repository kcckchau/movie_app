import React, { useState } from 'react'
import axios from 'axios'
import Search from './components/search'

function App() {
  const apiurl = "http://www.omdbapi.com/?apikey=48b224f3";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const search = (e) => {
    if (e.key == "Enter")
    {
      axios(apiurl, "&s=" + state.s).then((data)=>{
        console.log ("data " + data);
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
      </main>
    </div>
  );
}

export default App;
