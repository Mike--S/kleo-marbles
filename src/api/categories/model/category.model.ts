import { Typegoose, prop } from 'typegoose';

export class Category extends Typegoose {
  @prop({ required: true, index: true })
  id?: string;

  @prop({ required: true })
  title?: string;

  @prop()
  description?: string;
}
