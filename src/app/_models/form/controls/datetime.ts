import { ControlBase } from '../control-base';

export class Datetime extends ControlBase<string> {
  override controlType = 'datetime';
}