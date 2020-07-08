import { AuthService } from 'src/app/seguranca/auth.service';
import { NavComponent } from './../nav/nav.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {HeaderService} from "./header.service";
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  opened = false;

  constructor(private headerService: HeaderService, private changeDetectorRef: ChangeDetectorRef, public authService: AuthService,
    private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  get title(): string {
      return this.headerService.headerData.title;
  }

  get icon(): string {
    return this.headerService.headerData.icon;
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl;
  }

  log(state): void {
    console.log(state);
  }

  abrirNavbar(): void {
    console.log("aqui");
  }
}
