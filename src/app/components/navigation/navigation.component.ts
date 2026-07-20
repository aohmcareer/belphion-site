import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav-bar">
      <div class="nav-container">
        <!-- Logo -->
        <a routerLink="/" class="nav-brand" (click)="closeMenu()">
          <img src="images/belphion_TINYLOGO-01.png" alt="belphion logo" class="nav-brand-logo" />
        </a>

        <!-- Burger Toggle (Mobile Only) -->
        <button 
          class="burger" 
          [class.open]="isMenuOpen" 
          (click)="toggleMenu()" 
          aria-label="Toggle navigation"
          [attr.aria-expanded]="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Menu Links -->
        <div class="nav-links" [class.show]="isMenuOpen">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Home</a>
          <a routerLink="/design" routerLinkActive="active" (click)="closeMenu()">Design</a>
          <a routerLink="/photo" routerLinkActive="active" (click)="closeMenu()">Photo</a>
          <a routerLink="/motion" routerLinkActive="active" (click)="closeMenu()">Motion</a>
          <a routerLink="/vectober" routerLinkActive="active" (click)="closeMenu()">Vectober</a>
          <a routerLink="/links" routerLinkActive="active" (click)="closeMenu()">Links</a>
          <a href="https://belphion.square.site/" target="_blank" rel="noopener noreferrer">Merch</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 85px;
      background-color: rgba(95, 60, 120, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 1000;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      transition: background-color 0.3s ease;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 25px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .nav-brand-logo {
      height: 70px;
      width: auto;
      transition: transform 0.3s ease;
    }

    .nav-brand:hover .nav-brand-logo {
      transform: scale(1.05);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .nav-links a {
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.7);
      padding: 5px 0;
      border-bottom: 2px solid transparent;
      transition: color 0.25s ease, border-bottom-color 0.25s ease, opacity 0.25s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #ffffff;
      opacity: 1;
    }

    .nav-links a.active {
      border-bottom-color: #ffffff;
    }

    /* Burger Button Styles */
    .burger {
      display: none;
      background: transparent;
      border: none;
      cursor: pointer;
      width: 30px;
      height: 24px;
      position: relative;
      z-index: 1001;
    }

    .burger span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      position: absolute;
      left: 0;
      transition: transform 0.3s ease, opacity 0.3s ease, top 0.3s ease;
    }

    .burger span:nth-child(1) { top: 0px; }
    .burger span:nth-child(2) { top: 10px; }
    .burger span:nth-child(3) { top: 20px; }

    .burger.open span:nth-child(1) {
      transform: rotate(45deg);
      top: 10px;
    }
    .burger.open span:nth-child(2) {
      opacity: 0;
    }
    .burger.open span:nth-child(3) {
      transform: rotate(-45deg);
      top: 10px;
    }

    /* Mobile Responsive Navigation */
    @media (max-width: 768px) {
      .burger {
        display: block;
      }

      .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 70%;
        max-width: 300px;
        height: 100vh;
        background-color: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 35px;
        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 1px solid rgba(255, 255, 255, 0.05);
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
      }

      .nav-links.show {
        right: 0;
      }

      .nav-links a {
        font-size: 1.15rem;
        color: rgba(255, 255, 255, 0.65);
      }
    }
  `]
})
export class NavigationComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
