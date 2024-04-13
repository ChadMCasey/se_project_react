function shuffle(items) {
  let currentIndex = items.length;
  while (currentIndex !== 0) {
    let rand = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [items[currentIndex], items[rand]] = [items[rand], items[currentIndex]];
  }
  return items;
}

export { shuffle };
