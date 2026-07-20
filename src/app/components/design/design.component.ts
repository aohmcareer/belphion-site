import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

type DesignTab = 'posters' | 'cards' | 'vectobers';

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [CommonModule, TriangleBorderComponent],
  template: `
    <div class="design-page">
      <!-- Cover Section -->
      <section class="cover-section subpage-cover" style="background-image: url('images/Banner_NoLogo.jpg');">
        <div class="cover-filter"></div>
        <div class="cover-content">
          <img src="images/belphion_LOGO-01.png" alt="belphion logo" class="cover-logo" />
        </div>
      </section>

      <!-- Solid Ocean Teal Tabs Section -->
      <section class="tabs-section">
        <!-- Cyan/Ocean Teal Triangle Border (positioned absolutely at the top of the tabs section, overlapping the cover section) -->
        <app-triangle-border [color]="'#1c8083'"></app-triangle-border>

        <div class="container">
          <div class="tabs-container">
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'posters'" 
              (click)="setActiveTab('posters')"
            >
              Posters, Merch, and More
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'cards'" 
              (click)="setActiveTab('cards')"
            >
              Cards
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeTab === 'vectobers'" 
              (click)="setActiveTab('vectobers')"
            >
              Favorite Vectobers
            </button>
          </div>
        </div>
      </section>

      <!-- Gallery Grid Section (with background gradient) -->
      <section class="gallery-section">
        <div class="container">
          <!-- Posters Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'posters'">
            <div 
              class="gallery-item" 
              *ngFor="let img of postersImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Design artwork" loading="lazy" />
            </div>
          </div>

          <!-- Cards Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'cards'">
            <div 
              class="gallery-item" 
              *ngFor="let img of cardsImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Card design" loading="lazy" />
            </div>
          </div>

          <!-- Favorite Vectobers Grid -->
          <div class="gallery-grid" *ngIf="activeTab === 'vectobers'">
            <div 
              class="gallery-item" 
              *ngFor="let img of vectobersImages; let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" alt="Vectober illustration" loading="lazy" />
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
    .design-page {
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
      gap: 20px;
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
      padding: 135px 0;
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
        padding: 60px 0;
      }
    }
  `]
})
export class DesignComponent {
  activeTab: DesignTab = 'posters';
  zoomIndex: number | null = null;

  postersImages: string[] = [
    "NoFace-V2Mobile.jpg",
    "Redd-Ready-01.jpg",
    "Knight_of_Quasars_Fu.jpg",
    "Knight_of_Quasars_Co.jpg",
    "RetroScotFX-Center.jpg",
    "DSCF0319.jpg",
    "DSCF0341.jpg",
    "DSCF0347.jpg",
    "Chatot_Papercraft.png",
    "FALSEGOD-02.png",
    "tild3634-3835-4663-b661-323533663132_KickstarterAddons.jpg",
    "PokemonBG.png",
    "ShadowglassShirt_V2.jpg",
    "tild3433-6662-4537-a564-623731353339_Dreamscape.jpg",
    "Vespiquen-01.jpg",
    "FIGHT_HIM_Grass.jpg",
    "reindeerTX.jpg",
    "Sam_Magic_FX.jpg"
  ];

  cardsImages: string[] = [
    "MewTwo_Restricted_Ne.png",
    "tild3533-3239-4033-b334-643438346466_Card_Faces_Square_4x.jpg",
    "Darkness-PKMN-ENRG.jpg",
    "Fighting-PKMN-ENRG.jpg",
    "Fire-PKMN-ENRG.jpg",
    "Grass-PKMN-ENRG.jpg",
    "Lightning-PKMN-ENRG.jpg",
    "Metal-PKMN-ENRG.jpg",
    "Psychic-PKMN-ENRG.jpg",
    "Water-PKMN-ENRG.jpg",
    "Worlds_Adrift_-_Path.jpg",
    "Worlds_Adrift_-_Rite.jpg",
    "Worlds_Adrift_-_Ento.jpg",
    "Worlds_Adrift_-_Elec.jpg",
    "Worlds_Adrift_-_Expl.jpg",
    "Worlds_Adrift_-_Sol_.jpg",
    "tild3231-3537-4937-a461-626261366233_Worlds_Adrift__Full_.jpg",
    "tild6130-3633-4534-b861-303262366236_Worlds_Adrift__Full_.jpg",
    "tild3535-6631-4334-b237-643930363038_Worlds_Adrift__Full_.jpg",
    "tild3661-3432-4235-a239-366435306337_Worlds_Adrift__Full_.jpg",
    "tild6237-6632-4631-a234-316263376335_Worlds_Adrift__Full_.jpg",
    "tild3232-6566-4165-a536-313666623864_Worlds_Adrift__Full_.jpg"
  ];

  vectobersImages: string[] = [
    "Sam_Magic_FX.jpg",
    "tild3539-3033-4463-b933-653134663164_01-border-1080.jpg",
    "tild3330-6434-4564-a630-316438636161_04-chord-1080.jpg",
    "0525-Deer.jpg",
    "7-Bathbomb-01.jpg",
    "tild3464-6666-4835-b639-336532313831_08-belong-1080.jpg",
    "tild3465-3862-4463-b861-633934316333_10_Fortune.jpg",
    "1425-Trunk.jpg",
    "tild3962-3131-4462-b130-636266643462_25_TastyTX.jpg",
    "tild6165-3965-4661-b464-366132353134_28_RideTX.jpg",
    "tild6133-3065-4263-a235-376134643335_29_Massive.jpg",
    "tild3032-3631-4365-b835-343137333365_Sunset30-01.png"
  ];

  setActiveTab(tab: DesignTab) {
    this.activeTab = tab;
    this.closeLightbox();
  }

  getActiveImages(): string[] {
    switch (this.activeTab) {
      case 'posters': return this.postersImages;
      case 'cards': return this.cardsImages;
      case 'vectobers': return this.vectobersImages;
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
