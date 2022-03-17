import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight = ''

  constructor(private el : ElementRef) { 
  }

  highlight(color : string){
    this.el.nativeElement.style.color = color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
}
