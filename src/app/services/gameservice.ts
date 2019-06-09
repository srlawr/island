import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

    public gameon: boolean = false;

    private day: number = 0;
    private hour: number = 0;
    private minute: number = 0;

    public lasttile: string;

    constructor(){ 
        this.hour = 6;
        this.lasttile = "";
    }

    public gettime(): string {
        return "Day " + this.day + " - " + 
                (this.hour < 10 ? "0" + this.hour : this.hour) + ":" + 
                (this.minute < 10 ? "0" + this.minute : this.minute);
    }

    public addtime(minutes: number) {
        this.minute += minutes;
        if(this.minute > 59) {
            this.hour += Math.floor(this.minute / 60);
            this.minute = this.minute % 60;
        }
        if(this.hour > 23) {
            this.day += Math.floor(this.hour / 24);
            this.hour = this.hour % 24;
        }
    }

}