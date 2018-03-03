/*
 * JS for Digital Ladybug Bingo
 * @author      Ulina Small
 * @year        2018
 * @version     2, ES6
*/

'use strict';
import * as callerTable from "views/callerTableView";
import * as cardTable from "views/cardTableView";

(function() {
    
    var stage = document.getElementById("bingo-stage");
    
    function init() {
        callerTable.render();
        cardTable.render();
        
        // listen for start game event on #bingo-stage
        stage.addEventListener("start", start_game, false);
        
        // listen for bingo event on #bingo-stage
        stage.addEventListener("bingo", callerTable.check_bingo, false);
    }
    
    function start_game(event) {
        // removed start game event listener
        stage.removeEventListener("start", start_game, false);
        
        // add game over event listener
        stage.addEventListener("game_over", game_over, false);
        
        // send start state to card table to setup cards
        cardTable.render("start");
    }
    
    function game_over(event) {
        
    }

    document.addEventListener("DOMContentLoaded", init, false);
}());