import * as pug from "pug"; 
import {BingoCard as Bingo_card} from "../classes/BingoCard.js";

const fs = require('fs');
const str_bingo_card = fs.readFileSync('./v2/es6/src/templates/bingoCard.pug', 'utf8');
const str_bingo_cell = fs.readFileSync('./v2/es6/src/templates/bingoCell.pug', 'utf8');
const compiled_bingo_card = pug.compile(str_bingo_card);
const compiled_bingo_cell = pug.compile(str_bingo_cell);

export default (function () {
    function create_rows(bingo_card, cell_template) {
        let rows = {};

        for(let i = 1; i < 6; i++) { 
            for(let j = 0; j < 5; j++) {
                if (j === 0 ) {
                    rows['row_'+i] = cell_template(bingo_card.rows['row_'+i][j]);
                }
                else {
                    rows['row_'+i] = rows['row_'+i] + cell_template(bingo_card.rows['row_'+i][j]);
                }
            }
        }
        return rows;
    }
    
    return {
        "render" : function (opponent) {
            // create card
            let bingo_card = new Bingo_card(opponent);
            let rows = create_rows(bingo_card, compiled_bingo_cell);
            let game_card = compiled_bingo_card(Object.assign({"computer": opponent}, rows));
            var game_card_DOM;
            let game_card_footer;
            let game_card_btn;
            
            // turn string into DOM nodes
            let parser = new DOMParser();
            game_card_DOM = parser.parseFromString(game_card, "text/html");
            game_card_DOM = game_card_DOM.body.firstChild;
            game_card_footer = game_card_DOM.getElementsByClassName("card-footer");
            game_card_btn = game_card_footer[0].getElementsByClassName("call-bingo");
            
            // set up events for player
            if(!opponent) {
                game_card_DOM.addEventListener("click", this.toggle_cell, false);
                game_card_btn[0].addEventListener("click", this.call_bingo.bind(bingo_card), false);
                game_card_btn[0].addEventListener("animationend", function(e){
                    e.currentTarget.classList.remove("warning");
                }, false);
            }
            else {
            // setup event for computer
                game_card_btn[0].addEventListener("new_num_called", this.call_bingo.bind(bingo_card), false);
            }
            
            //return DOM to be inserted
            return game_card_DOM;
        },
        "toggle_cell" : function (event) {
            let event_target = event.target || event.srcElement;
            
            if (event_target.classList.contains("bingo-cell")) {
                event_target.classList.toggle("clicked");
            } 
            else if (event_target.className === "bingo-num"){
                event_target.parentNode.classList.toggle("clicked");
            } 
        },
        "call_bingo" :function (event) {
            // bingo_card is bound to method. `this` will refer to bingo_card

            let count = 0;
            for (const [key, value] of Object.entries(this.bingo_num_placement)) {
                if (value[1] === true) {
                    count++;
                }
            }

            if (count > 5) {
                event.currentTarget.dispatchEvent( new CustomEvent('bingo', { "detail" : this, "bubbles" : true }) );
            }
            else {
                event.currentTarget.classList.add("warning");
            } 
        }
    };
})();