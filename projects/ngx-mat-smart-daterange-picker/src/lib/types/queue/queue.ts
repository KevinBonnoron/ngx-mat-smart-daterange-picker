export class Queue<T> {
  private _contents: T[] = [];

  constructor(protected readonly _capacity: number) {}

  push(element: T): void {
    this._contents.push(element);

    if (this._contents.length >= this._capacity) {
      this._contents = this._contents.slice(-this._capacity);
    }
  }

  reverse(): T[] {
    return this.contents.reverse();
  }

  some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean {
    return this._contents.some(predicate, thisArg);
  }

  get contents(): T[] {
    return [...this._contents];
  }

  get capacity(): number {
    return this._capacity;
  }

  get length(): number {
    return this._contents.length;
  }
}

export class UniqueQueue<T> extends Queue<T> {
  constructor(override readonly _capacity: number, private readonly compareFn: (v1: T, v2: T) => boolean) {
    super(_capacity);
  }

  override push(element: T): void {
    if (this.contents.some(el => this.compareFn(el, element))) {
      return;
    }

    super.push(element);
  }
}
