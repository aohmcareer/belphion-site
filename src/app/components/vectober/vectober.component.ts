import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

type VectoberYear = '2018' | '2019' | '2020' | '2021' | '2023' | '2024' | '2025';

@Component({
  selector: 'app-vectober',
  standalone: true,
  imports: [CommonModule, TriangleBorderComponent],
  template: `
    <div class="vectober-page">
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
              [class.active]="activeYear === '2018'" 
              (click)="setYear('2018')"
            >
              Vectober 2018
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2019'" 
              (click)="setYear('2019')"
            >
              Vectober 2019
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2020'" 
              (click)="setYear('2020')"
            >
              Vectober 2020
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2021'" 
              (click)="setYear('2021')"
            >
              Vectober 2021
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2023'" 
              (click)="setYear('2023')"
            >
              Vectober 2023
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2024'" 
              (click)="setYear('2024')"
            >
              Vectober 2024
            </button>
            <button 
              class="tab-button" 
              [class.active]="activeYear === '2025'" 
              (click)="setYear('2025')"
            >
              Vectober 2025
            </button>
          </div>
        </div>
      </section>

      <!-- Gallery Grid Section (with background gradient) -->
      <section class="gallery-section">
        <div class="container">
          <!-- Images Grid -->
          <div class="gallery-grid">
            <div 
              class="gallery-item" 
              *ngFor="let img of getActiveImages(); let idx = index" 
              (click)="openLightbox(idx)"
            >
              <img [src]="'images/' + img" [alt]="'Vectober ' + activeYear + ' Day ' + (idx + 1)" loading="lazy" />
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
    .vectober-page {
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
      padding: 10px 15px;
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
        font-size: 0.8rem;
        padding: 6px 10px;
      }
      .gallery-section {
        padding: 40px 0 80px;
      }
    }
  `]
})
export class VectoberComponent {
  activeYear: VectoberYear = '2025';
  zoomIndex: number | null = null;

  vectober2018: string[] = [
    "Sunset1-01.png",
    "Sunset2-01.png",
    "Sunset3-01.png",
    "Sunset4-01.png",
    "Sunset5-01.png",
    "Sunset6-01.png",
    "Sunset7-01.png",
    "Sunset8-01.png",
    "Sunset9-01.png",
    "Sunset10-01.png",
    "Sunset11-01.png",
    "Sunset12-01.png",
    "Sunset13-01.png",
    "Sunset14-01.png",
    "Sunset15-01.png",
    "Sunset16-01.png",
    "Sunset17-01.png",
    "Sunset18-01.png",
    "Sunset19-01.png",
    "Sunset20-01.png",
    "Sunset21-01.png",
    "Sunset22-01.png",
    "Sunset23-01.png",
    "Sunset24-01.png",
    "Sunset25-01.png",
    "Sunset26-01.png",
    "Sunset27-01.png",
    "Sunset28-01.png",
    "Sunset29-01.png",
    "tild3635-3434-4531-b361-346461616537_Sunset30-01.png",
    "Sunset31-01.png"
  ];

  vectober2019: string[] = [
    "1_RingTX.jpg",
    "2_MindlessTX.jpg",
    "3_BaitTX.jpg",
    "4_FreezeTX.jpg",
    "5_BuildTX.jpg",
    "6_HuskyTX.jpg",
    "7_EnchantedTX.jpg",
    "8_FrailTX.jpg",
    "9_SwingTX.jpg",
    "10_PatternTX.jpg",
    "11_SnowTX.jpg",
    "12_DragonTX.jpg",
    "13_AshTX.jpg",
    "14_OvergrownTX.jpg",
    "15_LegendTX.jpg",
    "16_WildTX.jpg",
    "17_OrnamentTX.jpg",
    "18_MisfitTX.jpg",
    "19_SlingTX.jpg",
    "20_TreadTX.jpg",
    "21_TreasureTX.jpg",
    "22_GhostTX.jpg",
    "23_AncientTX.jpg",
    "24_DizzyTX.jpg",
    "tild3366-3064-4663-b362-393831653765_25_TastyTX.jpg",
    "26_DarkTX.jpg",
    "27_CoatTX.jpg",
    "tild3835-6666-4437-a434-613439656530_28_RideTX.jpg",
    "29_InjuredTX.jpg",
    "30_CatchTX.jpg",
    "31_RipeTX.jpg"
  ];

  vectober2020: string[] = [
    "1_Restore.jpg",
    "2_Love.jpg",
    "3_Fear.jpg",
    "4_Freedom.jpg",
    "5_Champion.jpg",
    "6_City.jpg",
    "7_Health.jpg",
    "8_Galactic.jpg",
    "9_Magic.jpg",
    "10_Home.jpg",
    "11_Music.jpg",
    "12_Power.jpg",
    "13_Vulnerable.jpg",
    "14_Plant.jpg",
    "15_Sleep.jpg",
    "16_Shield.jpg",
    "17_Fire.jpg",
    "18_Rich.jpg",
    "19_Fight.jpg",
    "20_End.jpg",
    "21_Speed.jpg",
    "22_Play.jpg",
    "23_Soul.jpg",
    "24_Faith.jpg",
    "25_Shiny.jpg",
    "26_Ice.jpg",
    "27_World.jpg",
    "28_Poetry.jpg",
    "29_Cut.jpg",
    "30_Family.jpg",
    "31_Ghost.jpg"
  ];

  vectober2021: string[] = [
    "01_attack-01.png",
    "02_wanting_lowrez.png",
    "03_scar.png",
    "04_redo_lowrez.png",
    "05_rustic.png",
    "06_rattle.png",
    "07_reward.png",
    "08_dusty.png",
    "09_colossal.png",
    "10_zephyr.png",
    "11_cellar.png",
    "12_Infest.png",
    "13_quizzical.png",
    "14_ceaseless.png",
    "15_ponder.png",
    "16_gleaming.png",
    "17_cemetery.png",
    "18_eyes.png",
    "19_crowd.png",
    "20_ritzy.png",
    "21_vagabond.png",
    "22_spurious_lorez.png",
    "23_limp.png",
    "24_gaudy.png",
    "25_resonant.png",
    "26_crib.png",
    "27_overt.png",
    "28_whip.png",
    "29_net.png",
    "30_impinge.png",
    "31_set.png"
  ];

  vectober2023: string[] = [
    "01_Dream.jpg",
    "02_Spiders.jpg",
    "03_Path.jpg",
    "04_Dodge.jpg",
    "05_Map.jpg",
    "06_Golden.jpg",
    "07_Drip.jpg",
    "08_Toad.jpg",
    "09_Bounce.jpg",
    "tild6438-6630-4330-b334-343331633438_10_Fortune.jpg",
    "11_Wander.jpg",
    "12_Spicy.jpg",
    "13_Rise.jpg",
    "14_Castle.jpg",
    "15_Dagger.jpg",
    "16_Angel.jpg",
    "17_Demon.jpg",
    "18_Saddle.jpg",
    "19_Plump.jpg",
    "20_Frost.jpg",
    "21_Chains.jpg",
    "22_Scratchy.jpg",
    "23_Celestial.jpg",
    "24_Shallow.jpg",
    "25_Dangerous.jpg",
    "26_Remove.jpg",
    "27_Beast.jpg",
    "28_Sparkle.jpg",
    "tild3064-3035-4137-b964-626334636565_29_Massive.jpg",
    "30_Rush.jpg",
    "31_Fire.jpg"
  ];

  vectober2024: string[] = [
    "tild6335-6434-4238-b364-313235396463_01-border-1080.jpg",
    "02-tidy-1080.jpg",
    "03-temptation-1080.jpg",
    "tild6265-6233-4232-b563-333261323065_04-chord-1080.jpg",
    "05-diamond-1080.jpg",
    "06-release-1080.jpg",
    "07-arrogant-1080.jpg",
    "tild6336-6530-4661-b866-643463383361_08-belong-1080.jpg",
    "09-denial-1080.jpg",
    "10-kinship-1080.jpg",
    "11-canvas-1080.jpg",
    "12-routine-1080.jpg"
  ];

  vectober2025: string[] = [
    "0125-Mustache.jpg",
    "0225-Weave.jpg",
    "0325-Crown.jpg",
    "0425-Murky.jpg",
    "0525-Deer.jpg",
    "0625-Pierce.jpg",
    "0725-Starfish.jpg",
    "0825-Reckless.jpg",
    "0925-Heavy.jpg",
    "1025-Sweep.jpg",
    "1125-Sting.jpg",
    "1225-Shredded.jpg",
    "1325-Drink.jpg",
    "1425-Trunk.jpg",
    "1525-Ragged.jpg",
    "1625-Blunder.jpg",
    "1725-Ornate.jpg",
    "1825-Deal.jpg",
    "1925-Arctic.jpg",
    "2025-Rivals.jpg",
    "2125-Blast.jpg",
    "2225-Button.jpg",
    "2325-Firefly.jpg",
    "2425-Rowdy.jpg",
    "2525-Inferno.jpg",
    "2625-Puzzling.jpg",
    "2725-Onion.jpg",
    "2825-Skeletal.jpg",
    "2925-Lesson.jpg",
    "3025-Vacant.jpg",
    "3125-Award.jpg"
  ];

  setYear(year: VectoberYear) {
    this.activeYear = year;
    this.closeLightbox();
  }

  getActiveImages(): string[] {
    switch (this.activeYear) {
      case '2018': return this.vectober2018;
      case '2019': return this.vectober2019;
      case '2020': return this.vectober2020;
      case '2021': return this.vectober2021;
      case '2023': return this.vectober2023;
      case '2024': return this.vectober2024;
      case '2025': return this.vectober2025;
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
