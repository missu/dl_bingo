import * as pug from "pug";
import {default as bingoCardView} from "./bingoCardView.js";
const fs = require('fs');
const str_card_table = fs.readFileSync('./v2/es6/src/templates/cardTable.pug', 'utf8');
const compiled_card_table = pug.compile(str_card_table);

export default (function () {
    var stage = null;
    var table = null;
    
    function getBingoCard(opponent) {
        if (opponent === "computer") {
            return bingoCardView.render(opponent);
        } 
        else {
            return bingoCardView.render();
        }
    }
    
    function setup_table(opponent) {
        table = document.getElementById("card-table");
        table.insertAdjacentHTML("beforeend", getBingoCard());
        table.insertAdjacentHTML("beforeend", getBingoCard(opponent));
    }
    
    return {
        "render" : function (state) {
            const opponent = "computer";
            stage = document.getElementById("bingo-stage"); 

            if (state === "start") {
                setup_table(opponent);
            } 
            else {
                stage.insertAdjacentHTML("beforeend", compiled_card_table() );
            }
        }
    };
})();