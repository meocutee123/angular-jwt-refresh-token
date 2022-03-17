import { ControlBase } from '../control-base';

export class TextArea extends ControlBase<string> {
  override controlType = 'textarea';
}