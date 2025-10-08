import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { LastConversionsService } from './last-conversions.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-last-conversions',
  templateUrl: './last-conversions.html',
  imports: [JsonPipe],
  styleUrl: './last-conversions.scss',
})
export class LastConversions {
  lastConversionsService = inject(LastConversionsService);

  list = this.lastConversionsService.list;
}
