class MathUtil{
    static average(number1: number, number2: number){
        return this.sum(number1,number2)/2;
    }

    static sum(number1: number, number2:number){
        return (number1+number2);
    }
}

export default MathUtil;