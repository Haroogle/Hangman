import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Figure from "./figure";
function Game({ answer, setAnswer }) {
  const [guesses, setGuesses] = useState([]);
  const [guessLetter, setGuessLetter] = useState("");

  const navigate = useNavigate();

  const guessesLeft = useMemo(() => {
    return (
      7 -
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

  const wrongLetters = guesses.filter((g) => {
    return !answer.includes(g);
  });

  const guess = (e) => {
    e.preventDefault();
    const formValid =
      /[a-z]{1}/.test(guessLetter) && !guesses.includes(guessLetter);
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
      <div className="endScreenWin">
        {" "}
        You win!
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    );
  } else {
    if (guessesLeft > 0) {
      return (
        <div className="game-container">
          <p>Guesses left: {guessesLeft}</p>
          <p>
            Wrong Letters :{" "}
            {wrongLetters.map((l, i) => {
              return (
                <span className="letterDisplay">
                  {l}
                  {","}
                </span>
              );
            })}
          </p>

          <form className="guessForm" onSubmit={guess}>
            <div>
              <label className="guessLabel">Guess</label>
              <input
                maxLength={1}
                value={guessLetter}
                onChange={(e) => setGuessLetter(e.target.value)}
              />
            </div>
            <button type="submit">Guess</button>
          </form>
          <div>
            {lettersToShow.map((l, i) => {
              return <span className="letterDisplay">{l}</span>;
            })}
          </div>
          <Figure guessesLeft={guessesLeft} />
        </div>
      );
    } else {
      return (
        <div className="endScreenLose">
          WordSetter Wins! The word was {answer.toUpperCase()}
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      );
    }
  }
}
export default Game;
