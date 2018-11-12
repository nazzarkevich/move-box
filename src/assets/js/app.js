/* global $ */
import '../styles/index.scss';

class Board {
  constructor () {
    this.openedCards = [];
    this.levelSize = $('input[name="level"]:checked').val();
    this.boardSize = parseInt(this.levelSize * this.levelSize);
    this.cardsList = this.getCards(this.boardSize);
    this.shuffledCards = this.shuffle(this.cardsList);
  }

  markedOpened (card, interval, clicks) {
    if (this.openedCards.length > 0) {
      this.incrementMoves(clicks);
      this.openedCards.push(card);

      if (this.isMatch(this.openedCards)) {
        this.handleMatchCase(this.openedCards);
        this.openedCards = [];
      } else {
        this.handleNoMatchCase(this.openedCards);
        this.openedCards = [];
      }
    } else {
      this.openedCards.push(card);
      this.incrementMoves(clicks);
    }

    this.matchedAll(interval);
  }

  isMatch (openedCards) {
    const match = openedCards[0].innerHTML !== openedCards[1].innerHTML;

    return match ? false : true;
  }

  handleMatchCase (openedCards) {
    this.markAsMatched(openedCards);
  }

  handleNoMatchCase (openedCards) {
    setTimeout(() => {
      this.hideSymbols(openedCards);
    }, 1000);
  }

  incrementMoves (clicks) {
    this.moves = document.getElementById('moves');
    this.moves.innerHTML = clicks;
  }

  matchedAll (interval) {
    let finished = true;

    $('.card').each(function () {
      return finished = $(this).hasClass('match');
    });

    if (finished) {
      clearInterval(interval);
    }
  }

  markAsMatched (openedCards) {
    for (let i = 0; i < openedCards.length; i++) {
      $(openedCards[i]).addClass('match');
    }
  }

  hideSymbols (openedCards) {
    for (let i = 0; i < openedCards.length; i++) {
      $(openedCards[i]).removeClass('open show');
    }
  }

  shuffle (cardsList) {
    let randomIndex = null;
    let temporaryValue = null;
    let currentIndex = cardsList.length;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = cardsList[currentIndex];
      cardsList[currentIndex] = cardsList[randomIndex];
      cardsList[randomIndex] = temporaryValue;
    }

    return cardsList;
  }

  getCards (boardSize) {
    const icons = [
      '<i class="fas fa-bell"></i>',
      '<i class="fas fa-bell"></i>',
      '<i class="fas fa-award"></i>',
      '<i class="fas fa-award"></i>',
      '<i class="fab fa-amazon"></i>',
      '<i class="fab fa-amazon"></i>',
      '<i class="fas fa-anchor"></i>',
      '<i class="fas fa-anchor"></i>',
      '<i class="fab fa-android"></i>',
      '<i class="fab fa-android"></i>',
      '<i class="fab fa-avianex"></i>',
      '<i class="fab fa-avianex"></i>',
      '<i class="fas fa-bicycle"></i>',
      '<i class="fas fa-bicycle"></i>',
      '<i class="fab fa-bitcoin"></i>',
      '<i class="fab fa-bitcoin"></i>',
      '<i class="fab fa-adversal"></i>',
      '<i class="fab fa-adversal"></i>',
      '<i class="fas fa-bookmark"></i>',
      '<i class="fas fa-bookmark"></i>',
      '<i class="fas fa-box-open"></i>',
      '<i class="fas fa-box-open"></i>',
      '<i class="fab fa-autoprefixer"></i>',
      '<i class="fab fa-autoprefixer"></i>',
      '<i class="fas fa-bowling-ball"></i>',
      '<i class="fas fa-bowling-ball"></i>',
      '<i class="fas fa-air-freshener"></i>',
      '<i class="fas fa-air-freshener"></i>',
      '<i class="fas fa-balance-scale"></i>',
      '<i class="fas fa-balance-scale"></i>',
      '<i class="fas fa-baseball-ball"></i>',
      '<i class="fas fa-baseball-ball"></i>',
      '<i class="far fa-arrow-alt-circle-up"></i>',
      '<i class="far fa-arrow-alt-circle-up"></i>',
      '<i class="fas fa-battery-three-quarters"></i>',
      '<i class="fas fa-battery-three-quarters"></i>'
    ];

    return icons.slice(0, boardSize);
  }

  cardsFactory () {
    const list = document.createElement('ul');

    for (let i = 0; i < this.shuffledCards.length; i++) {
      const li = document.createElement('li');
      li.innerHTML = this.shuffledCards[i];
      li.classList.add('card');
      list.appendChild(li);
    }
    return list;
  }
}

class Game {
  constructor () {
    this.interval = 0;
    this.board = new Board();
    this.clicks = 0;
    this.timer = document.getElementById('timer');
    this.timer.innerHTML = '0 mins : 0 sec';
  }

  start () {
    this.displayCards();
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('card')) {
        this.clicks++;
        if (this.clicks === 1) {
          this.startTimer();
        }
        this.fireMatcher(event.target);
      }
    }.bind(this), false);
  }

  startTimer () {
    let minute = 0;
    let second = 1;

    this.interval = setInterval(function () {
      this.timer.innerHTML = minute + ' mins ' + ' : ' + second + ' sec';
      second++;
      if (second === 60) {
        minute++;
        second = 0;
      }

    }, 1000);
  }

  fireMatcher (card) {
    if (this.isClicked(card)) {
      return;
    }

    this.displaySymbol(card);
    this.board.markedOpened(card, this.interval, this.clicks);
  }

  getTimer () {
    return $('#timer').text();
  }

  isClicked (card) {
    const show = $(card).hasClass('show');
    const open = $(card).hasClass('open');

    return show || open ? true : false;
  }

  displaySymbol (card) {
    $(card).addClass('show open');
  }

  displayCards () {
    const list = this.board.cardsFactory();

    document.getElementsByClassName('board')[0].innerHTML = list.innerHTML;
  }
}

const game = new Game();
game.start();
