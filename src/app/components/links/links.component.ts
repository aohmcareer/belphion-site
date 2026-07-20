import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

interface LinkCard {
  label: string;
  url: string;
  isExternal: boolean;
  bgImage: string;
}

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, RouterLink, TriangleBorderComponent],
  template: `
    <div class="links-page">
      <!-- Cover Section -->
      <section class="cover-section subpage-cover" style="background-image: url('images/Banner_NoLogo.jpg');">
        <div class="cover-filter"></div>
        <div class="cover-content">
          <img src="images/belphion_LOGO-01.png" alt="belphion logo" class="cover-logo" />
        </div>
      </section>

      <!-- Link Directory Cards (with background gradient) -->
      <section class="gallery-section">
        <!-- Ocean Teal Triangle Border Below Cover (positioned absolutely at the top of the gallery section, overlapping the cover) -->
        <app-triangle-border [color]="'#1c8083'"></app-triangle-border>

        <div class="container">
          <div class="links-container">
            <ng-container *ngFor="let card of linkCards">
              <!-- External Link Card -->
              <a 
                *ngIf="card.isExternal"
                [href]="card.url" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="link-card"
              >
                <div class="card-bg" [style.background-image]="'url(images/' + card.bgImage + ')'"></div>
                <div class="card-overlay"></div>
                <span class="card-label">{{ card.label }}</span>
              </a>

              <!-- Internal Router Link Card -->
              <a 
                *ngIf="!card.isExternal"
                [routerLink]="card.url" 
                class="link-card"
              >
                <div class="card-bg" [style.background-image]="'url(images/' + card.bgImage + ')'"></div>
                <div class="card-overlay"></div>
                <span class="card-label">{{ card.label }}</span>
              </a>
            </ng-container>
          </div>
        </div>
      </section>

      <!-- Coral Triangle Border Above Footer -->
      <app-triangle-border [color]="'#be3b52'"></app-triangle-border>
    </div>
  `,
  styles: [`
    .links-page {
      width: 100%;
      position: relative;
    }

    .gallery-section {
      position: relative;
      background-image: linear-gradient(0turn, rgba(121, 84, 143, 1) 0%, rgba(28, 128, 131, 1) 100%);
      padding: 135px 0 150px;
    }

    .links-container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0 10px;
    }

    .link-card {
      position: relative;
      height: 120px;
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease;
    }

    .link-card:hover {
      transform: scale(1.02);
      border-color: rgba(255, 255, 255, 0.15);
      opacity: 1;
    }

    .card-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      filter: saturate(0.85);
      transition: transform 0.5s ease;
    }

    .link-card:hover .card-bg {
      transform: scale(1.04);
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.65);
      transition: background-color 0.3s ease;
      z-index: 1;
    }

    .link-card:hover .card-overlay {
      background-color: rgba(0, 0, 0, 0.4);
    }

    .card-label {
      position: relative;
      z-index: 2;
      color: #ffffff;
      font-size: 1.3rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
      .gallery-section {
        padding: 65px 0 80px;
      }
    }

    @media (max-width: 600px) {
      .link-card {
        height: 100px;
      }
      .card-label {
        font-size: 1.1rem;
      }
    }
  `]
})
export class LinksComponent {
  linkCards: LinkCard[] = [
    {
      label: 'Bluesky',
      url: 'https://belphion.bsky.social/',
      isExternal: true,
      bgImage: 'Bluesky.jpg'
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/belphion/',
      isExternal: true,
      bgImage: 'Instagram.jpg'
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@belphion',
      isExternal: true,
      bgImage: 'YouTube.jpg'
    },
    {
      label: 'Merch Store',
      url: 'https://belphion.square.site/',
      isExternal: true,
      bgImage: 'merch_Artboard_8.png'
    },
    {
      label: 'Tarot Form',
      url: 'https://belphion.com/tarotform',
      isExternal: true,
      bgImage: 'TarotForm.jpg'
    },
    {
      label: 'Vectober',
      url: '/vectober',
      isExternal: false,
      bgImage: 'Vectober.jpg'
    }
  ];
}
