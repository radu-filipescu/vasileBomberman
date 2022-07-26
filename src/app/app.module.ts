import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { TileWallComponent } from './background/tiles/tile-wall/tile-wall.component';
import { TileEmptyComponent } from './background/tiles/tile-empty/tile-empty.component';
import { PlayerComponent } from './player/player.component';
import { TileFoodComponent } from './background/tiles/tile-food/tile-food.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    TileWallComponent,
    TileEmptyComponent,
    PlayerComponent,
    TileFoodComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
