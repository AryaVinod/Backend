interface CalcInterface{
    add(a: number, b:number):number,
    subtract(a: number, b:number):number,
    divide(a: number, b:number):number,
    multiply(a: number, b:number):number,
    modulus(a: number, b:number):number
}

export class Calculator implements CalcInterface{
    add(a: number, b:number):number{
        return a+b;
    }

    subtract(a: number, b:number):number{
        return a-b;
    }

    divide(a: number, b:number):number{
        if(b==0){
            console.log("Zero Division Error");
        }
        else{
            return a/b;
        }
    }

    multiply(a: number, b:number):number{
        return a*b;
    }

    modulus(a: number, b:number):number{
        return a%b;
    }
}