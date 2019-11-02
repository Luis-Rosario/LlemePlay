import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';



declare const getGamesLending: any;
declare const getGamesBorrowing: any;
declare const getLendingMessages: any;
declare const getBorrowingMessages: any;


@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  @ViewChild('select', null) select: ElementRef;

  showBorrowed: any = true;

  lendingGamesInfo: Map<String, any> = new Map();
  lendingGames: String[] = [];

  borrowingGamesInfo: Map<String, any> = new Map();
  borrowingGames: String[] = [];

  messages: any;
  chatMessages: any;
  game: any;

  user: any;

  constructor(
    private sessionQuery: SessionQuery,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.user = this.sessionQuery.getValue().email;
    this.getLendingGames();
    this.getBorrowingGames();
   
  }

  changeSelect() {
    this.showBorrowed = this.select.nativeElement.value
    console.log(this.showBorrowed)
  }


  getLendingGames() {
    let game;
    let myGamesJSON = getGamesLending(this.user);
    let index = 0;
    let keys = Object.keys(myGamesJSON);


    for (game of keys) {
      this.lendingGames[index] = game;
      this.lendingGamesInfo.set(game, myGamesJSON[game])

      index++;
    }
  }

  getBorrowingGames() {
    let game;
    let myBorrowedGamesJSON = getGamesBorrowing(this.user);
    let index = 0;
    let keys = Object.keys(myBorrowedGamesJSON);


    for (game of keys) {
      this.borrowingGames[index] = game;
      this.borrowingGamesInfo.set(game, myBorrowedGamesJSON[game])

      index++;
    }

    /*   console.log(this.borrowingGames)
  
      console.log(this.lendingGames) */
  }


  selectGame(game) {
    
    if (this.showBorrowed === 'true') {
      this.messages = getBorrowingMessages(this.user, game)
      /* console.log(this.messages) */
      this.game = this.borrowingGamesInfo.get(game)
    }

    else {
      this.messages = getLendingMessages(this.user, game)
    /*   console.log(this.messages) */
      this.game = this.lendingGamesInfo.get(game)
    }

  }

  handleSelectedRequest(chat){
    this.chatMessages = chat;
  }
}
