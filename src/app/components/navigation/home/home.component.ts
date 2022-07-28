import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../authGuard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authGuard: AuthGuard) { }

  ngOnInit(): void {
  }

  isUserAuthenticated() {
    return this.authGuard.isUserAuthenticated();
  }
}
