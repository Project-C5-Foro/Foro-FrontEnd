import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatorsImg {

    static isImgValid( control: AbstractControl): ValidationErrors {
        const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i.test(control.value);
        const valid = allowedExtensions;
        if (!valid){
            return {image_invalid: true};
        }
        return null;
    }
}
