import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { FormService } from '../../../services/FormService/form.service';
import { RecommendationForm } from '../../../models/formModel';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
    @ViewChild('reccForm') reccForm!: NgForm;

    name!: string ;
    email!: string;
    description!: string;
    genre!: string;

    constructor(private router: Router,
                private formService: FormService) {}

    onSubmit() {
        if (!this.name || this.name.trim().length === 0) {
            alert('Please add your name!');
            return;
        }
        if (!this.email || !this.formService.isValidEmail(this.email)) {
            alert('Please provide a valid email address!');
            return;
        }
        if (!this.description || this.description.trim().length < 10) {
            alert('Please provide a description on minimum length 10!');
            return;
        }

        const submitForm: RecommendationForm = {
            name: this.name,
            email: this.email,
            description: this.description,
            genre: this.genre
        };

        this.formService.postAnimeRecommendation(submitForm).subscribe(
            response => {
                console.log('Response:', response);
                console.log('Response Body:', response.body);
                if (response.status === 200) {
                    let responseForm: RecommendationForm | null = response.body ? response.body : null;
                    if(responseForm !== null) {
                        alert('We will send you an Anime Recommendation at: ' + responseForm.email + ' soon! :)');
                        let message = "We will send you an Anime Recommendation at: " + responseForm.email + " soon! :)";
                        this.reccForm.resetForm();
                        return;
                    }
                } else {
                    alert('Something went wrong! Please try again later');
                    this.reccForm.resetForm();
                    return;
                }
            },
        );

    }


}
