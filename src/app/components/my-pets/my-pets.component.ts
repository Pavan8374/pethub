import { Component } from '@angular/core';
import { AdoptionCenterComponent } from '../adoption-center/adoption-center.component';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [AdoptionCenterComponent],
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.css'
})
export class MyPetsComponent {

}
