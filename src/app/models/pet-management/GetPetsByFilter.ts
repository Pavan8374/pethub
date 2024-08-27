
export interface GetPetsResponse {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    code: number;
    message: string;
    data: Pets[];
}

export interface Pets {
    id: string,
    petName: string,
    species: string,
    breed: string,
    gender: string,
    color: string,
    weight: string,
    age: string,
    microchipNumber: string,
    isAdopted: boolean,
    adoptedDate: Date,
    dateofBirth: Date,
    ownerId: string
  }