import {Component} from 'angular2/core'
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, Router} from 'angular2/router'
import {CICard} from './card'
import {CIDataNotif} from './data'
import {MDL} from './mdl'

import {CIDashboard} from './dashboard'
import {CILogin, CILoginService} from './login'

@Component({
  selector: 'ci-frame',
  templateUrl: 'tmpl/frame.html',
  directives: [CICard, MDL, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, CILoginService]
})

@RouteConfig([
  {
    path:'/dashboard',
    name: 'Dashboard',
    component: CIDashboard
  }, {
    path: '/login',
    name: 'Login',
    component: CILogin
  }
])

export class CIFrame {
  notif: CIDataNotif[];
  user: Object;

  constructor(private _loginService: CILoginService,
              private _router: Router) {

    this.notif = new Array();
    this.user = null;

    var outer = this;

    _loginService.addListener({
      onLogin(user) {
        console.log("Login");
        outer.user = user;
        outer._router.navigate(['Dashboard']);
      },

      onLogout() {
        console.log("Logout");
      }
    });
  }
}
