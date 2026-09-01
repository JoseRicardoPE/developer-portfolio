import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-loading',
  imports: [
    TranslatePipe
  ],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {}
