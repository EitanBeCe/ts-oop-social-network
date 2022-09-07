// Side task

type ListModel = { list: InnerListModel };
type InnerListModel = ItemModel[];
type AnyArrModel = any[];
type ItemModel = { id: number; name: string };
type Fn<T> = (item: T, key: keyof T) => void;

class ForEachClass<T extends AnyArrModel, U extends keyof T> {
  constructor(someList: T, key: U, fn: Fn<T>) {
    someList.forEach(<T>(item) => {
      fn(item, item[key]);
    });
  }
}

// To call ForEachClass without "new"
const ForEach = <T extends AnyArrModel, U extends keyof T>(someList: T, key: U, fn: Fn<T>) => {
  return new ForEachClass(someList, key, fn);
};

export class LetsUseForEach {
  private object: ListModel = {
    list: [
      { id: 1, name: 'First' },
      { id: 2, name: 'Second' },
    ],
  };
  private object2: ListModel = {
    list: [
      { id: 3, name: 'First' },
      { id: 4, name: 'Second' },
    ],
  };

  constructor() {
    ForEach(this.object.list ?? [], 'id', (item) => {
      console.log(`Item: ${JSON.stringify(item)}`);
    });
    ForEach(this.object2.list ?? [], 'id', (item, key: keyof ItemModel) => {
      console.log(`Item: ${JSON.stringify(item)}. Key value: ${key}`);
    });
  }
}

// Nathan's variant: Parameter 'item' implicitly has an 'any' type.
// ForEach(this.object.list ?? [], 'id', (item) => {
//   console.debug(item);
// });

// Copy from task

// constructor() {
// ForEach(this.object.list ?? [], 'id', (item) => {
// 	console.debug(item);
// });
// 	ForEach(this.object2.list ?? [], 'name', (item, key) => {
// 		console.debug(item, key);
// 	});
// }
