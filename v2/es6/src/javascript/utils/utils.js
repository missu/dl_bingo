export default (function() {
    return {
        bingo_number: function(letter, num_arry) {
            /* - If a letter is provided then a random number within that letter's 
                 range will be chosen.
               - If a letter is not provided, then a random number will be chosen 
	           B 1-15
               I 16-30
               N 31-45
               G 46-60
               O 61-75
            */
            let bingo_num = "";
            
            if (letter) {
                switch (letter){
                    case "B":
                        bingo_num = this.random_number(1,16);
                        break;
                    case "I": 
                        bingo_num = this.random_number(16,31);
                        break;
                    case "N":
                        bingo_num = this.random_number(31,46);
                        break;
                    case "G":
                        bingo_num = this.random_number(46,61);
                        break;
                    case "O":
                        bingo_num = this.random_number(61,76);
                        break;
                }

                if (num_arry && num_arry.indexOf(bingo_num) !== -1) {
                    return this.bingo_number(letter, num_arry); 
                }
            } 
            else {
                const max = 75;
                let number_pool = new Array(max);
                
                for (let i = 1; i <= max; i++){
                    number_pool[i-1] = i;  
                }
                
                // if numbers were provided, remove numbers that have already been called
                if (num_arry && num_arry.length !== 0) {
                    num_arry.forEach(function(element) {
                        number_pool.splice(number_pool.indexOf(element), 1);
                    });
                    bingo_num = this.random_number(0 , number_pool.length+1);
                    bingo_num = number_pool[bingo_num];
                } 
                else {
                    bingo_num = this.random_number(0 , max+1);
                }
            }
            return bingo_num;		
        },
        letters: ['B', 'I', 'N', 'G', 'O'],
        random_number: function(min, max) {
            return Math.floor(Math.random() * (max-min) + min);
        }
    };
})();