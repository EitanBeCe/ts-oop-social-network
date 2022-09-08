// Side task

type ListModel = { list: InnerListModel };
type InnerListModel = ItemModel[];
// type ArrOfObjModel = {}[];
type ItemModel = { id: number; name: string };
type Fn<T> = (item: T, key: keyof T) => void;

class ForEachClass {
  // More narrowed version
  constructor(someList: InnerListModel, key: keyof ItemModel, fn: Fn<ItemModel>) {
    someList.forEach((item) => fn(item, key));
  }
}

// To call ForEachClass without "new"
const ForEach = (someList: InnerListModel, key: keyof ItemModel, fn: Fn<ItemModel>) => {
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
    // Key value
    ForEach(this.object2.list ?? [], 'id', (item, key) => {
      console.log(`Item: ${JSON.stringify(item)}. Key value: ${item[key]}`);
    });
    // Key
    ForEach(this.object2.list ?? [], 'id', (item, key) => {
      console.log(`Item: ${JSON.stringify(item)}. Key: ${key}`);
    });
    // Error example
    // ForEach(this.object2.list ?? [], 'title', (item, key) => {
    //   console.log(`Item: ${JSON.stringify(item)}. Key: ${key}`);
    // });
  }
}
