import MathUtil from "../utils/math.util";
import { when } from "jest-when";

describe("Test Average function", ()=>{
    // test("Test average pass", ()=> {
    //     expect(MathUtil.average(1,7)).toBe(4);
    // });

    test("Test average fail", ()=> {
        const mockedfn = jest.fn();
        MathUtil.sum = mockedfn;
        when(mockedfn).calledWith(1,6).mockReturnValueOnce(7)
        expect(MathUtil.average(1,6)).toBe(3.5);
        expect(mockedfn).toBeCalledTimes(1);
    });
});


