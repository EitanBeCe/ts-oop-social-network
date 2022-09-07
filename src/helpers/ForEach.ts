// Side task

type ListModel = { list: InnerListModel };
type InnerListModel = InnerItemModel[];
type InnerItemModel = { id: number; name: string };

class ForEachClass {
  constructor(someList: InnerListModel, key: string, fn: Function) {
    someList.forEach((item) => {
      fn(item, item[key as keyof InnerItemModel]);
    });
  }
}

// To call ForEachClass without "new"
const ForEach = (someList: InnerListModel, key: string, fn: Function) => {
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
    ForEach(this.object.list ?? [], 'id', (item: {}) => {
      console.log(`Item: ${JSON.stringify(item)}`);
    });
    ForEach(this.object2.list ?? [], 'id', (item: {}, key: keyof {}) => {
      console.log(`Item: ${JSON.stringify(item)}. Key value: ${key}`);
    });
  }
}

// Copy from task

// Nathan's variant: Parameter 'item' implicitly has an 'any' type.
// ForEach(this.object.list ?? [], 'id', (item) => {
//   console.debug(item);
// });

// constructor() {
// ForEach(this.object.list ?? [], 'id', (item) => {
// 	console.debug(item);
// });
// 	ForEach(this.object2.list ?? [], 'name', (item, key) => {
// 		console.debug(item, key);
// 	});
// }
