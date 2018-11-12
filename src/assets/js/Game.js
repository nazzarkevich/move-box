/* global $ */
import Board from './Board';

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
    this.board.markedOpened(card, this.interval);
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

export default Game;
