import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../environment/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    

    constructor(
        private http: HttpClient, private router: Router,

    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiDomain}/authenticate`, { username, password }, { withCredentials: true })
            .pipe(map(user => {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout(){
        sessionStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}