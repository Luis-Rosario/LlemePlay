import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import * as $ from "jquery";
import * as bootstrap from "node_modules/bootstrap/js/dist/";
import { Router } from "@angular/router";
import { SessionQuery } from "src/app/core/state/session.query";

declare const getGameLenders;
declare const getDistanceByUser;
declare const pagesFunctions;
declare const createRentalProposal;
declare const getGameDescription: any;

@Component({
  selector: "game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent implements OnInit {
  @Input() gameName: String;
  @Input() gameInfo: any;
  @ViewChild("durationselect", null) durationSelect: ElementRef;
  @ViewChild("distanceselect", null) distanceSelect: ElementRef;

  lendersOfGame: any[] = [];
  loanDuration: any;
  maxDistance: any;
  gameDescription: any;

  constructor(private router: Router, private sessionQuery: SessionQuery) {}

  ngOnInit() {
    this.gameDescription = getGameDescription(this.gameName)
    this.filterLenders();
    pagesFunctions.gamecard();
    /*  console.log(this.gameInfo)
     console.log(this.loanDuration)
     console.log(this.maxDistance) */
  }

  modalClick(ev) {
    let msg = $(ev.target.parentElement.parentElement)
      .find("textarea")
      .val();
    let userEmail = $(ev.target).attr("data-user");
    createRentalProposal(
      userEmail,
      this.sessionQuery.getValue().email,
      this.gameInfo.game_name,
      this.loanDuration,
      msg
    );
    $(".modal").fadeOut();
  }

  openModal(ev) {
    if (
      !$(ev.target.parentElement.parentElement.parentElement).hasClass(
        "non-click"
      )
    ) {
      $(ev.target.parentElement.parentElement)
        .find(".game-page")
        .fadeToggle();
    } else {
      this.router.navigateByUrl("/user/library");
    }
  }

  openMessageModal(ev) {
    /*     $(".game-page").fadeOut(); */
    let gameCard = ev.target;
    let limit = 1;
    while ($(gameCard).hasClass("game-page") && limit++ < 20) {
      gameCard = ev.target.parentElement;
    }
    $(gameCard)
      .find(".message-page")
      .fadeToggle();
  }

  filterLenders() {
    this.loanDuration = Number(
      (<HTMLInputElement>this.durationSelect.nativeElement).value
    );
    this.maxDistance = Number(
      (<HTMLInputElement>this.distanceSelect.nativeElement).value
    );
    this.lendersOfGame = getGameLenders(
      this.gameName,
      this.sessionQuery.getValue().email,
      {
        distance: this.maxDistance,
        duration: this.loanDuration
      }
    );
  }

  closeModal(ev){
    $(".modal").fadeOut();
  }
}

/* FORMATO DE UM JOGO DO USER
active: true
category: (3) ["A", "B", "C"]
console: (2) ["PSP", "Switch"]
duration_range: (2) [3, 6]
game_name: "Smash"
image_url: "url.com/image"
user_email: "a@a.com"
year: 2019 */
