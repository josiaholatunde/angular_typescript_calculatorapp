import { Component } from "@angular/core";

@Component({
    selector: "calculator",
    templateUrl: "./calculator.component.html",
    styleUrls: ["./calculator.component.css"]
})


export class CalculatorComponent{
    result: string;
    clear: boolean;
    total: any[];
    counter: number;
    formerOperator: string;
    storeArray: any[];
    counter2: number;
    resultString: string;
    message:string;
    constantOperatorArray: any[];
    dotCounter : number;
    display: string;



    constructor(){
        //constructor function- function that runs when an instance of this
        //class is created- Initialised properties to be used later in the class
        this.result = "";
        this.total = [];
        this.counter2 = 0;
        this.resultString = '';
        this.constantOperatorArray = [];
        this.clear = false;
        this.counter = 0;
        this.dotCounter = 0;
        this.display = "0";

    }
    //method that is called when a  user enters a value into the screen
    //return type is void

    addToCalculate(value): void {
        //initialised a counter variable to see if a number or value is pressed before an operator
        //always set to zero whenever a value is pressed- is not zero if the operator is
        //changed consistently
        this.counter = 0;
        //clears the screen(result) when true
        if(this.clear == true){
            this.result = "";
            this.clear = false; // re-initialised after clearing screen
        }

        //clears the span element if there is any content
        if ( this.display == "0" || this.message)
        {
            this.display = "";
            this.resultString = "";
            this.message = "";

        }

        if (this.result.includes('.') && value == '.')

          this.result = this.result.substring(0,this.result.length);
       //concatenates the values of the string pressed on the screen
       else
          this.result += value;


    }

    //method that is called when an operator is pressed
    Calculate(operator): void{

        /*essence is to avoid clicking on diff operator more than once
        increments counter every time an operator is clicked */
        this.counter ++;
        if(this.result == "infinity"){
           this.display = "";
        }
        if(!this.result && this.counter == 1){
            this.result = '0';
        }

        /*checks if operator user pressed is equal to the former operator saved for
        the last operation and is true whenever the counter is 1 that is when a value
        is pressed before an operator*/
        if((operator != this.formerOperator && operator) || this.counter == 1){

                var presentOperator = operator;
                //checks if counter is 1 and if there is any result and pushes result to total array
                if(this.counter == 1){
                    this.total.push(this.result);

                    this.result='';

                }

                //for values of counter greater than 1-when operator is changed,
                //value of this.result is reinitialised to zero
                if(this.counter > 1){
                    // set number2 value of new resilt to zero if user enters multiple
                    //operators
                    this.total[1] = 0;
                }

                /*condition that saves the former operator when the operator is changed
                this is tracked with the aid of the counter property of this class
                reason is because former operator changes severally when you click multiple
                operators*/
                if(this.counter == 2)
                {
                    this.constantOperatorArray.push(this.formerOperator);
                }

                //checks if initial result string exists
                 if(this.resultString){

                    if(this.counter > 1 ){
                        var index = this.resultString.length-1;
                        //whenever multiple operator is pressed,slices last character pressed
                        //and concatenates with the new operator
                        this.resultString = this.resultString.substring(0,index) + presentOperator;
                         this.display = this.resultString;
                    }
                    // normal result cocatenates result string with the new value pressed and the operator
                    else{
                         this.display = `${this.resultString} ${this.total[1]} ${presentOperator}`;
                        this.resultString = `${this.resultString} ${this.total[1]} ${presentOperator}`;
                    }


                 }
                else{
                     //result string when the length of the total array is 2
                     if(this.total.length == 2){
                         if(this.counter > 1 ){
                             this.display= `${this.total[0]} ${presentOperator}`;
                            this.resultString = `${this.total[0]} ${presentOperator}`;

                        }
                         else{

                           this.display= `${this.total[0]} ${this.formerOperator} ${this.total[1]}  ${presentOperator}`;
                        }
                    }
                     //result string when the length of the total array is 1
                    else{

                       this.display = `${this.total[0]}  ${presentOperator}`;
                    }
                 }

                this.result = '';
                 //condition that checks if the length of the total array is 2 so that sum
                 //can be calculated
                if(this.total.length == 2)
                {
                    var number1 = Number(this.total[0]); //first one or sum depending
                    var number2 = Number(this.total[1]); //second value

                    //counter that initialises the result string the very first time the total
                    //sum is calculated
                    if (this.counter2 == 0 && !this.resultString){

                        this.resultString = String(number1 +  " "+ this.formerOperator + " " +number2 + " "+ operator);


                    }

                    //condition that  calls the method that calculates the sum when multiple operators are pressed
                    if(this.counter > 1)
                    {
                        var sum = this.EvaluateConstantOperator(number1, number2);
                    }
                    //normal condition that evaluates sum
                    else{
                        sum = this.EvaluateOperator(number1, number2);

                    }

                    if(sum === this.message){
                        this.display = this.message;
                        this.total = [];
                        this.counter2 = 0;
                        this.clear = true;
                    }
                    else{
                        //stringify sum and display because result is of string data type
                        this.result = String(sum);
                        

                        //re-initializing varables
                        this.total = [];
                        this.total.push(sum);
                        this.counter2++;
                        this.clear = true;
                        }
                    }
                else{
                    this.clear = false;
                }

                this.formerOperator = operator;
        }

    }
    //method that clears screen
    ClearScreen(): void{

         this.result = "";
         this.counter2 = 0;
         this.counter = 0;
         //this.formerOperator = '';
         this.resultString = '';
         this.total = [];
         this.display = String(0);
         this.clear = true;

    }

    EvaluateOperator(number1,number2): string{
        if(this.formerOperator == '+')
        {
            var sum = number1 + number2;
        }
        else if (this.formerOperator == '-')
        {
             sum = number1 - number2;
        }
        else if (this.formerOperator == '/')
        {
            if( number2 === 0){
                this.message = "Division by zero not allowed";
                return this.message;
            }
            else
              sum = number1 / number2;
        }
        else if (this.formerOperator == '*')
        {
            sum = number1 * number2;
        }
        return sum;
    }


    // Method that is evaluated when the operator is chanfged multiple times
    EvaluateConstantOperator(number1,number2): string{
        if(this.constantOperatorArray[0] == '+')
        {
            var sum = number1 + number2;
        }
        else if (this.constantOperatorArray[0] == '-')
        {
             sum = number1 - number2;
        }
        else if (this.constantOperatorArray[0] == '/')
        {
            if(number2 == 0){
                this.message = "Division by zero not allowed";
                return this.message;

            }
              sum = number1 / number2;
        }
        else if (this.constantOperatorArray[0] == '*')
        {
            sum = number1 * number2;
        }
        return sum;
    }
    //method that evaluates sum when equals to is pressed
    Evaluate(): void{
        if(this.result && this.total[0] ){
            var number1 = Number(this.total[0]);
            var number2 = Number(this.result);

            var sum = this.EvaluateOperator(number1, number2);
            this.total = [];
            this.result = String(sum);
            this.display = '';
            this.clear = true;
            this.resultString = '';
            this.counter2 = 0;


        } else{
            this.message = "Error...Try again with valid input";
            this.display = this.message;
            this.clear = true;
            this.resultString = '';
            this.counter2 = 0;
            this.total = [];
        }

            //clears screen


    }

}
