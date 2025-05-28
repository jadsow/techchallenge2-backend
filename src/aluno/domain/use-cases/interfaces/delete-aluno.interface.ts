export interface IDeleteAlunoUseCase {
  delete(id: string): Promise<void>;
}
