import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputWord({ setAnswer }) {
  const [inputWord, setInputword] = useState("");
  const navigate = useNavigate();
  const enter = (e) => {
    e.preventDefault();
    setAnswer(inputWord);
    setInputword("");
    navigate("/game");
  };
  const answerInput = (e) => {
    setInputword(e.target.value.toLowerCase());
  };
  return (
    <>
      <div className="inputWord" onSubmit={enter}>
        <form>
          <label>
            To Start Game Input a Word
            <input
              className="inputWordField"
              type="password"
              label="answer"
              name="answer"
              required
              onChange={answerInput}
            />
          </label>
          <input className="submitButton" type="submit" value="Enter" />
        </form>
      </div>
    </>
  );
}
export default InputWord;
