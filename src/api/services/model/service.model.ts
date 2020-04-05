import { Typegoose, prop } from 'typegoose';

export class Service extends Typegoose {
  @prop({ required: true, index: true })
  name?: string;

  @prop({ required: true })
  categoryId?: string;

  @prop({ required: true })
  price?: string;

  @prop()
  time?: string;
}
