import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeApiService } from '../fake-api.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user!: UserModel;

  constructor(
    private fakeApiService: FakeApiService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.fakeApiService.getUserById(userId)
    .subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
  }

}
