import {Inject, Component, OnInit} from 'angular2/core'
import {ComponentInstruction, CanActivate, Router,  AuxRoute, RouteConfig, RouteParams, ROUTER_DIRECTIVES, OnActivate, RouterOutlet} from 'angular2/router'

import {CICardView, CICard, CICardService} from '../card'
import {CIConfService} from '../conf'
import {CILoginService} from '../login'
import {MDL} from '../mdl'

import * as CIUtil from '../util'

@Component({
  templateUrl: 'view/conf/academic-list.html',
  directives: [CICard, ROUTER_DIRECTIVES]
})

class CIConfAcademicList extends CICardView {
  results: any[];

  constructor(_card: CICardService, private _conf: CIConfService) {
    super(_card);
    this.results = [];
  }
}

@Component({
  templateUrl: 'view/conf/academic.html',
  directives: [CICard, MDL, ROUTER_DIRECTIVES]
})

class CIConfAcademic extends CICardView {

  form: any;
  data: any;
  userId: number;

  constructor(_card: CICardService, private _conf: CIConfService, params: RouteParams) {
    super(_card);
    this.form = [];
    this.userId = +params.get('uid');
  }

  routerOnActivate() {
    this._conf.getForm('academic', (form) => {
      this.form = form;
    });

    this._conf.getFormResult('academic', this.userId, (data) => {
      this.data = data;
    });

    return super.routerOnActivate();
  }
}

@Component({
  templateUrl: 'view/conf/index.html',
  directives: [CICard, MDL, ROUTER_DIRECTIVES]
})

class CIConfHome extends CICardView {

  confData: any;
  confStatus: string;
  confGroup: any;
  confMembers: any;
  confRoles: any;

  userId: number;

  constructor(_card: CICardService, private _conf: CIConfService, private _login: CILoginService) {
    super(_card);
    this.userId = _login.getUser()._id;
  }

  routerOnActivate() {
    this.confData = this._conf.getConf();
    this.confStatus = this._conf.getStatus();
    this.confMembers = this._conf.getMemberMap();
    this.confGroup = this._conf.getGroup();
    this.confRoles = this._conf.getRoleMap();

    console.log(this.confRoles);
    this.confData.members.sort((e: any) => e.role );
    Object.keys(this.confMembers).forEach((e: any) => {
      this.confMembers[e].gravatar = CIUtil.generateGravatar(this.confMembers[e].email);
    });

    return super.routerOnActivate();
  }
}

@Component({
  templateUrl: 'view/conf/form.html',
  directives: [CICard, MDL]
})

class CIConfForm extends CICardView {

  formType: any;
  data: any;
  formName: any;

  constructor(_card: CICardService, private _conf: CIConfService, params: RouteParams) {
    super(_card);
    this.formType = params.get('type');
    this.data = [];

    if(this.formType == 'academic') this.formName = "学术团队申请";
    else if(this.formType == 'participant') this.formName = "代表报名";
    else this.formName = this.formType;
  }

  routerOnActivate() {
    this._conf.getForm(this.formType,(res) => {
      this.data = res;
    });

    return super.routerOnActivate();
  }

  pushField() {
    this.data.push({
      type: "input"
    });

    console.log(this.data);
  }

  deleteField(i: number) {
    this.data.splice(i,i+1);
  }
}

@Component({
  template: '<router-outlet></router-outlet>',
  directives: [RouterOutlet],
})

@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: CIConfHome,
    useAsDefault: true
  }, {
    path: '/academic/list',
    name: 'AcademicList',
    component: CIConfAcademicList
  }, {
    path: '/academic/:uid',
    name: 'Academic',
    component: CIConfAcademic
  }, {
    path: '/settings/form/:type',
    name: 'Form',
    component: CIConfForm
  }
])

export class CIConf {

  confId: number;

  constructor(routeParams: RouteParams, private _confService: CIConfService, @Inject(Router) private _router: Router) {
    this.confId = +routeParams.get('id');
  }

  routerOnActivate(next: ComponentInstruction) {
    var outer = this;
    console.log(next);

    return new Promise<void>((resolve, reject) => {
      outer._confService.getData(outer.confId, (data) => {
        console.log(data);
        outer._confService.registerConf(data);
        resolve();
      });
    });
  }
}

