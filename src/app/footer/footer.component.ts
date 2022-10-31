import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  about: string[] = ["About Us", "Our History", "Leadership Team", "Values In Action", "Franchise Info", "Recalls & Alerts", "Real Estate", "Digital Accessibility", "Investor Relations", "News & Notifications"];
  services: string[] = ["Services Overview", "Wi-Fi", "Gift Cards", "PlayPlaces & Parties", "McDelivery®", "Mobile Order & Pay", "Trending Now", "McDonald’s Merchandise", "Family Fun Hub", "MyMcDonald's Rewards", "McCafé®"];
  contact: string[] = ["Contact Us", "Gift Card FAQs", "Donations", "Employment", "Restaurant Feedback", "Frequently Asked Questions"];

  constructor() { }

  ngOnInit(): void {
  }

}
