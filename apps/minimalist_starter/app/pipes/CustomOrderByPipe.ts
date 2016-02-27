import {Pipe, PipeTransform} from 'angular2/core';


@Pipe({
  name: 'customOrderBy'
})
export class CustomOrderByPipe implements PipeTransform {

  transform(value: Object[], args: string[]) {

    const params = Array.isArray(args[0]) ? args[0] : args;

    if (!value) {
      return value;
    }

    value.sort(this.dynamicSortMultiple.apply(this, params));

    return value;
  }

  dynamicSort(prop: string): Function {

    let sortOrder = 1;

    if (prop[0] === '-') {
      sortOrder = -1;
      prop = prop.slice(1);
    }

    return (a: Object, b: Object) => {
      const propA = typeof a[prop] === 'string' ? a[prop].toLowerCase() : a[prop];
      const propB = typeof b[prop] === 'string' ? b[prop].toLowerCase() : b[prop];
      const result = propA < propB ? -1 : (propA > propB ? 1 : 0);
      return result * sortOrder;
    };
  }

  dynamicSortMultiple(...props: string[]): Function {

    return (obj1: Object, obj2: Object) => {

      let i = 0;
      let result = 0;

      /* try getting a different result from 0 (equal)
       * as long as we have extra properties to compare
       */
      while (result === 0 && i < props.length) {
        result = this.dynamicSort(props[i])(obj1, obj2);
        i++;
      }

      return result;
    };
  }

}
