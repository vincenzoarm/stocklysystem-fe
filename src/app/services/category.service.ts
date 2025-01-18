import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8080/StocklySystem/api/category';

  constructor(private http: HttpClient) {}

  /**
   * Ritorna la lista di tutte le categorie presenti nel database.
   * @returns un Observable che emette un array di Category
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      'http://localhost:8080/StocklySystem/api/category/getCategories'
    );
  }

  /**
   * Elimina una categoria dal database.
   * @param id l'id della categoria da eliminare
   * @returns un Observable che emette la risposta HTTP dell'eliminazione
   */
  removeCategory(id: number) {
    return this.http.delete(this.baseUrl + '?id=' + id);
  }
  /**
   * Ritorna una categoria esistente nel database.
   * @param id l'id della categoria da cercare
   * @returns un Observable che emette la categoria trovata
   */

  getCategory(id: number): any {
    return this.http.get(this.baseUrl + '?id=' + id);
  }

  /**
   * Modifica una categoria esistente nel database.
   * @param category la categoria con le modifiche da apportare
   * @returns un Observable che emette la categoria appena modificata
   */
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl, category);
  }

  /**
   * Aggiunge una categoria al database.
   * @param category la categoria da aggiungere
   * @returns un Observable che emette la categoria appena creata
   */
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }
}
