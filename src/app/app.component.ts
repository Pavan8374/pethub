import { Component, Renderer2 } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,
    ReactiveFormsModule,
    RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Virtual-Pet-Sanctuary';
  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
    const theme = localStorage.getItem('theme') || 'light';
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }
}
