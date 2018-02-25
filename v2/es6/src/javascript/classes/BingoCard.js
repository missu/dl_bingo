export class BingoCard {
    constructor(type) {
        this.type = type ? type : "player";
        this.card_numbers = [];
        
        return this.create_card(type);
    }
    
    /*
    	Parameter(s): string
		Description: creates the bingo card object used to create the card view
		Returns: an object
    */
    static create_card(type) {
        let letters = ['B', 'I', 'N', 'G', 'O'];
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
                num = this.bingo_numbers(letters[i], this.card_numbers);
                row[i] = this.create_bingo_cell(letters[i], num, position);
            }
        }
        
        return row;
    }
    
    /*
    	Parameter(s): string, number, number
		Description: gcreates the bingo cell object
		Returns: a object
    */
    static create_bingo_cell(letter, num, position) {
        let cell = {};

        cell.letter = letter;
        cell.number = num;
        cell.position = position; 

        return cell;
    }
    
    /*
    	Parameter(s): number, number
		Description: get a random number from a specific range
		Returns: a number
    */
    static random_number(min, max) {
        return Math.floor(Math.random() * (max-min) + min);
    }
    
    /*
    	Parameter(s): string, array
		Description: creates a Bingo number
		Returns: a number
    */
    static bingo_numbers(letter, num_arry) {
        /* 	B 1-15
            I 16-30
            N 31-45
            G 46-60
            O 61-75
        */
        let bingo_num = "";

        switch(letter) {
            case "B":
                bingo_num = this.randon_num(1,16);
                break;
            case "I": 
                bingo_num = this.randon_num(16,31);
                break;
            case "N":
                bingo_num = this.randon_num(31,46);
                break;
            case "G":
                bingo_num = this.randon_num(46,61);
                break;
            case "O":
                bingo_num = this.randon_num(61,76);
                break;
        }

        if (num_arry && num_arry.indexOf(bingo_num) !== -1) {
            return this.bingo_numbers(letter,num_arry); 
        }
        else {
            
            //num_arry.push(bingo_num);
            this.card_numbers.push(bingo_num);
            return bingo_num;
        } 		
    }
  
    /* 
        Parameter(s)
        Description: checks to see if the user has a bingo
        Returns: boolean
    */
    check_bingo() {
        // compare called numbers to saved numbers
        // check which number are the same
        // then check their positions to see if it is bingo
    }
    
    stamp_numbers() {
        // mark which number the user has stamped on their card
    }
    unstamp_number() {
        // removed numbers the user has un-stamped.
    }
}

