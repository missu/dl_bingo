import * as pug from "pug"; 
import {default as utils} from "../utils/utils.js";
// const compiledFunction = pug.compileFile('template.pug');
// compiledFunction({name: 'Timothy'})
// or 
//pug.renderFile('template.pug', {name: 'Timothy'})
//
//const compiled_modal = pug.compileFile('modal.pug');

const fs = require('fs');
const str_modal = fs.readFileSync('./v2/es6/src/templates/modal.pug', 'utf8');
const str_template = fs.readFileSync('./v2/es6/src/templates/callerTable.pug', 'utf8');
const compiled_modal = pug.compile(str_modal);
const compiled_template = pug.compile(str_template);

export default (function() {
    
    var stage = null;
    var start_event = new Event("start");
    var bingo_caller_interval_ID =  null;
    var called_numbers_arry =[0]; // zero is for the middle free cell

    function bingo_caller() {
        let number_board = document.getElementById("numbers-board");
        let called_number = document.getElementById("called-number");
        let curr_letter = "";
        let curr_number = null;
        
        bingo_caller_interval_ID = setInterval(function() {
            
            if (called_numbers_arry.length < 76) {
                // get a random number
                curr_number = utils.bingo_number(null, called_numbers_arry);
                
                // get letter based off of random number
                if ( curr_number <= 15 ) {
                    curr_letter = utils.letters[0];
                } else if(15 < curr_number && curr_number <= 30) {
                    curr_letter = utils.letters[1];
                } else if(30 < curr_number && curr_number <= 45) {
                    curr_letter = utils.letters[2];
                } else if(45 < curr_number && curr_number <= 60) {
                    curr_letter = utils.letters[3];
                } else if(60 < curr_number && curr_number <=75) {
                    curr_letter = utils.letters[4];
                }
                
                called_numbers_arry.push(curr_number);
                
                // udpate called number in number display
                called_number.value =  curr_letter + curr_number;
                
                // highlight called number on board
                number_board.querySelector("span[data-number='"+curr_number+"']").classList.add("called");
                
                // dispatch number called event
                document.querySelector(".bingo-card.computer button.call-bingo").dispatchEvent( new CustomEvent('number_called', { "detail" : curr_number, "bubbles" : true }) );
            }
            else{
                clearInterval(bingo_caller_interval_ID);   
            }
        }, 4000);
    }

    return {
        "render" : function() {
            stage = document.getElementById("bingo-stage");
            // render template
            let template = compiled_template();
            
            // turn string into DOM nodes
            let parser = new DOMParser();
            let caller_table_DOM = parser.parseFromString(template, "text/html");
            caller_table_DOM = caller_table_DOM.body.firstChild;
            
            // add events
            let start_button = caller_table_DOM.querySelector("#start-button");

            start_button.addEventListener("click", this.start_game, false);
            start_button.addEventListener("touchend", this.start_game, false);
            
            // insert into DOM
            stage.insertAdjacentElement("beforeend", caller_table_DOM);
        },
        "start_game" : function(event) {
            let start_button = event.target || event.srcElement;
            let called_number_dom = document.getElementById("called-number");
            
            // dispatch the start game event to #bingo-stage;
            stage.dispatchEvent(start_event);
            called_number_dom.value = "Starting ...";
            
            // disable start button
            start_button.setAttribute("disabled", "disabled");
            start_button.removeEventListener("click", this.start_game, false);
            start_button.removeEventListener("touchend", this.start_game, false);
            start_button.removeEventListener("click", this.restart_game, false);
            start_button.removeEventListener("touchend", this.restart_game, false);
            
            // start the bingo caller
            bingo_caller();
            
            // listen for game over event
            start_button.addEventListener("game_over", this.game_over, false);
        },
        "game_over" : function(event) {
            // CallerTable is bound to `this`
            let start_button = document.getElementById("start-button");
            let msg_dom = document.getElementById("message");
            
            // stop and reset the counter
            clearInterval(bingo_caller_interval_ID);
            called_numbers_arry = [0];
            
            // display message
            msg_dom.innerHTML = this.compiled_modal({player_type : event.detail.type});
            msg_dom.classList.remove("hide");
            msg_dom.classList.add("show");
            setTimeout(function() {
                msg_dom.classList.remove("show");
                msg_dom.classList.add("hide");
            }, 4000);

            // remove event listeners
            start_button.removeEventListener("game_over", this.game_over, false);
            
            // re-enable start button
            start_button.removeAttribute("disabled");
            
            // add start button eventlisteners            
            start_button.addEventListener("click", this.restart_game.bind(this), false);
            start_button.addEventListener("touchend", this.restart_game.bind(this), false);
        },
        "restart_game" : function(event) {
            // clear the called numbers from the number board
            let number_board = document.getElementById("numbers-board");

            number_board.childNodes.forEach( function(val, index, list) { 
                if (val.nodeType === Node.ELEMENT_NODE ) {
                    val.classList.remove("called");
                }
            });

            // Start Game
            this.start_game(event);
        },
        "get_called_numbers" : function() {
            return called_numbers_arry;
        },
        "check_bingo" : function(event) {
            // bingo card object is sent by event as event.detail
            // CallerTable is bound to `this`
            let bingo_card = event.detail;

            function horizontal(called_numbers, stamped_numbers) {
                for (let i = 1; i < 6; i++) {
                    if (stamped_numbers["B"+i][1] === true) {
                        
                        if (called_numbers.indexOf(stamped_numbers["B"+i][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers["I"+i][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers["N"+i][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers["G"+i][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers["O"+i][0].number) !== -1){
                            return true;
                        }
                    }
                    else {
                        continue;
                    }
                }
            }
            function vertical(called_numbers, stamped_numbers) {
                for (let i = 0; i < utils.letters.length; i++) {
                    if (stamped_numbers[utils.letters[i]+"1"][1] === true) {
                        
                        if (called_numbers.indexOf(stamped_numbers[utils.letters[i]+"1"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[i]+"2"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[i]+"3"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[i]+"4"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[i]+"5"][0].number) !== -1){
                            return true;
                        }
                    }
                    else {
                        continue;
                    }      
                }  
            }
            function diagonal(called_numbers, stamped_numbers) {
                if (stamped_numbers[utils.letters[0]+"1"][1] === true) {
                    if (called_numbers.indexOf(stamped_numbers[utils.letters[0]+"1"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[1]+"2"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[2]+"3"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[3]+"4"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[4]+"5"][0].number) !== -1){
                        return true;
                    }
                } else if(stamped_numbers[utils.letters[4]+"1"][1] === true){
                    if (called_numbers.indexOf(stamped_numbers[utils.letters[4]+"1"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[3]+"2"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[2]+"3"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[1]+"4"][0].number) !== -1 &&
                        called_numbers.indexOf(stamped_numbers[utils.letters[0]+"5"][0].number) !== -1){
                        return true;
                    }   
                }
                return false;
            }

            if (horizontal(this.get_called_numbers(), bingo_card.bingo_num_placement) ||
                vertical(this.get_called_numbers(), bingo_card.bingo_num_placement) ||
                diagonal(this.get_called_numbers(), bingo_card.bingo_num_placement) ) {
                this.game_over(event);
            }
            else {
                // event target should be the bingo button
                if (bingo_card.type !== "computer") {
                    event.target.classList.add("warning");
                }
            }
        },
        "compiled_modal" : compiled_modal
    };
})();