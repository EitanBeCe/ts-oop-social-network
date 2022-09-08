// Side task

type ListModel = { list: InnerArrListModel };
type InnerArrListModel = ItemModel[];
type ItemModel = { id: number; name: string };

type ObjListModel = { list: InnerObjListModel };
type InnerObjListModel = { [key: string]: ItemModel };

type InnerListModel = InnerArrListModel | InnerObjListModel;

type Fn<T> = (item: T, key: keyof T) => void;

// Broadest version for objectInObj and objectInArr
class ForEachClass<T extends InnerListModel, A extends keyof ItemModel> {
  constructor(someList: T, key: A, fn: Fn<ItemModel>) {
    if (Array.isArray(someList)) {
      someList.forEach((item) => fn(item, key));
    }
    if (typeof someList === 'object' && !Array.isArray(someList)) {
      for (const [_key, value] of Object.entries(someList)) {
        fn(value, key);
      }
    }
  }
}

// Broad version
// class ForEachClass<T extends {}, U extends keyof T> {
//   constructor(someList: T[], key: U, fn: Fn<T>) {
//     someList.forEach((item) => fn(item, key));
//   }
// }

// Narrowed version
// class ForEachClass<T extends {}, U extends keyof T> {
//   constructor(someList: InnerArrListModel, key: keyof ItemModel, fn: Fn<ItemModel>) {
//     someList.forEach((item) => fn(item, key));
//   }
// }

// ************** To call ForEachClass without "new" **************

// Broadest version
const ForEach = <T extends InnerListModel, A extends keyof ItemModel>(
  someList: T,
  key: A,
  fn: Fn<ItemModel>
) => {
  return new ForEachClass(someList, key, fn);
};
// Broad version
// const ForEach = <T extends {}, U extends keyof T>(someList: T[], key: U, fn: Fn<T>) => {
//   return new ForEachClass(someList, key, fn);
// };
// Narrowed version
//  const ForEach = (someList: InnerArrListModel, key: keyof ItemModel, fn: Fn<ItemModel>) => {
//   return new ForEachClass(someList, key, fn);
// };

// ************** Usage **************

export class LetsUseForEach {
  // private object: ListModel = {
  //   list: [
  //     { id: 1, name: 'First' },
  //     { id: 2, name: 'Second' },
  //   ],
  // };
  private objectInArr: ListModel = {
    list: [
      { id: 3, name: 'First' },
      { id: 4, name: 'Second' },
    ],
  };

  private objectInObj: ObjListModel = {
    list: {
      item1: { id: 1, name: 'First' },
      item2: { id: 2, name: 'Second' },
    },
  };

  constructor() {
    ForEach(this.objectInObj.list ?? {}, 'id', (item, key) => {
      console.log(`Item in Obj: ${JSON.stringify(item)}. Key: ${item[key]}`);
      // console.log(`Item: ${JSON.stringify(item.name)}. Key value: ${item[key]}`);
    });

    // Key value
    ForEach(this.objectInArr.list ?? [], 'id', (item, key) => {
      console.log(`Item in Arr: ${JSON.stringify(item)}. Key value: ${item[key]}`);
      // console.log(`Item in Arr: ${JSON.stringify(item.name)}. Key value: ${item[key]}`);
    });

    // ForEach(this.object.list ?? [], 'id', (item) => {
    //   console.log(`Item: ${JSON.stringify(item)}`);
    // });

    // Key
    // ForEach(this.object2.list ?? [], 'id', (item, key) => {
    //   console.log(`Item: ${JSON.stringify(item)}. Key: ${key}`);
    // });

    // Error example
    // ForEach(this.object2.list ?? [], 'title', (item, key) => {
    //   console.log(`Item: ${JSON.stringify(item)}. Key: ${key}`);
    // });
  }
}
