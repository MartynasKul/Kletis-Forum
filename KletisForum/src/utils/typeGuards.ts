import { type User } from '@/types/User';
import { type Tractor } from '@/types/Tractor';

export function isPopulatedUser(author: string | User): author is User {
    return typeof author !== 'string';
  }
  
export function isPopulatedTractor(tractor: string | Tractor): tractor is Tractor {
    return typeof tractor !== 'string';
  }  

