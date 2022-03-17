import { ControlBase } from '../control-base';

export class NumberBox extends ControlBase<number> {
  override controlType = 'number';
}