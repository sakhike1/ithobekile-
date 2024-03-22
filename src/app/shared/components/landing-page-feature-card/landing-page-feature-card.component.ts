import { Component, Input } from "@angular/core";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-landing-page-feature-card",
  standalone: true,
  imports: [MatIcon],
  templateUrl: "./landing-page-feature-card.component.html",
})
export class LandingPageFeatureCardComponent {
  @Input({ required: true }) title = "";
  @Input({ required: true }) description = "";
  @Input({ required: true }) icon = "";
  @Input({ required: true }) iconBgColor = "";
}
