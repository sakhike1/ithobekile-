import { Component, Input } from "@angular/core";

@Component({
  selector: "app-landing-page-stats",
  standalone: true,
  imports: [],
  templateUrl: "./landing-page-stats.component.html",
})
export class LandingPageStatsComponent {
  @Input({ required: true }) title = "";
  @Input({ required: true }) subtitle = "";
}
