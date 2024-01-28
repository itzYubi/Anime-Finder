import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RecommendationForm, RecommendationFormResponse } from '../../models/formModel';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
    private apiURl = "http://localhost:8081/anime/recommendation"

    constructor(private http: HttpClient) { }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    postAnimeRecommendation(submitForm: RecommendationForm): Observable<HttpResponse<RecommendationForm>> {
        return this.http.post<RecommendationForm>(this.apiURl, submitForm, httpOptions);
    }

}
