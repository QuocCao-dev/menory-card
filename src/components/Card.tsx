import { TCard } from "../types/card";

type Props = {
  card: TCard;
  onClickCard: (card: TCard) => void;
  flipped: boolean;
};

const Card = ({ card, onClickCard: onClickCard, flipped }: Props) => {
  const handleClickCard = (card: TCard) => () => {
    onClickCard(card);
  };

  return (
    <div className="card" onClick={handleClickCard(card)}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" alt="card front" src={card.src} />
        <img className="back" src="img/cover.png" alt="cover" />
      </div>
    </div>
  );
};
export default Card;
