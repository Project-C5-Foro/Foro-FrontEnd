import { AbstractControl } from '@angular/forms';

export class ValidatorsPassword {

    static isPasswordValid(control: AbstractControl): any{
        const hasNumber = /\d/.test(control.value);
        const hasUpper = /[A-Z]/.test(control.value);
        const hasLower = /[a-z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower;
        if (!valid){
            return {password_invalid: true};
        }
        return null;
    }
}
