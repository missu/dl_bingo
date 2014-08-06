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
    var letters = ['B', 'I', 'N', 'G', 'O'],
        bingo_caller_interval_ID = null;

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
            j,
            card_row = null,
            header = document.createElement("header"),
            footer = document.createElement("footer");

        header.className = "card-header";
        header.innerHTML =  '<span class="bingo-cell-title">B</span><span class="bingo-cell-title">I</span><span class="bingo-cell-title">N</span>'
                            + '<span class="bingo-cell-title">G</span><span class="bingo-cell-title">O</span>';
        
        card.className = "bingo-card";
        if(class_name) {
            card.classList.add(class_name);
        }
        card.appendChild(header);
        for(i = 0; i < 5; i++){
            card_row = this.bingo_row();
            for(j = 0; j < card_row.childNodes.length; j++){
                card_row.childNodes[j].setAttribute("data-position", letters[j]+(i+1));
            }
            card.appendChild(card_row);
            
        }


        footer.className = "card-footer";
        footer.innerHTML = '<button class="call-bingo">Yell Bingo!</button>';
        card.appendChild(footer);

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
            cell.setAttribute('data-letter', obj.letter);
            cell.setAttribute('data-number', obj.num);
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
            e_card = e_target.parentNode.parentNode,
            i,
            j,
            k,
            m,
            n,
            click_cells = [],
            fwd_diagonal_cells = [],
            bkwd_diagonal_cells = [],
            b_col_cells = [],
            i_col_cells = [],
            n_col_cells = [],
            g_col_cells = [],
            o_col_cells = [],
            row_one_cells = [],
            row_two_cells = [],
            row_three_cells = [],
            row_four_cells = [],
            row_five_cells = [],
            has_bingo = false;

        function check_values(direction_arry, lgth, card_nums) {
            if(lgth === 4) {
                if(direction_arry.length === lgth && card_nums.indexOf(parseInt(direction_arry[0].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[1].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[2].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[3].dataset.number, 10)) !== -1) {
                    has_bingo = true;
                }
            }
            else{
                if(direction_arry.length === lgth && card_nums.indexOf(parseInt(direction_arry[0].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[1].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[2].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[3].dataset.number, 10)) !== -1 && card_nums.indexOf(parseInt(direction_arry[4].dataset.number, 10)) !== -1) {
                    has_bingo = true;
                }
            }
        }

        /*
        - first check which row is filled
        - check if the numbers in filled row have been called
        - if yes, return true, else return false
        */

        console.log(e);

        click_cells = e_card.getElementsByClassName("clicked");

        for(i = 0; i < click_cells.length; i++){

            if(click_cells[i].dataset.position === "B1"){
                fwd_diagonal_cells.push(click_cells[i]);
                row_one_cells.push(click_cells[i]);
                b_col_cells.push(click_cells[i]);

                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I2"){ 
                        fwd_diagonal_cells.push(click_cells[j]);

                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "G4"){
                                fwd_diagonal_cells.push(click_cells[k]);

                                for(m = 0; m < click_cells.length; m++){
                                    if(click_cells[m].dataset.position === "O5"){
                                        fwd_diagonal_cells.push(click_cells[m]);
                                    }
                                }
                            }
                        }
                    }
                    else if(click_cells[j].dataset.position === "I1"){
                        row_one_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "N1"){
                                row_one_cells.push(click_cells[k]);

                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "G1"){
                                        row_one_cells.push(click_cells[m]);

                                        for(n = 0; n < click_cells.length; n++){
                                            
                                            if(click_cells[n].dataset.position === "O1"){
                                                row_one_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(click_cells[j].dataset.position === "B2"){
                        b_col_cells.push(click_cells[j]);

                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "B3"){
                                b_col_cells.push(click_cells[k]);

                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "B4"){
                                        b_col_cells.push(click_cells[m]);

                                        for(n = 0; n < click_cells.length; n++){
                                            
                                            if(click_cells[n].dataset.position === "B5"){
                                                b_col_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if(click_cells[i].dataset.position === "I1"){
                // top to bottom check
                i_col_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I2"){

                        i_col_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "I3"){

                                i_col_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "I4"){

                                        i_col_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "I5"){
                                                i_col_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "N1"){ 
                // top to bottom check
                n_col_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "N2"){

                        n_col_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "N4"){

                                n_col_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "N5"){

                                        n_col_cells.push(click_cells[m]);
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "G1") {
                // top to bottom check
                g_col_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "G2"){

                        g_col_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "G3"){

                                g_col_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "G4"){

                                        g_col_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "G5"){
                                                g_col_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "O1"){
                // backwards diagonal check
                bkwd_diagonal_cells.push(click_cells[i]);
                // top to bottom check
                o_col_cells.push(click_cells[i]);

                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "G2"){
                        bkwd_diagonal_cells.push(click_cells[j]);

                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "I4"){
                                bkwd_diagonal_cells.push(click_cells[k]);

                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "B5"){
                                        bkwd_diagonal_cells.push(click_cells[m]);
                                    }
                                }
                            }
                        }
                    }
                    else if(click_cells[j].dataset.position === "O2"){

                        o_col_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "O3"){

                                o_col_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "O4"){

                                        o_col_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "O5"){
                                                o_col_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            //rows
            else if(click_cells[i].dataset.position === "B2"){
                // left to right check
                row_two_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I2"){

                        row_two_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "N2"){

                                row_two_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "G2"){

                                        row_two_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "O2"){
                                                row_two_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "B3"){
                // left to right check
                row_three_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I3"){

                        row_three_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "G3"){

                                row_three_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "O3"){

                                        row_three_cells.push(click_cells[m]);
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "B4"){
                // left to right check
                row_four_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I2"){

                        row_four_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "N4"){

                                row_four_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "G4"){

                                        row_four_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "O4"){
                                                row_four_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
            else if(click_cells[i].dataset.position === "B5"){
                // left to right check
                row_five_cells.push(click_cells[i]);
                for(j = 0; j < click_cells.length; j++){

                    if(click_cells[j].dataset.position === "I5"){

                        row_five_cells.push(click_cells[j]);
                        for(k = 0; k < click_cells.length; k++){

                            if(click_cells[k].dataset.position === "N5"){

                                row_five_cells.push(click_cells[k]);
                                for(m = 0; m < click_cells.length; m++){

                                    if(click_cells[m].dataset.position === "G5"){

                                        row_five_cells.push(click_cells[m]);
                                        for(n = 0; n < click_cells.length; n++){

                                            if(click_cells[n].dataset.position === "O5"){
                                                row_five_cells.push(click_cells[n]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 
                }
            }
        }

        check_values(fwd_diagonal_cells, 4, this.card_numbers);
        check_values(bkwd_diagonal_cells, 4, this.card_numbers);
        check_values(b_col_cells, 5, this.card_numbers);
        check_values(i_col_cells, 5, this.card_numbers);
        check_values(n_col_cells, 4, this.card_numbers);
        check_values(g_col_cells, 5, this.card_numbers);
        check_values(o_col_cells, 5, this.card_numbers);
        check_values(row_one_cells, 5, this.card_numbers);
        check_values(row_two_cells, 5, this.card_numbers);
        check_values(row_three_cells, 4, this.card_numbers);
        check_values(row_four_cells, 5, this.card_numbers);
        check_values(row_five_cells, 5, this.card_numbers);

        display_results(e, has_bingo);
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
			
		if(num_arry && num_arry.indexOf(bingo_num) !== -1) {
			return bingo_numbers(letter,num_arry); 
		}
		else {
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
            i,
            j;

        bingo_caller_interval_ID = setInterval(function() {
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
                 clearInterval(bingo_caller_interval_ID);   
            }
        }, 4000);
    }

    /*
        Function: display_ results
        Parameter(s): event obj, boolean
        Description: display a message on the screen
        Returns: none
    */
    function display_results(event, bool) {

        var msgs = { 
                no_bingo : "You do not have Bingo",
                user_wins: "Congratulations! You won!",
                computer_wins : "Sorry, You lose"
            },
            msg_dom = document.getElementById("message"),
            user = event.target.parentNode.parentNode;

        if(user.className === "bingo-card"){

            if(bool){
                msg_dom.innerHTML = '<span>' + msgs.user_wins + '</span>';
                msg_dom.classList.remove("hide");
                msg_dom.classList.add("show");
                clearInterval(bingo_caller_interval_ID);
                setTimeout(function() {
                    msg_dom.classList.remove("show");
                    msg_dom.classList.add("hide");
                }, 4000);

            }
            else{
                msg_dom.innerHTML = '<span>' + msgs.no_bingo + '</span>';
                msg_dom.classList.remove("hide");
                msg_dom.classList.add("show");
                setTimeout(function() {
                    msg_dom.classList.add("hide");
                    msg_dom.classList.remove("show");
                }, 1000);
            }    
        }
        else{
            //computer
        }
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
            card_table = document.getElementById("card-table"),
            call_bingo = game_card.call_bingo.bind(game_card);
 
        game_card_dom.addEventListener("click", game_card.toggle_cell, false);
        var footer = game_card_dom.getElementsByClassName("card-footer");
        var btn = footer[0].getElementsByClassName("call-bingo");
        btn[0].addEventListener("click", call_bingo, false); 
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
