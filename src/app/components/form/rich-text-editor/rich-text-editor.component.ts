import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit {

  @Input() label: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
