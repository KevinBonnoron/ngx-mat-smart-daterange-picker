import { Queue } from './queue';

describe('Queue', () => {
  it('should create the queue', () => {
    const queue = new Queue(5);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.push(4);
    queue.push(5);

    expect(queue.contents).toStrictEqual([1, 2, 3, 4, 5]);
    expect(queue.length).toBe(5);
  });

  it('should reverse the queue without modifying the initial object', () => {
    const queue = new Queue(5);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.push(4);
    queue.push(5);

    const values = queue.reverse();

    expect(values).toStrictEqual([5, 4, 3, 2, 1]);
    expect(queue.contents).toStrictEqual([1, 2, 3, 4, 5]);
    expect(queue.length).toBe(5);
  });
});
