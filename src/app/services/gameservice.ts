import { Injectable } from '@angular/core';
import { Survivor } from '../models/survivor';

@Injectable()
export class GameService {

    public survivor: Survivor;

    public gameon: boolean;

    public day: number = 0;
    public hour: number = 0;
    public minute: number = 0;

    public lasttile: string;

    constructor(){ 
        this.day = 1;
        this.hour = 6;
        this.lasttile = "";

        this.gameon = false;
        this.survivor = new Survivor();
    }

    // this is needed because of that thing that getting objects from storage doesn't keep their "type" right
    public reconsume(gameservice :GameService): GameService {
        this.survivor = gameservice.survivor;
        this.gameon = gameservice.gameon;
        this.day = gameservice.day;
        this.hour = gameservice.hour;
        this.minute = gameservice.minute;
        this.lasttile = gameservice.lasttile;
        return this;
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

        this.survivor.hydration = this.survivor.hydration - (this.survivor.hydrationrate * minutes);
        this.survivor.energy = this.survivor.energy - (this.survivor.energyrate * minutes);
        this.survivor.condition = this.survivor.condition - (this.survivor.conditionrate * minutes);

    }

}