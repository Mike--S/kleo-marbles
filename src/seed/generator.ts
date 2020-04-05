import { from, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Typegoose } from 'typegoose';

interface TypegooseModel {
  new(): Typegoose;
}

export const generateCollectionFromModel = <T extends TypegooseModel>(model: T) => (collection: any[]) => {
  const modelInstance = new model();
  const mongooseModel = modelInstance.getModelForClass(model);

  return from(Promise.all(
    collection.map(item => new mongooseModel(item).save())
  )).pipe(
    tap(() => console.log(`- ${modelInstance.constructor.name} collection generated`)),
    catchError(e => {
      console.log(e);
      return of(null);
    })
  );
};
