import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualvalidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualvalidatorDirective implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {
        const password = control.get('password')
        const confirmPassword = control.get('confPassword');
        if (confirmPassword && password && password.value !== confirmPassword.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}