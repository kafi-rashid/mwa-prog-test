import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StationsDataService } from '../stations-data.service';

export class Station {
  #_id!: string;
  #st!: string;
  #ts!: Date;
  #airTemperature!: Number;
  #dewPoint!: Number;
  #pressure!: Number;
  #visibility!: Number;
  #precipitationEstimatedObservation!: Number;
  #position!: {
    type: "Point",
    coordinates: Number[]
  };
  #wind!: {
    direction: Number;
    speed: Number;
  }
  get _id() {return this.#_id;};
  get st() {return this.#st;};
  get ts() {return this.#ts;}
  get airTemperature() {return this.#airTemperature;}
  get dewPoint() {return this.#dewPoint;}
  get pressure() {return this.#pressure;}
  get visibility() {return this.#visibility;}
  get precipitationEstimatedObservation() {return this.#precipitationEstimatedObservation;}
  get position() {return this.#position;}
  get wind() {return this.#wind;}
  
  set _id(_id) {this.#_id= _id;}
  set st(st) {this.#st= st;}
  set ts(ts) {this.#ts= ts;}
  set airTemperature(airTemperature) {this.#airTemperature= airTemperature;}
  set dewPoint(dewPoint) {this.#dewPoint= dewPoint;}
  set pressure(pressure) {this.#pressure= pressure;}
  set visibility(visibility) {this.#visibility= visibility;}
  set precipitationEstimatedObservation(precipitationEstimatedObservation) {this.#precipitationEstimatedObservation= precipitationEstimatedObservation;}
  set position(position) {this.#position= position;}
  set wind(wind) {this.#wind= wind;}
  
  constructor() {
  }
}

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations!: Station[];
  totalStations: number = 0;
  offset: number = 0;
  count: number = 5;
  selectedStations: string[] = [];

  constructor(private stationService:StationsDataService, private _router:Router) { }

  ngOnInit(): void {
    this.getStations();
    this.getCount();
  }

  private getStations() {
    const params = "?offset=" + this.offset;
    this.stationService.getStations(params).subscribe({
      next: (stations)=> this.fillStations(stations),
      error: (error)=>{this.stations= []; console.log(error);
      },
    });
  }

  private fillStations(stations: Station[]) {
    this.stations= stations;
  }

  getCount() {
    this.stationService.getCount().subscribe({
      next: (count) => {
        this.totalStations = count;
      },
      error: (error) => {
        this.totalStations = 0;
        console.log(error);
      }
    })
  }

  previous() {
    this.offset = this.offset - this.count;
    this.selectedStations = [];
    this.getStations();
  }

  next() {
    this.offset = this.offset + this.count;
    this.selectedStations = [];
    this.getStations();
  }

  isNextDisabled() {
    return (this.offset + this.count) >= this.totalStations;
  }

  stationSelected(event: any, stationId: string) {
    if (event.target.checked) {
      this.selectedStations.push(stationId);
    } else {      
      this.selectedStations = this.selectedStations.filter((id: string) => id != stationId);
    }
  }

  deleteSelected() {
    if (this.selectedStations && this.selectedStations.length > 0) {
      this.stationService.deleteStations(this.selectedStations).subscribe({
        next: (resposne) => {
          alert("Selected stations have been deleted!");
          this.getStations();
        },
        error: (error) => {
          console.log(error);          
        }
      })
    } else {
      alert("No station is selected!");
    }
  }

}
