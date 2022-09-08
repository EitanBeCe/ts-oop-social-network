// Side task

type ListModel = { list: InnerListModel };
type InnerListModel = ItemModel[];
type ItemModel = { id: number; name: string };
type Fn<T> = (item: T, key: keyof T) => void;

// type ArrOfObj = {}[];

class ForEachClass<T extends {}, U extends keyof T> {
  // Broadest version
  constructor(someList: T[], key: U, fn: Fn<T>) {
    someList.forEach((item) => fn(item, key));
  }

  // Broader version
  // class ForEachClass<T extends {}, U extends keyof T> {
  //   constructor(someList: T[], key: U, fn: Fn<T>) {
  //     someList.forEach((item) => fn(item, key));
  //   }

  // Narrowed version
  // constructor(someList: InnerListModel, key: keyof ItemModel, fn: Fn<ItemModel>) {
  //   someList.forEach((item) => fn(item, key));
  // }
  // }
}

// ************** To call ForEachClass without "new" **************

// Broader version
const ForEach = <T extends {}, U extends keyof T>(someList: T[], key: U, fn: Fn<T>) => {
  return new ForEachClass(someList, key, fn);
};
// Narrowed version
//  const ForEach = (someList: InnerListModel, key: keyof ItemModel, fn: Fn<ItemModel>) => {
//   return new ForEachClass(someList, key, fn);
// };

// ************** Usage **************

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
      console.log(`Item: ${JSON.stringify(item.name)}. Key value: ${item[key]}`);
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
