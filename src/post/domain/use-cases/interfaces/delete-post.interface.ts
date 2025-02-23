export interface IDeletePost {
  delete(id: string): Promise<void>;
}
