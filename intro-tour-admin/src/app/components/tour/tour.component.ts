import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { AdminService } from '../../services/admin.service';

import { Tour } from '../../tour';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  public adminTours = [];

  constructor(private tourService: TourService, private adminService: AdminService) { }

  ngOnInit() {
    this.getToursByAdminId(1);
  }

  private getToursByAdminId(id) {
    this.adminService.getAdminById(id)
      .subscribe((adminTours) => {
        adminTours.forEach(adminTour => {
          this.adminTours.push(adminTour);
          console.log(this.adminTours);
        });
      });
  }

}
