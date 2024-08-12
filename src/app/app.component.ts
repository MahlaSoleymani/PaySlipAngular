import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './core/services/theming.service';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AccountingApp';
  themingSubscription: Subscription;


  constructor(
    private themingService: ThemingService,
     private overlayContainer: OverlayContainer) { }
     
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  @HostBinding('class') public cssClass: string;

  ngOnInit() {

    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.cssClass = theme;
      localStorage.setItem('theme', this.cssClass);
      this.applyThemeOnOverlays();

    });

  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  private applyThemeOnOverlays() {

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);

    }
    overlayContainerClasses.add(this.cssClass);
    // localStorage.setItem('theme', this.cssClass);

  }


}
