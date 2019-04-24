import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get Username(): string {
    return localStorage.getItem('username');
  }

  set Username(value: string) {
    localStorage.setItem('username', value);
  }
  constructor() { }
}
