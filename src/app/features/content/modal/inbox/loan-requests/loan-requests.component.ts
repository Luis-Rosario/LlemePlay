import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionQuery } from 'src/app/core/state/session.query';
import * as $ from 'jquery';

declare const getChat: any;

@Component({
  selector: 'loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.scss']
})
export class LoanRequestsComponent implements OnInit {
  @Input() messages: any;
  @Input() game: any;
  @Input() lender: any;
  @Output() selectedPerson = new EventEmitter();

  users: any[] = [];
  userRequestInfo: Map<String, any> = new Map();
  chatMessages: any;


  constructor(
    private sessionQuery: SessionQuery,
  ) { }

  ngOnInit() {
    console.log(this.game)
    this.getUsers();
    console.log(this.lender)
  }


  getUsers() {
    let index = 0;
    let keys = Object.keys(this.messages);
    let user;

    for (user of keys) {
      this.users[index] = user;
      this.userRequestInfo.set(user, this.messages[user])

      index++;
    }


  }

  selectRequest(userRequest, event) {

    $(".request-list .user").removeClass("active")
    var target = event.target.classList.contains("user") ? event.target : event.target.parentElement;
    target.classList.add("active")
    console.log(this.lender)

    if (this.lender)
      this.chatMessages = getChat(this.sessionQuery.getValue().email, userRequest, this.game.game_name)

    if (!this.lender)
      this.chatMessages = getChat(userRequest, this.sessionQuery.getValue().email, this.game.game_name)

    this.selectedPerson.emit(this.chatMessages)
  }

}
