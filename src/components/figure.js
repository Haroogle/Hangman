const Figure = ({ guessesLeft }) => {
  return (
    <svg height="250" width="200" class="figure-container">
      {/*<!-- Rod -->*/}
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />
      {guessesLeft < 7 && (
        <line x1="140" y1="20" x2="140" y2="50" className="figure-part" />
      )}

      {/*<!-- Head -->*/}
      {guessesLeft < 6 && <circle cx="140" cy="70" r="20" />}
      {/*<!-- Body -->*/}
      {guessesLeft < 5 && <line x1="140" y1="90" x2="140" y2="150" />}
      {/*<!-- Arms -->*/}
      {guessesLeft < 4 && <line x1="140" y1="120" x2="120" y2="100" />}
      {guessesLeft < 3 && <line x1="140" y1="120" x2="160" y2="100" />}
      {/*<!-- Legs -->*/}
      {guessesLeft < 2 && <line x1="140" y1="150" x2="120" y2="180" />}
      {guessesLeft < 1 && <line x1="140" y1="150" x2="160" y2="180" />}
    </svg>
  );
};
export default Figure;
