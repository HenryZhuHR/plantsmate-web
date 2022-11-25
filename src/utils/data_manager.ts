interface AbstractNode {
  next?: AbstractNode | null;
  prev?: AbstractNode | null;
}
class DummyHeadNode implements AbstractNode {
  public next: AbstractNode | null;

  constructor() {
    this.next = null;
  }
}

class DummyTailNode implements AbstractNode {
  public prev: AbstractNode | null;

  constructor() {
    this.prev = null;
  }
}

class Node<T> implements AbstractNode {
  public value: T;
  public next: AbstractNode | null;
  public prev: AbstractNode | null;
  constructor(data: T) {
    this.value = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList<T> {
  protected _dummyHead: DummyHeadNode;
  protected _dummyTail: DummyTailNode;
  protected _length: number;
  protected _maxLength: number;

  constructor(maxLength: number = 5) {
    this._dummyHead = new DummyHeadNode();
    this._dummyTail = new DummyTailNode();
    this._dummyHead.next = this._dummyTail;
    this._dummyTail.prev = this._dummyHead;
    this._length = 0;
    this._maxLength = maxLength;
  }

  /**
   * 返回长度
   * @return {number}
   */
  get length(): number {
    return this._length;
  }

  /**
   * 在头部添加一个元素
   * @param value
   */
  append(value: T) {
    if (this._length > this._maxLength) {
      this.pop();
    }
    const newFirstNode = new Node(value);
    const firstNode = this._dummyHead.next as AbstractNode;

    this._dummyHead.next = newFirstNode;

    newFirstNode.prev = this._dummyHead;
    newFirstNode.next = firstNode;

    firstNode.prev = newFirstNode;

    this._length++;
  }

  /**
   * 取出尾部最后一个元素
   * @returns
   */
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const lastNode = this._dummyTail.prev as Node<T>;
    const newLastNode = lastNode.prev as AbstractNode;

    this._dummyTail.prev = newLastNode;

    newLastNode.next = this._dummyTail;

    lastNode.prev = null;
    lastNode.next = null;

    this._length--;

    return lastNode.value;
  }

  /**
   * 返回数组，先加入的元素，数字越大
   * @param length 返回数组长度。默认为 -1 ，返回全部
   * @returns
   */
  toArray(length: number = -1): Array<T> {
    if (length < 0 || length > this._length) {
      length = this._length;
    }
    const arr = [];
    let curr = this._dummyHead.next as Node<T>;

    for (let i = 0; i < length; i++) {
      arr.push(curr.value);
      curr = curr.next as Node<T>;
    }

    return arr;
  }

  isEmpty(): boolean {
    return this._length === 0;
  }
}

export default LinkedList;
