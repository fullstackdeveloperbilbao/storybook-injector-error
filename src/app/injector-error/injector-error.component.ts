/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EnvironmentInjector,
  Input,
  ViewChild,
} from '@angular/core';
import {
  createCustomElement,
  NgElement,
  WithProperties,
} from '@angular/elements';
import { ListItemComponent } from './components/list/list.component';

export function isNil(value: unknown): value is null | undefined {
  return isUndefined(value) || isNull(value);
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

@Component({
  selector: 'app-injector-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './injector-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InjectorErrorComponent {
  @Input() list: any[] = [];

  @ViewChild('listContainer', { static: true, read: ElementRef })
  listContainer!: ElementRef<HTMLElement>;

  constructor(private _inj: EnvironmentInjector) {
    this.defineListItemElement();
  }

  onAddItem() {
    const listItemEl = this.createListItemElement();
    listItemEl.item = this.list[this.getRandomNumber(0, this.list.length - 1)];
    this.listContainer.nativeElement.appendChild(listItemEl);
  }

  private defineListItemElement() {
    if (isNil(customElements.get('app-list-item'))) {
      const validationElement = createCustomElement(ListItemComponent, {
        injector: this._inj,
      });
      customElements.define('app-list-item', validationElement);
    }
  }

  private createListItemElement() {
    const validationEl: NgElement & WithProperties<ListItemComponent> =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      document.createElement('app-list-item') as any;

    return validationEl;
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
