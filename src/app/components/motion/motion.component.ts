import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-motion',
  standalone: true,
  imports: [CommonModule, SafePipe, TriangleBorderComponent],
  template: `
    <div class="motion-page">
      <!-- Cover Section -->
      <section class="cover-section subpage-cover" style="background-image: url('images/Banner_NoLogo.jpg');">
        <div class="cover-filter"></div>
        <div class="cover-content">
          <img src="images/belphion_LOGO-01.png" alt="belphion logo" class="cover-logo" />
        </div>
      </section>

      <!-- Video Gallery Section (with background gradient) -->
      <section class="gallery-section">
        <!-- Ocean Teal Triangle Border Below Cover (positioned absolutely at the top of the gallery section, overlapping the cover) -->
        <app-triangle-border [color]="'#1c8083'"></app-triangle-border>

        <div class="container">
          <div class="video-grid">
            <div class="video-card" *ngFor="let vidId of videoIds; let i = index">
              <div class="video-container">
                <div class="video-wrapper">
                  <iframe 
                    [src]="'https://player.vimeo.com/video/' + vidId | safe" 
                    frameborder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowfullscreen 
                    [title]="'Motion Video ' + (i + 1)"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Coral Triangle Border Above Footer -->
      <app-triangle-border [color]="'#be3b52'"></app-triangle-border>
    </div>
  `,
  styles: [`
    .motion-page {
      width: 100%;
      position: relative;
    }

    .gallery-section {
      position: relative;
      background-image: linear-gradient(0turn, rgba(121, 84, 143, 1) 0%, rgba(28, 128, 131, 1) 100%);
      padding: 90px 0;
    }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }

    .video-card {
      background-color: #080808;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .video-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .video-container {
      width: 100%;
    }

    @media (max-width: 768px) {
      .gallery-section {
        padding: 50px 0;
      }
      .video-grid {
        grid-template-columns: 1fr;
        gap: 25px;
      }
    }
  `]
})
export class MotionComponent {
  videoIds: string[] = [
    "913889573",
    "536516307",
    "449039386",
    "449131846",
    "439031797",
    "439024138",
    "430079381",
    "430077215"
  ];
}
