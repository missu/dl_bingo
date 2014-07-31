/*jslint plusplus: true, white: true */

/*
-bingo card
-- bingo rows
--- bingo cell
-bingo random numbers 
-bingo caller

*/
'use strict';

var DL = DL || {};
DL.bingo = ( function($) {
    var letters = ['B', 'I', 'N', 'G', 'O'];

    /*
    	Function Object: Bingo_card
    	Parameter(s): none
		Description: creates a Bingo card
		Returns: a dom object
    */
	function Bingo_card() {
        this.card_numbers = [];
        var card = document.createElement("div"),
            i;
        
        card.className = "bingo-card";
        for(i = 0; i < 5; i++){
            card.appendChild(this.bingo_row());
        }

        return card;
    }

    /*
    	Method: bingo_row
    	Belongs to: Bingo_card
    	Parameter(s): none
		Description: creates a Bingo card
		Returns: a dom object
    */
	Bingo_card.prototype.bingo_row = function() {
		var bingo_obj = {},
			cell = null,
            i,
            row = document.createElement("div");

        function Bingo_cell(obj) {
            var cell = document.createElement("span");

            cell.className = "bingo-cell";
            cell.setAttribute('data-number', obj.letter+obj.num);
            cell.innerHTML = '<span class="bingo-letter">' + obj.letter + '</span>'
							+ '<span class="bingo-num">' + obj.num + '</span>'; 
            return cell;
        }
        
        row.className = "bingo_row";
		for(i = 0; i < letters.length; i++){
			bingo_obj.letter = letters[i];
			bingo_obj.num = bingo_numbers(letters[i],this.card_numbers);
			cell = new Bingo_cell(bingo_obj);
		}
        row.appendChild(cell);
        return row;
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
				bingo_num = randon_num(1,15);
				break;
			case "I": 
				bingo_num = randon_num(16,30);
				break;
			case "N":
				bingo_num = randon_num(31,45);
				break;
			case "G":
				bingo_num = randon_num(46,60);
				break;
			case "O":
				bingo_num = randon_num(61,75);
				break;
		}
			
		if(num_arry && num_arry.indexOf(bingo_num) !== -1){
			bingo_numbers(letter,num_arry);
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
        var number_board = documnet.getElementByID("number-board"),
        	called_number = document.getElementByID("called-number"),
        	bingo_balls = [],
        	class_list_arry = [],
            numbers_arry = [],
            curr_letter = "",
            curr_number = null,
            interval_ID = null,
            i;

        interval_ID = setInterval(function() {
            if(numbers_arry.length < 73){
                curr_letter = letters[random_num(1,5)];
                curr_number = bingo_numbers(curr_letter, numbers_arry);
                bingo_balls = number_board.childnodes;
                called_number.innerHTML(curr_letter + curr_number);
                for(i = 0; i < bingo_balls; i++){
                	class_list_arry = bingo_balls[i].classList.toString().split(" ");
                	if(class_list_arry[i] === curr_letter + curr_number){
                		class_list_arry.push("called");
                		class_list_arry = class_list_arry.toString();
                		bingo_balls[i].className = class_list_arry;
                	}

                }
            }
            else{
                 clearInterval(interval_ID);   
            }
        }, 4000);
    }
	 
	
}(jQuery));
