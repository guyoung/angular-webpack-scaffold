


export class BaseDto {
  _id?: any;
  createdBy?: any;
  createdAt?: number;
  updatedAt?: number;
}

export class Contact extends BaseDto {
  email?: string;
  name?: string;
  website?: string;
  industry?: any;
  city?: any;
}

export class Notification {
  type: string;
  data?: any;
}