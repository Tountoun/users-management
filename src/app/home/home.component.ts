import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeApiService } from '../fake-api.service';
import { UserModel } from '../models/user.model';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allUsers!: UserModel[];
  searchKey!: string;

  constructor(
    private builder: FormBuilder,
    private api: FakeApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      users => {
        this.allUsers = users
      }
    )
    this.api.searchInput.subscribe(
      (value: any) => {
        this.searchKey = value;
      }
    )
  }
  onOpen(id: any){
    this.router.navigateByUrl(`users/${id}/details`);
  }
}
