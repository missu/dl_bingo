import * as pug from "pug"; 
// const compiledFunction = pug.compileFile('template.pug');
// compiledFunction({name: 'Timothy'})
// or 
//pug.renderFile('template.pug', {name: 'Timothy'})


export default function (){
    
    var stage = document.getElementById("bingo-stage");
    var start_event = new Event("start");
    
    function bingo_caller() {
        let number_board = document.getElementById("numbers-board");
        let called_number = document.getElementById("called-number");
        
    }
    
    function reset_caller_board() {
        var number_board = document.getElementById("numbers-board");
        var number_board_children = number_board.childNodes;

        for (let i = 0; i < number_board_children.length; i++) {
            if (number_board_children[i].nodeType === Node.ELEMENT_NODE) {
                number_board_children[i].classList.remove("called");  
            }
        }
    }
    
    return {
        "render" : function() {
            // render template
            let template = pug.renderFile('callerTable.pug');
            
            // turn string into DOM nodes
            let parser = new DOMParser();
            let caller_table_DOM = parser.parseFromString(template, "text/html");
            caller_table_DOM = caller_table_DOM.body.firstChild;
            
            // add events
            let start_button = caller_table_DOM.getElementById("start-button");

            start_button.addEventListener("click", this.start_game, false);
            start_button.addEventListener("touchend", this.start_game, false);
            
            // insert into DOM
            stage.insertAdjacentHTML("beforeend", caller_table_DOM);
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
            let start_button = document.getElementById("start-button");
            
            // remove event listeners
            start_button.removeEventListener("game_over", this.game_over, false);
            
            // re-enable start button
            start_button.removeAttribute("disabled");
            
            // add start button eventlisteners            
            start_button.addEventListener("click", this.restart_game, false);
            start_button.addEventListener("touchend", this.restart_game, false);
        },
        "restart_game" : function(event) {
            // clear the called numbers from the number board
            reset_caller_board();
            
            // Start Game
            this.start_game(event);
        }
    };
}