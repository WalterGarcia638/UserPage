import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'userlandingpageApp';

  constructor(private router: Router, private authService: AuthService) {}

  changeContent(menuItem: string) {
    // Actualizar la URL y cambiar el texto
    this.router.navigate(['/homepage'], { queryParams: { section: menuItem } });
  }

  logout() {
    this.authService.logout();
  }
}
