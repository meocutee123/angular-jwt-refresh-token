import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.scss']
})
export class MediaPickerComponent implements OnInit {

  files: any = []

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  
  onUpload(e: Event): void {
    const el = e.currentTarget as HTMLInputElement;
    const file = el.files?.[0];
    if (!file) return
    const source = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
    this.files.push(source)
  }
  
  remove(i: number): void {
    this.files.splice(i, 1)
  }

}
