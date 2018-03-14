/*
 * JS for Digital Ladybug Bingo
 * @author      Ulina Small
 * @year        2018
 * @version     2, ES6
*/

'use strict';
import {default as callerTable} from "./views/callerTableView";
import {default as cardTable} from "./views/cardTableView";

(function() {
    
    var stage = null;
    
    function init() {
        stage = document.getElementById("bingo-stage");
        callerTable.render();
        cardTable.render();
        
        // listen for start game event on #bingo-stage
        stage.addEventListener("start", start_game, false);
        
        // listen for bingo event on #bingo-stage
        stage.addEventListener("bingo", callerTable.check_bingo.bind(callerTable), false);
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
        // disable buttons on bingo card?
        // cardTable.disable
    }

    document.addEventListener("DOMContentLoaded", init, false);
}());