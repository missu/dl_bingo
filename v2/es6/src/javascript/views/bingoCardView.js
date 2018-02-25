import * as pug from "pug"; 
import * as Bingo_card from "../classes/BingoCard.js";

export default function (){
    const compiled_bingo_card = pug.compileFile('bingoCard.pug');
    const compiled_bingo_cell = pug.compileFile('bingoCell.pug');
    
    function create_rows(bingo_card, cell_template) {
        let rows = {};

        for(let i = 0; i < 5; i++) { 
            for(let j = 0; j < 5; j++) {
                rows['row_'+i] = rows['row_'+i] + cell_template(bingo_card['row_'+i][j]);
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
                game_card_btn[0].addEventListener("click", this.call_bingo, false);
            }
            else {
            // setup event for computer
                game_card_btn[0].addEventListener("new_num_called", this.call_bingo, false);
            }
            
            //return DOM to be inserted
            return game_card_DOM;
        },
        "toggle_cell" : function (e) {
            let e_target = e.target || e.srcElement;
            
            // todo: double check if this is necessary 
            if(e_target.className === "bingo-cell" || e_target.className === "bingo-num"  ){
                if(e_target.className === "bingo-cell"){
                    e_target.classList.add("clicked");
                }
                else if(e_target.className === "bingo-num"){
                    if(e_target.parentNode.classList.length < 2){
                        e_target.parentNode.classList.add("clicked");
                    }
                    else{
                        e_target.parentNode.classList.remove("clicked");
                    }   
                }
            }
            else if (e_target.className.indexOf("clicked") !== -1){
                e_target.classList.remove("clicked");
            }
        },
        "call_bingo" :function (arry) {
            arry;
        }
    };
}