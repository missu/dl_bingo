export default (function() {
    return {
        bingo_number: function(letter, num_arry) {
            /* 	B 1-15
                I 16-30
                N 31-45
                G 46-60
                O 61-75
            */
            let bingo_num = "";

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
            else {
                return bingo_num;
            } 		
        },
        letters: ['B', 'I', 'N', 'G', 'O'],
        random_number: function(min, max) {
            return Math.floor(Math.random() * (max-min) + min);
        }
    };
})();