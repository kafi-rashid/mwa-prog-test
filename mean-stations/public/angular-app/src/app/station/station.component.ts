import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationsDataService } from '../stations-data.service';
import { Station } from '../stations/stations.component';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  displayTime: boolean= false;
  station:Station= new Station();

  constructor(private stationService: StationsDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const stationId: string= this.route.snapshot.params["stationId"];
  
    this.stationService.getStation(stationId).subscribe({
      next: (station)=> this.fillStation(station),
      error: (error)=>{this.station= new Station(); console.log(error);
      },
    });
  }

  private fillStation(station: Station): void {
    this.station= station;
    console.log(this.station);
  }

  toggleDisplayTime() {
    this.displayTime = !this.displayTime;
  }

}
