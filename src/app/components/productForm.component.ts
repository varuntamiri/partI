import {
    Component, Output, EventEmitter, ViewEncapsulation,
    Inject, SkipSelf
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";
import { VALUE_SERVICE } from "../common/valueDisplay.directive";

@Component({
    selector: "paProductForm",
    templateUrl: "productForm.component.html",
    // styleUrls: ["productForm.component.css"],
    // encapsulation: ViewEncapsulation.Emulated
    viewProviders: [{ provide: VALUE_SERVICE, useValue: "Oranges" }]
})
export class ProductFormComponent {

    newProduct: Product = new Product();

    formSubmitted: boolean = false;

    constructor(private model: Model,
        @Inject(VALUE_SERVICE) @SkipSelf() private serviceValue: string) {
        console.log("Service Value: " + serviceValue);
    }

    // @Output("paNewProduct")
    // newProductEvent = new EventEmitter<Product>();

    submitForm(form: any) {

        this.formSubmitted = true;

        if (form.valid) {
            // this.newProductEvent.emit(this.newProduct);
            this.model.saveProduct(this.newProduct);
            this.newProduct = new Product();
            form.reset();
            this.formSubmitted = false;
        }

    }

    getValidationMessages(state: any, thingName?: string) {
        let thing: string = state.path || thingName;
        let messages: string[] = [];
        if (state.errors) {
            for (let errorName in state.errors) {
                switch (errorName) {
                    case "required":
                        messages.push(`You must enter a ${thing}`);
                        break;
                    case "minlength":
                        messages.push(`A ${thing} must be at least
    ${state.errors['minlength'].requiredLength}
    characters`);
                        break;
                    case "pattern":
                        messages.push(`The ${thing} contains
    illegal characters`);
                        break;
                }
            }
        }
        return messages;
    }

    getFormValidationMessages(form: NgForm): string[] {

        let messages: string[] = [];

        Object.keys(form.controls).forEach(k => {
            this.getValidationMessages(form.controls[k], k)
                .forEach(m => messages.push(m));
        }
        );

        return messages;

    }


}
