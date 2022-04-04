import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ControlBase } from "@app/_models";

export function GetFormFields<T>(fg: FormGroup, c: any): T {
  const r = c;
  for (let i of Object.keys(fg.value)) {
    r[i] = (fg as any).value[i]
  }
  return { ...r };
}

export function ToFormGroup(cs: ControlBase<string>[]) {
  const g: any = {};

  cs.forEach(c => {
    g[c.key] = c.required ? new FormControl(c.value || '', Validators.required)
      : new FormControl(c.value || '');
  });
  return new FormGroup(g);
}

export function isEmptyOrSpaces(s: string): boolean {
  return s === null || s.match(/^ *$/) !== null;
}

export function CheckValidity(fg: FormGroup): boolean {
  Object.keys(fg.controls).forEach(f => fg.get(f)?.updateValueAndValidity())
  return !fg.invalid
}

export function isElementVisible(el: any): boolean {
  const rect = el.getBoundingClientRect(),
    vWidth = window.innerWidth || document.documentElement.clientWidth,
    vHeight = window.innerHeight || document.documentElement.clientHeight,
    efp = function (x: any, y: any) { return document.elementFromPoint(x, y) };

  if (rect.right < 0 || rect.bottom < 0
    || rect.left > vWidth || rect.top > vHeight)
    return false;

  return (
    el.contains(efp(rect.left, rect.top))
    || el.contains(efp(rect.right, rect.top))
    || el.contains(efp(rect.right, rect.bottom))
    || el.contains(efp(rect.left, rect.bottom))
  );
}