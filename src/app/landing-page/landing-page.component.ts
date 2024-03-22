import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { LandingPageFeatureCardComponent } from "../shared/components/landing-page-feature-card/landing-page-feature-card.component";
import { LandingPageStatsComponent } from "../shared/components/landing-page-stats/landing-page-stats.component";
import { SiteFooterComponent } from "../shared/components/site-footer/site-footer.component";
import { SiteNavComponent } from "../shared/components/site-nav/site-nav.component";

type LandingPageFeature = {
  icon: string;
  iconBgColor: string;
  title: string;
  description: string;
};

@Component({
  selector: "app-landing-page",
  standalone: true,
  imports: [
    SiteFooterComponent,
    NgOptimizedImage,
    MatIcon,
    SiteNavComponent,
    LandingPageStatsComponent,
    LandingPageFeatureCardComponent,
  ],
  templateUrl: "./landing-page.component.html",
})
export class LandingPageComponent {
  features: LandingPageFeature[] = [
    {
      icon: "description",
      iconBgColor: "bg-cornflower-blue",
      title: "Comprehensive Academic Resources",
      description:
        "This includes access to a wide range of study materials such as questions, memos, explanations, notes, and learning videos, designed to support students in their academic journey.",
    },
    {
      icon: "calendar_month",
      iconBgColor: "bg-robins-egg-blue",
      title: "Personalised Tutoring Services",
      description:
        "Ithobekile.io offers students the ability to book one-on-one or group tutoring sessions for selected subjects, providing tailored educational support to meet individual learning needs.",
    },
    {
      icon: "groups",
      iconBgColor: "bg-piction-blue",
      title: "AI-Powered Assistance",
      description:
        "With the innovative use of a WhatsApp chatbot, Ithobekile.io ensures students have on-demand access to assistance with their questions, making learning more interactive and responsive.",
    },
  ];
}
