import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TriangleBorderComponent } from '../triangle-border/triangle-border.component';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TriangleBorderComponent],
  template: `
    <div class="home-page">
      <!-- Cover Section -->
      <section class="cover-section home-cover" style="background-image: url('images/Banner_NoLogo.jpg');">
        <div class="cover-filter"></div>
        <div class="cover-content">
          <img src="images/belphion_LOGO-01.png" alt="belphion logo" class="cover-logo" />
        </div>
      </section>

      <!-- Video Section (contains Cyan Triangle Border at the top) -->
      <section class="section video-section">
        <app-triangle-border [color]="'#69cfd1'"></app-triangle-border>
        
        <div class="container text-center">
          <div class="video-container">
            <div class="video-wrapper">
              <iframe 
                src="https://player.vimeo.com/video/429848570?badge=0&autopause=0&player_id=0&app_id=58479" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen 
                title="belphion showreel"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Cards Grid Section (contains Coral Triangle Border at the top) -->
      <section class="section cards-section">
        <app-triangle-border [color]="'#cc4e64'"></app-triangle-border>
        
        <div class="container">
          <div class="cards-grid">
            <!-- Card 1: Design -->
            <a routerLink="/design" class="nav-card">
              <div class="card-bg" style="background-image: url('images/tild6638-3834-4161-a566-333633363937_KickstarterAddons.jpg');"></div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <h3 class="card-title">Design</h3>
              </div>
            </a>

            <!-- Card 2: Photo -->
            <a routerLink="/photo" class="nav-card">
              <div class="card-bg" style="background-image: url('images/tild3764-3064-4230-b332-306236376235_BadAssReinhardt.jpg');"></div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <h3 class="card-title">Photo</h3>
              </div>
            </a>

            <!-- Card 3: Motion -->
            <a routerLink="/motion" class="nav-card">
              <div class="card-bg" style="background-image: url('images/tild3266-6230-4361-b733-643830303834_Dreamscape.jpg');"></div>
              <div class="card-overlay"></div>
              <div class="card-content">
                <h3 class="card-title">Motion</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="section experience-section">
        <div class="container">
          <h2 class="section-title">Experience</h2>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of experiences">
              <div class="timeline-meta">
                <h3 class="company-name">{{ exp.company }}</h3>
                <span class="period">{{ exp.period }}</span>
              </div>
              <div class="timeline-details">
                <h4 class="role">{{ exp.role }}</h4>
                <p class="description">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="section contact-section">
        <div class="container">
          <div class="contact-box">
            <h2 class="contact-title">Feel free to contact me</h2>
            <h3 class="contact-name">Ross Holbrook</h3>
            <p class="contact-subtitle">Digital Media Designer</p>
            <p class="contact-email">Email: <a href="mailto:belphion&#64;gmail.com">belphion&#64;gmail.com</a></p>
            
            <div class="contact-socials">
              <a 
                href="https://bsky.app/profile/belphion.bsky.social" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="contact-social-link"
              >
                <img src="images/tild6665-3963-4230-b238-333933616565_Bluesky_Logosvg.png" alt="Bluesky" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-page {
      width: 100%;
    }

    /* Video section styling */
    .video-section {
      position: relative;
      background-image: linear-gradient(0turn, rgba(121, 84, 143, 1) 0%, rgba(105, 207, 209, 1) 100%);
      padding-top: 90px;
      padding-bottom: 120px;
    }

    /* Video Embed Container */
    .video-container {
      max-width: 960px;
      margin: 0 auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
      z-index: 2;
    }

    /* Cards section styling */
    .cards-section {
      position: relative;
      background-image: linear-gradient(0turn, rgba(130, 91, 154, 1) 0%, rgba(204, 78, 100, 1) 100%);
      padding: 135px 0 150px;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .nav-card {
      position: relative;
      aspect-ratio: 0.75;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: flex-end;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .nav-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
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
      transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .nav-card:hover .card-bg {
      transform: scale(1.06);
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.85));
      transition: background-image 0.4s ease;
    }

    .nav-card:hover .card-overlay {
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(105, 207, 209, 0.9));
    }

    .card-content {
      position: relative;
      z-index: 2;
      width: 100%;
      text-align: center;
    }

    .card-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5px;
      margin: 0;
    }

    /* Experience Timeline Styling */
    .experience-section {
      background-color: #111111; /* Dark grey background */
      padding-top: 150px;
      padding-bottom: 150px;
    }

    .timeline {
      max-width: 850px;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 50px;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 40px;
      position: relative;
    }

    .timeline-meta {
      text-align: right;
    }

    .company-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 5px;
    }

    .period {
      font-size: 0.9rem;
      color: #777777;
      font-weight: 500;
    }

    .timeline-details {
      padding-left: 20px;
      border-left: 2px solid rgba(255, 255, 255, 0.1);
    }

    .role {
      font-size: 1.15rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 12px;
    }

    .description {
      font-size: 0.95rem;
      color: #aaaaaa;
      line-height: 1.6;
    }

    /* Contact Section Styling */
    .contact-section {
      background-color: #5f3c78; /* WCAG AAA Compliant Dark Purple */
      padding-top: 90px;
      padding-bottom: 90px;
      border-top: 1px solid rgba(255, 255, 255, 0.03);
      transition: background-color 0.3s ease;
    }

    .contact-box {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }

    .contact-title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 25px;
    }

    .contact-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 5px;
    }

    .contact-subtitle {
      font-size: 0.95rem;
      color: #dddddd;
      margin-bottom: 25px;
    }

    .contact-email {
      font-size: 1.1rem;
      color: #ffffff;
      margin-bottom: 30px;
    }

    .contact-email a {
      color: #ffffff;
      text-decoration: underline;
      font-weight: 500;
    }

    .contact-socials {
      display: flex;
      justify-content: center;
    }

    .contact-social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    }

    .contact-social-link:hover {
      background-color: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .contact-social-link img {
      width: 22px;
      height: auto;
    }

    /* Responsive Adjustments */
    @media (max-width: 900px) {
      .timeline-item {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .timeline-meta {
        text-align: left;
      }
      
      .timeline-details {
        padding-left: 0;
        border-left: none;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }
    }

    @media (max-width: 768px) {
      .cards-section {
        padding: 80px 0;
      }
      
      .cards-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .nav-card {
        aspect-ratio: 1.3;
      }
      
      .card-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class HomeComponent {
  experiences: ExperienceItem[] = [
    {
      company: 'Micro Center Home Office',
      role: 'Instructional Designer',
      period: '2021 - Present',
      description: 'Digital content creator for the purpose of training and development.'
    },
    {
      company: 'Micro Center',
      role: 'Sales Associate',
      period: '2014 - 2021',
      description: 'Provided excellent customer service and knowledge of product in order to guide patrons through the computer building process. Also sold televisions, digital cameras, and printers.'
    },
    {
      company: 'Elevate Pictures',
      role: 'Animator',
      period: '2015 - 2016',
      description: 'Contract animation and DIT position. On-set experience, editing and animation work, and helping build a massive DIY stop-motion animation set.'
    },
    {
      company: 'McGraw Hill',
      role: 'Contract Editor/Animator',
      period: '2014 - 2016',
      description: 'Contracted for several projects in the education sector. Edited and added animations to footage used for online teacher training content.'
    }
  ];
}
