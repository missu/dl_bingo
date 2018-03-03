import * as utils from "../utils/utils.js";

export class BingoCard {
    constructor(type) {
        this.type = type ? type : "player";
        this.card_numbers = [];
        this.bingo_num_placement = {};
        
        return this.create_card(type);
    }
    
    /*
    	Parameter(s): string
		Description: creates the bingo card object used to create the card view
		Returns: an object
    */
    static create_card(type) {
        let letters = utils.letters;
        let bingo_card = {};
        
        bingo_card.type = type;
        for (let i = 0; i < 5; i++) {
            let position = i + 1;
            bingo_card['row_' + position] = this.create_bingo_row(letters, position);
        }
        return bingo_card;
    }
    
    /*
    	Parameter(s): array, number
		Description: creates the bingo row array
		Returns: an array
    */
    static create_bingo_row(letters, position) {
        let row = [];
        let num = 0;
        
        for (let i = 0; i < letters.length; i++) {
            if (position === 3 && letters[i] == "N") {
                num = "DL";
                row[i] = this.create_bingo_cell("", num, position);
            } else {
                num = this.get_bingo_number(letters[i], this.card_numbers);
                row[i] = this.create_bingo_cell(letters[i], num, position);
            }
            this.bingo_num_placement[letters[i]+position] = new Array(2);
            this.bingo_num_placement[letters[i]+position][0] = row[i];
            this.bingo_num_placement[letters[i]+position][1] = false;
        }
        
        return row;
    }
    
    /*
    	Parameter(s): string, number, number
		Description: gcreates the bingo cell object
		Returns: an object
    */
    static create_bingo_cell(letter, num, position) {
        let cell = {};

        cell.letter = letter;
        cell.number = num;
        cell.position = position; 

        return cell;
    }
    
    /*
    	Parameter(s): string, array
		Description: creates a Bingo number
		Returns: a number
    */
    static get_bingo_number(letter, num_arry) {
        let bingo_num = utils.bingo_number(utils.bingo_number(letter), num_arry);
        this.card_numbers.push(bingo_num);
        
        return bingo_num;	
    }
  
    /* 
        Parameter(s): string
        Description: marks a bingo cell as clicked 
        Returns: an object
    */
    stamp_numbers(position) {
        if(!position) {
           return;
        }
        this.bingo_num_placement[position][1] = true;
        return this.bingo_num_placement;
    }
    
    /* 
        Parameter(s): string
        Description: marks a bingo cell as not clicked 
        Returns: an object
    */
    unstamp_number(position) {
        if(!position) {
           return;
        }
        this.bingo_num_placement[position][1] = false;
        return this.bingo_num_placement;
    }
}

