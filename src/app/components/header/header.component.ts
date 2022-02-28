import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faCocktail = faPhone;
  user : any = []
  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.user = this.authenticationService.userValue
    console.log(this.user)
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"])
  }
}
