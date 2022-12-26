import { IUserSession } from './../../../models/IUserSession';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  isMenuOpen = true;
  contentMargin = 240;
  currentYear = new Date().getFullYear().toString();
  user: IUserSession | null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.user = this.authService.loggedInUser;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
  }
  onToolBarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('On toolbar toggled', this.isMenuOpen);

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    }
    else {
      this.contentMargin = 240;
    }
  }
  signOut() {
    this.authService.signOut();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
