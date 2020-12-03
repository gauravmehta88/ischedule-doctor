import { Component, OnInit } from "@angular/core";

import { CookieService } from "../../landing/services/cookie.service";
import { Router } from "@angular/router";

declare var $;
declare var swal: any;

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
  providers: [CookieService]
})
export class TopBarComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() { }

  logout() {
    swal({
      title: "LOGOUT",
      text: "Are you sure want to logout?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Logout!"
    }).then(result => {
      console.log(result);
      if (result) {
        this.cookieService.removeCookies();
        this.router.navigate(["/"]);
      }
    });
  }
  toggleMenu() {
    $("body").toggleClass("ls-toggle-menu");
  }
}
