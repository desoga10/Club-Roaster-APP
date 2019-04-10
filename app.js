//Player Register Class

class Player {
  constructor(firstname, lastname, residence, position, country, jerseynumber) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.residence = residence;
    this.position = position;
    this.country = country;
    this.jerseynumber = jerseynumber;
  }
}

//User Interface Class
class Interface {
  static displayPlayers() {
    const RegisteredPlayers = Storage.getPlayers();

    const players = RegisteredPlayers;

    players.forEach(player => Interface.addPlayers(player));
  }

  static addPlayers(player) {
    const playerList = document.querySelector('#playerlist');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${player.firstname}</td>
    <td>${player.lastname}</td>
    <td>${player.residence}</td>
    <td>${player.position}</td>
    <td>${player.country}</td>
    <td>${player.jerseynumber}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    playerList.appendChild(row);
  }

  static deletePlayer(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFormField() {
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('residence').value = '';
    document.getElementById('position').value = '';
    document.getElementById('country').value = '';
    document.getElementById('jersey').value = '';
  }
}

//Handles the local storage in the UI
class Storage {
  static getPlayers() {
    let players;
    if (localStorage.getItem('players') === null) {
      players = [];
    } else {
      players = JSON.parse(localStorage.getItem('players'));
    }

    return players;
  }

  static addClubPlayer(player) {
    const players = Storage.getPlayers();
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  }

  static removeClubPlayer(jerseynumber) {
    const players = Storage.getPlayers();

    players.forEach((player, index) => {
      if (player.jerseynumber === jerseynumber) {
        players.splice(index, 1);
      }
    });

    localStorage.setItem('players', JSON.stringify(players));
  }
}

//Event to Display players

document.addEventListener('DOMContentLoaded', Interface.displayPlayers);

//Register A New Player

document.querySelector('#player-form').addEventListener('submit', e => {
  //Prevent Default Submission
  e.preventDefault();

  //Get The Values of The Form
  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const residence = document.querySelector('#residence').value;
  const position = document.querySelector('#position').value;
  const country = document.querySelector('#country').value;
  const jerseynumber = document.querySelector('#jersey').value;

  //Instantiate Player Register Class

  const player = new Player(
    firstname,
    lastname,
    residence,
    position,
    country,
    jerseynumber
  );

  //Register a New Player in User Interface
  Interface.addPlayers(player);
  //Add Player to storage
  Storage.addClubPlayer(player);

  //Clear Form Field
  Interface.clearFormField();
});

document.querySelector('#playerlist').addEventListener('click', e => {
  //Remove Player from UI
  Interface.deletePlayer(e.target);

  //Remove Player from storage
  Storage.removeClubPlayer(
    e.target.parentElement.previousElementSibling.textContent
  );
});
