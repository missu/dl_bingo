import * as pug from "pug";
import * as bingoCardView from "./bingoCardView.js";

export default function () {
    var table = document.getElementById("card-table");
    
    function getBingoCard(opponent) {
        if (opponent === "computer") {
            return bingoCardView.render(opponent);
        } 
        else {
            return bingoCardView.render();
        }
    }
    
    function setup_table(opponent) {
        table.insertAdjacentHTML("beforeend", getBingoCard());
        table.insertAdjacentHTML("beforeend", getBingoCard(opponent));
    }
    
    return {
        "render" : function (state) {
            const opponent = "computer";
            
            if (state === "start") {
                setup_table(opponent);
            } 
            else {
                table.innerHTML = pug.renderFile('cardTable.pug');
            }
        }
    };
}