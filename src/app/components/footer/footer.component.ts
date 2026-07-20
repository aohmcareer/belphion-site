import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer *ngIf="showFooter" class="footer">
      <div class="container text-center">
        <p class="footer-text">belphion &copy; All rights reserved</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #be3b52;
      padding: 30px 20px;
      text-align: center;
    }
    .footer-text {
      color: #ffffff;
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin: 0;
    }
  `]
})
export class FooterComponent {
  showFooter: boolean = true;

  constructor(private router: Router) {
    // Determine visibility based on initial URL
    this.showFooter = this.router.url !== '/' && this.router.url !== '/home';

    // Monitor future navigations
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showFooter = event.urlAfterRedirects !== '/' && event.urlAfterRedirects !== '/home';
    });
  }
}
