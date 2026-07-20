import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

type PhotoTab = 'weddings' | 'events' | 'portraits' | 'cosplay' | 'products' | 'misc';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule, TriangleBorderComponent],
  template: `
    <div class="photo-page">
      <!-- Cover Section -->
      <section class="cover-section subpage-cover" style="background-image: url('images/Banner_NoLogo.jpg');">
        <div class="cover-filter"></div>
        <div class="cover-content">
          <img src="images/belphion_LOGO-01.png" alt="belphion logo" class="cover-logo" />
        </div>
      </section>

      <!-- Solid Ocean Teal Tabs Section -->
      <section class="tabs-section">
        <!-- Ocean Teal Triangle Border (positioned absolutely at the top of the tabs section, overlapping the cover section) -->
        <app-triangle-border [color]="'#1c8083'"></app-triangle-border>

        <div class="container">
          <!-- Filter Tabs -->
          <div class="tabs-container">
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'weddings'" 
              (click)="setActiveTab('weddings')"
            >
              Weddings
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'events'" 
              (click)="setActiveTab('events')"
            >
              Live Events
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'portraits'" 
              (click)="setActiveTab('portraits')"
            >
              Portraits
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'cosplay'" 
              (click)="setActiveTab('cosplay')"
            >
              Cosplay
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'products'" 
              (click)="setActiveTab('products')"
            >
              Products
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'misc'" 
              (click)="setActiveTab('misc')"
            >
              Misc
            </button>
          </div>
        </div>
      </section>

      <!-- Gallery Grid Section (with background gradient) -->
      <section class="gallery-section">
        <div class="container">
          <!-- Weddings Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'weddings'">
            <div 
              class="gallery-item" 
              *ngFor="let img of weddingsImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Wedding photography" loading="lazy" />
            </div>
          </div>

          <!-- Live Events Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'events'">
            <div 
              class="gallery-item" 
              *ngFor="let img of eventsImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Live event photography" loading="lazy" />
            </div>
          </div>

          <!-- Portraits Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'portraits'">
            <div 
              class="gallery-item" 
              *ngFor="let img of portraitsImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Portrait photography" loading="lazy" />
            </div>
          </div>

          <!-- Cosplay Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'cosplay'">
            <div 
              class="gallery-item" 
              *ngFor="let img of cosplayImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Cosplay photography" loading="lazy" />
            </div>
          </div>

          <!-- Products Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'products'">
            <div 
              class="gallery-item" 
              *ngFor="let img of productsImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Product photography" loading="lazy" />
            </div>
          </div>

          <!-- Misc Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'misc'">
            <div 
              class="gallery-item" 
              *ngFor="let img of miscImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Photography work" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- Coral Triangle Border Above Footer -->
      <app-triangle-border [color]="'#be3b52'"></app-triangle-border>

      <!-- Lightbox Zoom Modal (Advanced Photo Viewer) -->
      <div 
        class="lightbox-overlay" 
        *ngIf="zoomIndex !== null" 
        (click)="closeLightbox()"
      >
        <!-- Prev Button -->
        <button class="lightbox-arrow lightbox-arrow-left" (click)="prevImage($event)" aria-label="Previous image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close lightbox">&times;</button>
          <img [src]="'images/' + getActiveImages()[zoomIndex]" alt="Zoomed view" class="lightbox-img" />
          <div class="lightbox-counter">{{ zoomIndex + 1 }} of {{ getActiveImages().length }}</div>
        </div>

        <!-- Next Button -->
        <button class="lightbox-arrow lightbox-arrow-right" (click)="nextImage($event)" aria-label="Next image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .photo-page {
      width: 100%;
      position: relative;
    }

    .tabs-section {
      background-color: #1c8083; /* Ocean Teal for WCAG AA compliance with white text */
      padding: 25px 0 45px;
      position: relative;
      z-index: 10;
    }

    .tabs-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 15px;
      margin: 0;
    }

    .tab-button {
      background: transparent;
      color: rgba(255, 255, 255, 0.7);
      border: none;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 700;
      padding: 10px 20px;
      cursor: pointer;
      transition: color 0.2s ease, border-bottom-color 0.2s ease;
      border-bottom: 3px solid transparent;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tab-button:hover {
      color: #ffffff;
    }

    .tab-button.active {
      color: #ffffff;
      border-bottom-color: #ffffff;
    }

    .gallery-section {
      position: relative;
      background-image: linear-gradient(0turn, rgba(121, 84, 143, 1) 0%, rgba(28, 128, 131, 1) 100%);
      padding: 60px 0 135px;
    }

    /* Lightbox Zoom Modal Styles */
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      animation: fadeIn 0.25s ease-out;
    }

    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .lightbox-img {
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
      animation: zoomIn 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .lightbox-close {
      position: absolute;
      top: -55px;
      right: 0;
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 2.5rem;
      cursor: pointer;
      line-height: 1;
      padding: 5px;
      transition: color 0.2s ease;
    }

    .lightbox-close:hover {
      color: #ffffff;
    }

    .lightbox-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
      z-index: 2010;
      user-select: none;
      padding: 0;
    }

    .lightbox-arrow svg {
      width: 28px;
      height: 28px;
    }

    .lightbox-arrow:hover {
      background: rgba(0, 0, 0, 0.8);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.4);
    }

    .lightbox-arrow-left {
      left: 40px;
    }

    .lightbox-arrow-right {
      right: 40px;
    }

    .lightbox-counter {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    @media (max-width: 900px) {
      .lightbox-arrow-left {
        left: 15px;
      }
      .lightbox-arrow-right {
        right: 15px;
      }
      .lightbox-arrow {
        background: rgba(0, 0, 0, 0.6);
        width: 48px;
        height: 48px;
      }
      .lightbox-arrow svg {
        width: 22px;
        height: 22px;
        stroke-width: 2;
      }
      .lightbox-close {
        top: -45px;
        right: 5px;
        font-size: 2rem;
      }
      .lightbox-content {
        max-width: 95%;
      }
    }

    @media (max-width: 768px) {
      .tabs-section {
        padding: 15px 0 30px; /* Increased bottom padding to avoid triangle overlap on mobile */
      }
      .tab-button {
        font-size: 0.85rem;
        padding: 8px 12px;
      }
      .gallery-section {
        padding: 40px 0 80px;
      }
    }
  `]
})
export class PhotoComponent {
  activeTab: PhotoTab = 'weddings';
  zoomIndex: number | null = null;

  weddingsImages: string[] = [
    "BY5A0919.jpg",
    "BY5A0906.jpg",
    "BY5A0717.jpg",
    "BY5A0852.jpg",
    "BY5A0385.jpg",
    "DSCF1963.jpg",
    "tild3631-3732-4930-a263-643864343565_DSCF1615.JPG",
    "DSCF1917.jpg",
    "DSCF6909-Edit.jpg",
    "JenBoquette.jpg",
    "DSCF5379-Edit.jpg",
    "IMG_8668.jpg"
  ];

  eventsImages: string[] = [
    "DSCF7687.jpg",
    "DSCF5686_1.jpg",
    "DSCF5718.jpg",
    "DSCF8256.jpg",
    "DSCF7838.jpg",
    "DSCF7947.jpg",
    "DSCF7991.jpg",
    "DSCF6252.jpg"
  ];

  portraitsImages: string[] = [
    "Floral_Serious.jpg",
    "Chaos_Checkerblock.jpg",
    "OverheadShoulder.jpg",
    "DSCF5612.jpg",
    "DSCF5555-Edit.jpg",
    "DSCF5558-Edit.jpg",
    "HeadshotBanner.jpg",
    "DSCF4733-Edit.jpg",
    "DSCF4845-Edit.jpg",
    "DSCF4836-Edit.jpg",
    "DSCF4668-Edit_CropAl.jpg",
    "DSCF4824-Edit.jpg",
    "DSCF4642-Edit.jpg",
    "DSCF4649-Edit.jpg",
    "DSCF4669-Edit_AltCro.jpg"
  ];

  cosplayImages: string[] = [
    "SkeeballChamp.jpg",
    "StrawberryKiwiHacker.jpg",
    "IMG_0124.jpg",
    "IMG_9605.jpg",
    "IMG_9839.jpg",
    "Rogue_Orange.jpg",
    "GetInTheBall.JPG",
    "IMG_9920.jpg",
    "Rogue_Gray.jpg",
    "IMG_0004.JPG"
  ];

  productsImages: string[] = [
    "BY5A2281-Edit.jpg",
    "RedHeartEye-Straight.jpg",
    "BY5A2286-Edit.jpg",
    "VivFairy.jpg",
    "tild6562-6565-4632-b065-306430393431_Card_Faces_Square_4x.jpg",
    "DSCF0241.jpg",
    "PurpleHeartEye-Strai.jpg",
    "DSCF0392.jpg",
    "DSCF0276.jpg",
    "RedHeartEyeViv.jpg",
    "DSCF0302.jpg",
    "PurpleHeartEyeViv.jpg",
    "tild3262-6231-4433-b438-343561383964_DSCF1615.JPG",
    "tild3265-6566-4664-b139-623161653236_BadAssReinhardt.jpg"
  ];

  miscImages: string[] = [
    "DahBoi.jpg",
    "DSCF0287.JPG",
    "DSCF2198-Enhanced-NR.jpg",
    "DSCF6421.jpg",
    "Lonely.jpg",
    "Neon_Jiro.jpg",
    "Watching.jpg"
  ];

  setActiveTab(tab: PhotoTab) {
    this.activeTab = tab;
    this.closeLightbox();
  }

  getActiveImages(): string[] {
    switch (this.activeTab) {
      case 'weddings': return this.weddingsImages;
      case 'events': return this.eventsImages;
      case 'portraits': return this.portraitsImages;
      case 'cosplay': return this.cosplayImages;
      case 'products': return this.productsImages;
      case 'misc': return this.miscImages;
      default: return [];
    }
  }

  openLightbox(index: number) {
    this.zoomIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.zoomIndex = null;
    document.body.style.overflow = '';
  }

  prevImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const imgs = this.getActiveImages();
    if (this.zoomIndex === null || imgs.length === 0) return;
    this.zoomIndex = (this.zoomIndex - 1 + imgs.length) % imgs.length;
  }

  nextImage(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const imgs = this.getActiveImages();
    if (this.zoomIndex === null || imgs.length === 0) return;
    this.zoomIndex = (this.zoomIndex + 1) % imgs.length;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.zoomIndex !== null) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.prevImage();
      } else if (event.key === 'Escape') {
        this.closeLightbox();
      }
    }
  }
}
