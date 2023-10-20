import { Component, OnInit } from '@angular/core';
import { FakeApiService } from '../fake-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  searchInput!: any;

  constructor(
    private fakeApiService: FakeApiService
  ) { }

  ngOnInit(): void {
  }
  search(event: any){
    this.searchInput = (event.target as HTMLInputElement).value;
    console.log(this.searchInput);
    this.fakeApiService.searchInput.next(this.searchInput);
  }
}
