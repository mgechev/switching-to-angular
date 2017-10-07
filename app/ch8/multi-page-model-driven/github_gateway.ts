import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface GitHubUser {
  login: string;
  email: string;
  followers: number;
  name: string;
  id: number;
  avatar_url: string;
}

@Injectable()
export class GitHubGateway {
  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`https://api.github.com/users/${username}`);
  }
}
