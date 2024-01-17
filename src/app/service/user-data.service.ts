import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../type/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://dummyjson.com/users';

  // get user dummy data from API
  getUserData(): Observable<User> {
    return this.http.get<User>(this.apiUrl).pipe(
      tap((data) => {
        console.log('Dummy Data API Called:-', data);
        return data;
      })
    );
  }
}
