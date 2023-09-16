import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import _ from "lodash";
import { TCard } from "./types/card";

const cardData = [
  { src: "img/ring-1.png", matched: false },
  { src: "img/helmet-1.png", matched: false },
  { src: "img/potion-1.png", matched: false },
  { src: "img/scroll-1.png", matched: false },
  { src: "img/shield-1.png", matched: false },
  { src: "img/sword-1.png", matched: false },
];

const shuffleCards = (cards: TCard[]) => {
  return _.shuffle(cards.map((card, index) => ({ ...card, id: index + 1 })));
};

function App() {
  const [cards, setCards] = useState(shuffleCards([...cardData, ...cardData]));
  const [choice1, setChoice1] = useState<TCard | null>(null);
  const [choice2, setChoice2] = useState<TCard | null>(null);

  const handleNewGame = () => {
    setCards(shuffleCards([...cardData, ...cardData]));
  };

  const handleClickCard = (card: TCard) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  useEffect(() => {
    if (choice1 && choice2) {
      if (choice1.src === choice2.src) {
        setCards(
          cards.map((card) => {
            if (card.src === choice1.src) return { ...card, matched: true };
            return card;
          })
        );
        setChoice1(null);
        setChoice2(null);
      } else {
        setTimeout(() => {
          setChoice1(null);
          setChoice2(null);
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={handleNewGame}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              onClickCard={handleClickCard}
              flipped={choice1 === card || choice2 === card || card?.matched}
            />
          ))}
        </div>

        <p>Turns: (TURN)</p>
      </div>
    </>
  );
}

export default App;
