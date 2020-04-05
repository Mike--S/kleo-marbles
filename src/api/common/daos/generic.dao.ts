import { from, Observable } from 'rxjs';

export const getGenericDao = (Model) => {
  const model = new Model().getModelForClass(Model);

  return {
    model,

    findAll: (): Observable<{body: any}> => from(
      model.find().exec()
    ),

    findById: (id: string) => from(
      model.findById(id).exec()
    )
  };
};
