import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FakeApiService } from '../fake-api.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  
  form!: FormGroup;
  user!: UserModel;
  length!: number;
  users!: any;
  editId!: number;
  showAddButton!: boolean;
  showUpdateButton!: boolean;
  searchKey!: string;

  constructor(
    private builder: FormBuilder,
    private api: FakeApiService
    ) { }

  ngOnInit(): void {
    
    this.length = this.getUserId();
    this.getUsers();
    this.form = this.builder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.api.searchInput.subscribe(
      (value: any)=>{
        this.searchKey = value;
      }
    );
  }
  
  get email(){
    return this.form.get('email');
  }
  get lastname(){
    return this.form.get('lastname');
  }
  get firstname(){
    return this.form.get('firstname');
  }
  get password(){
    return this.form.get('password');
  }

  postUserDetails(){
    this.user = {
      id: this.length+1,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.api.postUser(this.user).subscribe(
      res =>{
        alert("User added successfully");
        this.form.reset();
        document.getElementById("close")?.click();
        this.getUsers();
        return console.log(res);
      }
    );
    this.length++;
  }

  getUserId():number{
    const users_arr : any = this.api.getUsers().subscribe(
      res =>{
        return res;
      }
    );
    return users_arr.length;
  }

  getUsers(){
    this.api.getUsers().subscribe(
      res =>{
        this.users = res;
      }
    )
  }
  
  deleteUser(userId: number){
    this.api.deleteUser(userId).subscribe(
      res =>{
       alert("User deleted successfully");
       this.getUsers();
      }
    )
  }
  onEdit(user: any){
    this.form.controls['firstname'].setValue(user.firstname);
    this.form.controls['lastname'].setValue(user.lastname);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['password'].setValue(user.password);
    this.editId = user.id;
    this.showAddButton = false;
    this.showUpdateButton = true;
  }
  onAdd(){
    this.showAddButton = true;
    this.showUpdateButton = false;
    
  }
  updateUserDetails(){
    this.user = {
      id: this.editId,
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password
  };

  this.api.updateUser(this.user, this.user.id).subscribe(
    res =>{
      alert("User updated successfully");
      document.getElementById("close")?.click();
      this.form.reset();
      this.getUsers();
      return console.log(res);
      }
    )
  }
};
