export class ObjectUtil {

  private static _seq = 0;

  static nextId(): string {
    return `${++ObjectUtil._seq}`;
  }

	static clone(data: any): any {
		return JSON.parse(JSON.stringify(data));
	}

	static merge(dest: Object, src: Object): Object {
		if (ObjectUtil.isBlank(src)) {
			return dest;
		}
		if (ObjectUtil.isBlank(dest)) {
			return src;
		}
		for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        dest[prop] = src[prop];
      }
    }
    return dest;
	}

	static isPresent(data: any): boolean {
		return !ObjectUtil.isBlank(data);
	}

	static isBlank(data: any): boolean {
		return data === undefined || data === null;
	}
}
