import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-site-nav",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./site-nav.component.html",
})
export class SiteNavComponent {}
