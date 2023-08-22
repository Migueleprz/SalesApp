import {Component, OnDestroy} from '@angular/core';
import {filter, map, Subscription} from "rxjs";
import {environment} from "@env/environment.development";
import {ActivationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnDestroy{
  public title: any;
  public icon: any;
  public title$!: Subscription;
  public appName: string = environment.appName;
  constructor(private router: Router) {
    this.title$ = this.getDataUrl().subscribe(({title, icon}) => {
      this.title = title;
      this.icon = icon;
      document.title = this.appName+' - '+ title;
    });
  }
  getDataUrl() {
    return this.router.events
      .pipe(
        // @ts-ignore
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }
  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }
}
