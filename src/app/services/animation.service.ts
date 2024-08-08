import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor(private http: HttpClient) {}

  getAnimationData() {
    return this.http.get('assets/images/animation-data.json');
  }
}