const container = document.querySelector('.container');
const cards = document.querySelectorAll('.card');
const lastCard = document.querySelector('.card:last-child');
let counter = 1;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, {
  threshold: 1,
});

cards.forEach(card => observer.observe(card));

const lastCardObserver = new IntersectionObserver(entries => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadNewCards(counter);
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector('.card:last-child'));
  counter++;
}, {});

lastCardObserver.observe(lastCard);

function loadNewCards(iteration) {
  for (let i = 0; i <= 12; i++) {
    const card = document.createElement('div');
    let text = '';
    switch (i) {
      case 0:
        text = 'First card has been added!';
        break;
      case 12:
        text = 'Last card has been added!';
        break;
      default:
        text = `This is a card in ${format(iteration)} iteration`;
        break;
    }
    card.textContent = text;
    card.classList.add('card');
    observer.observe(card);
    container.append(card);
  }
}

function format(number) {
  switch (number) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
}