export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<string>;
  readById: (id: string, resource: any) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
}
