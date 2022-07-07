import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Requester } from '../services/requester.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  selectedDate = this.currentDate
  currencyData:any
  ratesData:any

  symbolDirection = true
  walutaDirection = true
  kursDirection = true

  darkMode = false
  darkTheme:any


  constructor(private data: Requester) { }

  ngOnInit(){
    this.dateRequester(this.selectedDate)
  }
  customDate(val:any){
    this.selectedDate = val.target.value
    this.dateRequester(this.selectedDate)
  }
  dateRequester(date:string){
    this.data.requester(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`).subscribe((res)=>{
      this.currencyData = res.body
      this.ratesData = this.currencyData[0].rates
    })
  }
  sort(col:string,direction:boolean){
    this.ratesData.sort(this.sortFunc(col,direction))
  }
  sortFunc(which:string, ord:boolean) {
    let order = 1
    if(ord){
      order = -1
    }
    return function (a:any,b:any) {
      let result
      if(a[which] < b[which]){
        result = -1
      }else if(a[which] > b[which]){
        result = 1
      }else{
        result = 0
      }
      return result * order;
    }
  }
  dark(){
    this.darkMode = !this.darkMode
    this.darkTheme = (this.darkMode)?'background-color:rgba(0, 0, 0, 0.6)':''
  }
}
