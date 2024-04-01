import { useEffect, useRef, useState } from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {

  const red = {border : '3px solid rgb(222, 52, 52)'}
  const defaultInput = <span style={red}>

    <input type="text" maxLength="1" pattern="[0-9]*" inputmode="numeric" placeholder='X' />

  </span>
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [inputFields, setInputFields] = useState(defaultInput);
  const [values, setValues] = useState([])
  const [count, setCount] = useState(1);
  const [enter, setEnter] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [gameover, setGameover] = useState(false);

  const style = (box,span) => {
    box.style.color = 'rgb(80, 159, 90)';
    // box.style.border = '2px solid red';
    span.style.border = '4px solid rgb(80, 159, 80)';
  }

  
  const getARandomNumber = () => {
    return Math.floor(Math.random() * 10);
  }

  const inputref = useRef([]);
  const spanref = useRef([]);
  var t;

  useEffect(
    () => {

      if (playing) {
        if (enter) {
          setInputFields(

            values.map((i, index) => <span style={red} ref={(el) => { spanref.current[index] = el }} >

              <input  key={index} type="text" maxLength="1" pattern="[0-9]*" inputmode="numeric" placeholder='X' onChange={() => handleChange(index)} ref={(el) => { inputref.current[index] = el }} />

            </span>)

          )

        }
        else
          setInputFields(values.map((i, index) => <span> <input type='number' placeholder='X' value={i} /> </span>))
      }
      else {
        endgame();
      }


    }
    , [enter, playing])


  useEffect(() => {
    if (enter && inputref.current.length > 0 && inputref.current[0]) {
      // Focus on the first input field after it has been rendered
      inputref.current[0].focus();
    }
  }, [inputFields]); // Add inputFields as a dependency



  const handleChange = (index) => {



    console.log(inputref.current[index].value, values[index]);
    if (inputref.current[index].value == values[index]) {
      console.log(true);
      style(inputref.current[index],spanref.current[index]);

      setCount(count + 1);
      console.log(count);


      if (index == values.length - 1) {
        setScore(score + timer * 10);
        start();
      }

      if (index < inputref.current.length - 1 && inputref.current[index + 1]) {

        inputref.current[index + 1].focus();

      }



    } else {

      console.log(false);
      // inputref.current[index].value = '';
      setGameover(true);
      endgame();

    }

  }

  const start = () => {

    var arr = [];

    for (let i = 0; i < timer + 1; i++) {
      arr.push(getARandomNumber());
    }

    setValues(arr);

    setEnter(false);

    t = setTimeout(() => {

      setEnter(true);

      // setTimeout(() => { }, (timer + 1) * 1000)

    }, (timer + 1) * 1000);


    setTimer(timer + 1);

  }

  const endgame = () => {
    clearTimeout(t);
    setTimer(0);
    // setScore(0);
    setValues([]);
    setEnter(true);
    // setInputFields(defaultInput);
    inputref.current = [];
    setPlaying(false);
    
  }

  const handleStart = () => {

    if (playing) {
      endgame();
      // setValues([]);
      setInputFields(defaultInput);

    } else {

      setGameover(false);
      setScore(0);
      start();

      setPlaying(true);
    }

  }

  return (
    <div className="App">
      <div id='contaner'>
        <div className='header'>
          <div className='input-box'>

            <div className='score'>
              <h2>Score</h2>
              <p>{score}</p>
            </div>
            <button onClick={() => handleStart()}>START</button>

            {/* <button onClick={gameover}>RESET</button> */}

            <div className='timer'>
              <h2>Timer</h2>
              <p><Timer time={timer} /></p>
            </div>

          </div>
        </div>
        <div className='number-contaner'>

          {inputFields}

        </div>
        <div className='gameover'>

          {gameover ? <h2>Game Over</h2> : <></>}

        </div>
      </div>
    </div>
  );
}

export default App;
