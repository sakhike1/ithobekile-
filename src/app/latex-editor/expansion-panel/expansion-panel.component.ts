import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.css'
})
export class ExpansionPanelComponent {
  @Input() panelTitle: string = '';
  @Input() panelDescription: string = '';
  @Input() panelDescriptionIcon: string = '';
  @Input() expanded: boolean = false;
  @Input() disabled: boolean = false;
}
