export const SecretKey = 'PetSanctuary';

export class Routes{

    public static getAllAnimals =   "animals"
}

export class authentication {
    public static userlogin: string = 'Auth/logIn';
    public static userSignUp: string = 'Auth/register';
    // public static sendOTP = 'User/sendOTP/';
    // public static verifyOTP:string = "User/verifyOTP"
    // public static resetPassword:string = "User/resetPassword"
  }

  export class petManagement{

    public static addPet = 'Pet/addPet'
    public static updatePet = 'Pet/updatePet/'
    public static removePet = 'Pet/removePet/'
    public static adoptPet = 'Pet/adoptPet/'
    public static getPetsByFilter = 'Pet/getPetsByFilter'
  }