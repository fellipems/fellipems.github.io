import { environment } from './../environments/environment';
import { Todo } from './todo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// Chamadas da nossa API sempre bom fazer nos services
@Injectable({   // fazer a injeção desta dependência
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = environment.apiUrl;

  constructor(  // fazer a injeção de uma dependência do nosso cliente Http no construtor do nosso Todo Service. No servic eimportamos o HttpClient e não o Module
    private http: HttpClient    // já injeta direto
  ) { }

  salvar(todo: Todo) : Observable<Todo>{    // no TypeScript trabalhamos com chamadas Assíncronas, ou seja, mandamos a chaamda para o servidor e não sabemos quanto tempo vai demorar essa requisição. Por isso tem o Observable, ele vai ficar "observando" o retorno dessa requisição 
    return this.http.post<Todo>(this.apiUrl, todo);   // no post recebe dois parâmetros, um é a URL e o segundo é o objeto JSON que mandamos para a requisição da URL
  }

  listar() : Observable<Todo[]>{    
    return this.http.get<Todo[]>(this.apiUrl);
  }

  deletar(id: number) : Observable<void>{   // mesmo não retornando nada temos que dar um retorno do Observable void, pois não vamos receber nada de volta
    //const url = this.apiUrl + '/' + id;
    const url = `${this.apiUrl}/${id}`;    // fizemos isto pois precisamos passar o Id via URL para deletar. Passamos a url base da api + / + o id que queremos excluir. Template String com duas crases " `` " utilizando um recurso do JS
    return this.http.delete<void>(url);
  }

  marcarComoConcluido(id: number) : Observable<Todo>{
    const url = `${this.apiUrl}/${id}/done`;
    return this.http.patch<Todo>(url, {});    // passamos um objeto vazio porque o método patch exige que passamos um corpo da requisição. Como estamos atualizando uma propriedade específica não precisamos passar as propriedades que gostariamos de atualizar(ex: {done: true, description})
  }
}
