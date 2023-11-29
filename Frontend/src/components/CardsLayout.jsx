import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardsLayout() {
  const sizes = ['small', 'medium', 'small', 'medium', 'small', 'medium', 'large', 'large'];
  const totalCards = 50; // Define el número total de tarjetas que deseas mostrar
  const [cards, setCards] = useState(Array(20).fill().map((_, i) => ({ size: sizes[i % sizes.length] })));
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (loading || cards.length >= totalCards) return;
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 50) return;
    loadMoreCards();
  };

  const loadMoreCards = () => {
    setLoading(true);
    const newCards = Array(5).fill().map((_, i) => ({ size: sizes[(i + cards.length) % sizes.length] }));
    setCards(prevCards => [...prevCards, ...newCards]);
    setTimeout(() => setLoading(false), 500); // Ajusta el retraso según sea necesario
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, cards]);

  return (
    <div style={styles.card_container}>
      {cards.map((card, index) => <Card key={index} size={card.size} />)}
    </div>
  );
}

const styles = {
  card_container: {
    zIndex: 1,
    margin: 0,
    padding: 0,
    width: '100vw',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 250px)',
    gridAutoRows: '10px',
    justifyContent: 'center',
  },
};

export default CardsLayout;