/*jslint browser: true plusplus: true, white: true */
/*global DL */


/*
-bingo card
-- bingo rows
--- bingo cell
-bingo random numbers 
-bingo caller

*/
'use strict';

var DL = DL || {};
DL.bingo = ( function() {
    var letters = ['B', 'I', 'N', 'G', 'O'];

    /*
    	Function Object: Bingo_card
    	Parameter(s): none
		Description: creates a Bingo card
		Returns: a dom object
    */
	function Bingo_card() {
        this.card_numbers = [];
    }

    Bingo_card.prototype.create_card = function(class_name) {

        var card = document.createElement("div"),
            i,
            header = document.createElement("header");
        header.className = "card-header";
        header.innerHTML =  '<span class="bingo-cell-title">B</span><span class="bingo-cell-title">I</span><span class="bingo-cell-title">N</span>'
                            + '<span class="bingo-cell-title">G</span><span class="bingo-cell-title">O</span>';
        
        card.className = "bingo-card";
        if(class_name) card.classList.add(class_name);
        card.appendChild(header);
        for(i = 0; i < 5; i++){
            card.appendChild(this.bingo_row());
        }

        return card;

    };

    /*
    	Method: bingo_row
    	Belongs to: Bingo_card
    	Parameter(s): none
		Description: creates a Bingo card
		Returns: a dom object
    */
	Bingo_card.prototype.bingo_row = function() {
		var bingo_obj = {},
			cell_dom = null,
            i,
            row = document.createElement("div");

        function Bingo_cell(obj) {
            var cell = document.createElement("span");

            cell.className = "bingo-cell";
            cell.setAttribute('data-number', obj.letter+obj.num);
            cell.innerHTML = '<span class="bingo-num">' + obj.num + '</span>'; 
            return cell;
        }
        
        row.className = "bingo-row";
		for(i = 0; i < letters.length; i++){
			bingo_obj.letter = letters[i];
			bingo_obj.num = bingo_numbers(letters[i],this.card_numbers);
			cell_dom = new Bingo_cell(bingo_obj);
            row.appendChild(cell_dom);
		}
        
        return row;
	};

    /*
        Method: toggle_cell
        Belongs to: Bingo_card
        Parameter(s): event
        Description: toggle the styling of the bingo cell
        Returns: none
    */
    Bingo_card.prototype.toggle_cell = function(e) {
        var e_target = e.target || e.srcElement;
        console.log(e);
        console.log("type of attributes");
        console.log(typeof e_target.attributes);

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
    };

    /*
        Method: call_bingo
        Belongs to: Bingo_card
        Parameter(s): event
        Description: checks to see if the user has a bingo
        Returns: none
    */
    Bingo_card.prototype.call_bingo = function(e) {
        var e_target = e.target || e.srcElement,
            e_parent = e_target.parentNode,
            click_cells = [];
        
        console.log(e);

        /*
        - first check which row is filled
        - check if the numbers in filled row have been called
        - if yes, return true, else return false
        */

        click_cells = e_parent.getElementsByClassname("clicked");

        for(i=0; i < click_cells.length; i++ ){

        }

        // forward diaganol check

        // backwards diaganol check

        // top to bottom check

        // left to right check

        
        
    };

	/*
    	Function: random_num
    	Parameter(s): number, number
		Description: get a random number from a user specified range
		Returns: a number
    */
    function randon_num(min,max) {
        return Math.floor(Math.random() * (max-min) + min);
    }
    
    /*
    	Function: bingo_number
    	Parameter(s): string, array
		Description: creates a Bingo number
		Returns: a number
    */
	function bingo_numbers(letter, num_arry) {
		/* 	B 1-15
			I 16-30
			N 31-45
			G 46-60
			O 61-75
		*/
		var bingo_num = "";
			
		switch (letter){
			case "B":
				bingo_num = randon_num(1,16);
				break;
			case "I": 
				bingo_num = randon_num(16,31);
				break;
			case "N":
				bingo_num = randon_num(31,46);
				break;
			case "G":
				bingo_num = randon_num(46,61);
				break;
			case "O":
				bingo_num = randon_num(61,76);
				break;
		}
			
		if(num_arry && num_arry.indexOf(bingo_num) !== -1){
			return bingo_numbers(letter,num_arry); 
		}
		else{
			num_arry.push(bingo_num);
			return bingo_num;
		} 		
	}
	
	/*
		Function: bingo_caller
		Parameter(s): none
		Description: Update the bingo board of called numbers
		Returns: none
	*/
	function bingo_caller() {
        var number_board = document.getElementById("numbers-board"),
        	called_number = document.getElementById("called-number"),
        	bingo_balls = [],
        	class_list_arry = [],
            numbers_arry = [],
            number_board_children = [],
            curr_letter = "",
            curr_number = null,
            interval_ID = null,
            i,
            j;

        interval_ID = setInterval(function() {
            if(numbers_arry.length < 75){
                curr_letter = letters[randon_num(0,5)];
                curr_number = bingo_numbers(curr_letter, numbers_arry);
                number_board_children = number_board.childNodes;
                // called_number.innerHTML = curr_letter + curr_number;
                called_number.value =  curr_letter + curr_number;
                console.log("inside bingo caller"); console.log(curr_letter + curr_number);
                for(i = 0, j=0; i < number_board_children.length; i++){
                    if(number_board_children[i].nodeType === Node.ELEMENT_NODE){
                        bingo_balls[j] = number_board_children[i];
                        j++;
                    }

                }

                for(i = 0; i < bingo_balls.length; i++){
                	class_list_arry = bingo_balls[i].classList.toString().split(" ");
                    for(j = 0; j < class_list_arry.length; j++){
                        if(class_list_arry[j] === (curr_letter + curr_number)){
                            bingo_balls[i].classList.add("called");
                        }  
                    }
                }
            }
            else{
                 clearInterval(interval_ID);   
            }
        }, 4000);
    }

    /*
        Function: start_game
        Parameter(s): event
        Description: runs all the functions to start the game. Invoked by an event.
        Returns: none
    */
    function start_game(event) {
        event.stopPropagation();
        var game_card = new Bingo_card(),
            game_card_dom = game_card.create_card(),
            card_table = document.getElementById("card-table");
 
        game_card_dom.addEventListener("click", game_card.toggle_cell, false); 
        card_table.appendChild(game_card_dom);
       

        
        bingo_caller();
    }

    /*
        Function: init
        Parameter(s): none
        Description: This is the function that is called on dom ready to initialize the game.
        Returns: none
    */
    function init() {
        var start_button = document.getElementById("start-button");

        start_button.addEventListener("click", start_game, false);
        start_button.addEventListener("touchend", start_game, false);

    }
	 
	document.addEventListener("DOMContentLoaded", init, false);
}());
