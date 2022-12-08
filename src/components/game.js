import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
function Game({ answer, setAnswer }) {
  const [guesses, setGuesses] = useState([]);
  const [guessLetter, setGuessLetter] = useState("");
  const navigate = useNavigate();
  const guessesLeft = useMemo(() => {
    return (
      8 -
      guesses.filter((g) => {
        return !answer.includes(g);
      }).length
    );
  }, [answer, guesses]);
  const lettersToShow = useMemo(() => {
    return answer.split("").map((a) => {
      if (guesses.includes(a)) {
        return a;
      }
      return "_";
    });
  }, [answer, guesses]);
  const isWin = useMemo(() => {
    const includedLetters = guesses.filter((g) => {
      return answer.includes(g);
    });
    return answer.split("").every((a) => {
      return includedLetters.includes(a);
    });
  }, [answer, guesses]);
  const guess = (e) => {
    e.preventDefault();
    const formValid = /[a-z]{1}/.test(guessLetter);
    if (!formValid) {
      return;
    }
    setGuesses((guesses) => [...guesses, guessLetter]);
    setGuessLetter("");
  };
  const reset = () => {
    setGuesses([]);
    setGuessLetter("");
    setAnswer("");

    navigate("/");
  };
  if (isWin) {
    return (
      <div className="App">
        {" "}
        You win
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    );
  } else {
    if (guessesLeft > 0) {
      return (
        <div>
          <p>guesses left: {guessesLeft}</p>
          <form onSubmit={guess}>
            <div>
              <label>guess</label>
              <input
                value={guessLetter}
                onChange={(e) => setGuessLetter(e.target.value)}
              />
            </div>
            <button type="submit">guess</button>
          </form>
          {lettersToShow.map((l, i) => {
            return <span>{l}</span>;
          })}
        </div>
      );
    } else {
      return (
        <div>
          WordSetter Wins.The word was {answer.toUpperCase()}
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
      );
    }
  }
}
export default Game;
