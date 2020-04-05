import { from } from 'rxjs';
import { Service } from './service.model';
import { getGenericDao } from '../../common/daos/generic.dao';

const commonServicesDao = getGenericDao(Service);

export const ServicesDao = {
  ...commonServicesDao,
  findByCategoryId: (categoryId: string) => from(
    commonServicesDao.model.find({categoryId}).exec()
  )
};
