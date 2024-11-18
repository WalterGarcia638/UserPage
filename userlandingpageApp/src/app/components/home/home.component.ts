import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'We Get Pet Care!';
  description = 'For over 17 years, we have been a trusted partner in keeping pets healthy and happy!';
  userData: any;

  constructor(private route: ActivatedRoute, private reqresService: UserdataService) {
    this.route.queryParams.subscribe((params) => {
      const section = params['section'];
      this.updateContent(section);
    });
  }

  updateContent(section: string) {
    switch (section) {
      case 'Location':
        this.title = 'Find Our Location';
        this.description = 'Discover where you can find our nearest store!';
        break;
      case 'Blog':
        this.title = 'Read Our Blog';
        this.description = 'Get the latest news and tips on pet care!';
        break;
      case 'Services':
        this.title = 'Our Services';
        this.description = 'Explore the wide range of services we offer!';
        break;
      case 'About Us':
        this.title = 'About Us';
        this.description = 'Learn more about our story and team!';
        break;
      case 'Franchise':
        this.title = 'Franchise with Us';
        this.description = 'Join our franchise network and be part of our success!';
        break;
      default:
        this.title = 'We Get Pet Care!';
        this.description = 'For over 17 years, we have been a trusted partner in keeping pets healthy and happy!';
    }
  }

  fetchUserData() {
    // Ejemplo de uso de la API de ReqRes
    this.reqresService.getUserData(1).subscribe((data) => {
      this.userData = data.data;
    });
  }
}