import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [isGreen, setIsGreen] = useState(false);
  const [isBttnPressed, setIsBttnPressed] = useState(false);
  const [joke, setJoke] = useState('')

  const generateJoke = async () => {
    try {
      const options = {
        method: 'GET',
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
          accept: 'application/json',
          'X-RapidAPI-Key': '713e8fb8a1msh50b6b23ef7590f1p182f18jsn9f27399ff9ff',
          'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);

      setJoke(response.data.value);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(isBttnPressed){
      generateJoke();
      setIsBttnPressed(false);
      setTimeout(() => {
        setIsGreen(false);
      },100)
      
    }
  }, [isBttnPressed]);

  const toggleColor = () => {
    setIsGreen(true);
    setIsBttnPressed(true);

    if (isBttnPressed){
      generateJoke();
      setTimeout (() =>{
        setIsGreen(false);
      }, 500);
    }
       
  }

  return (
    <div className="Outer-Container">
      <div className="Bttn-Content">
            <p>{joke}</p>
            <button
              onClick={toggleColor}
              style= {{backgroundColor: isGreen ? "Green" : "white"}}
            > 
              Generate Fact
            </button>
      </div>
    </div>
  );
}

export default App;