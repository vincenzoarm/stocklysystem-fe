import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:8080/StocklySystem/api/product';

  constructor(private http: HttpClient) {}
  /**
   * Esegue una GET request per ottenere la lista di tutti i prodotti.
   * La lista dei prodotti viene restituita come un JSON array di oggetti.
   * @returns Observable che contiene la lista dei prodotti.
   */
  getProducts() {
    return this.http.get(
      'http://localhost:8080/StocklySystem/api/product/getProducts'
    );
  }

  /**
   * Esegue una DELETE request per cancellare il prodotto con l'id
   * specificato.
   * @param id L'id del prodotto da cancellare.
   * @returns Observable che contiene la risposta del server.
   */
  removeProduct(id: number) {
    return this.http.delete(this.baseUrl + '?id=' + id);
  }

  /**
   * Esegue una GET request per ottenere il prodotto con l'id
   * specificato.
   * @param id L'id del prodotto da ottenere.
   * @returns Observable che contiene il prodotto richiesto.
   */
  getProduct(id: number) {
    return this.http.get(this.baseUrl + '?id=' + id);
  }

  /**
   * Esegue una PUT request per aggiornare il prodotto specificato.
   * Il prodotto viene identificato dall'id passato come parametro e
   * le informazioni vengono aggiornate con i dati forniti nell'oggetto prod.
   * @param id L'id del prodotto da aggiornare.
   * @param prod L'oggetto Product contenente i dati aggiornati.
   * @returns Observable che contiene la risposta del server.
   */

  updateProduct(id: number, prod: Product) {
    prod.id = id;
    return this.http.put(this.baseUrl, prod, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Esegue una POST request per aggiungere un nuovo prodotto.
   * I dati del prodotto vengono passati come parametro.
   * @param prod L'oggetto Product contenente i dati del prodotto da aggiungere.
   * @returns Observable che contiene la risposta del server.
   */
  addProduct(prod: Product) {
    return this.http.post(this.baseUrl, prod);
  }
}
