import { Driver, EditDriverDTO } from '../driverService';

export interface IDriverService {
  getProfile(): Promise<Driver>;
  updateProfile(data: EditDriverDTO): Promise<Driver>;
}


