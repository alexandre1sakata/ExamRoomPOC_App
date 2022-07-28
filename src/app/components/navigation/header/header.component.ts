import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../authGuard';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authGuard: AuthGuard
    ) { }

  ngOnInit(): void {
  }

  isUserAuthenticated() {
    return this.authGuard.isUserAuthenticated();
  }

  logOut() {
    swal.fire({
      title: 'Do you want to logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("jwt-token");
        this.router.navigate(["login"]);
      }
    })
  }

}
