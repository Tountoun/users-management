import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  
  constructor(private http: HttpClient) { }
  // Post or save a user
  public searchInput = new BehaviorSubject<String>('');
  
  postUser(data: UserModel):Observable<UserModel>{
    return this.http.post<UserModel>('http://localhost:3000/posts', data)
    .pipe(map(
      (result: UserModel)=>{
        console.log(result);
        return result;
      }
    ));
  }
  // Get all users
  getUsers():Observable<UserModel[]>{
    return this.http.get<UserModel[]>('http://localhost:3000/posts')
    .pipe(map(
      (result: UserModel[])=>{
        console.log(result);
        return result;
      }
    ));
  }
// Get a user by his id
  getUser(userId: number):Observable<UserModel>{
    return this.http.get<UserModel>('http://localhost:3000/posts')
    .pipe(map(
      (result: UserModel)=>{
        console.log(result);
        return result;
      }
    ));
  }
  // Update user 
  updateUser(data: UserModel, userId: number):Observable<UserModel>{
    return this.http.put<UserModel>('http://localhost:3000/posts/'+userId, data)
    .pipe(map(
      (result: UserModel)=>{
        console.log(result);
        return result;
      }
      )
    )
  }
  // Delete user by his id
  deleteUser(userId: number):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/posts/'+userId).pipe(
      map(
        (result: any)=>{
          console.log(result);
          return result;
        }
      )
    )
  }
  // Get user by his id
  getUserById(userId: number):Observable<UserModel>{
    return this.http.get<UserModel>('http://localhost:3000/posts/'+userId)
    .pipe(map(
      (result:any)=>{
        console.log(result);
        return result;
        }
      )
    )
  }

}
