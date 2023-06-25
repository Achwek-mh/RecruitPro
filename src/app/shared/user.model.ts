
export class User {
  firstname: string | undefined;
  lastname: string | undefined;
  Role : string |undefined;
  email: string | undefined; 
  password: string | undefined;
  imagePath:any
}

export class User1 {
  email: string | undefined; 
  password: string | undefined;
}
export enum Permission {
  User = 'User',
  Admin = 'Admin'}