import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';  // import para criar um controler para receber o valor digitado em input. FormGroup é uma classe(vamos criar um objeto a partir desta classe) que vai representar os campos do formulário
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  todos: Todo[] = [];

  form: FormGroup = new FormGroup({ // ({ passamos um objeto aqui dentro })
    description: new FormControl('', [Validators.required, Validators.minLength(4)])    // campo description que vai receber o FormControl. No FormControl, o primeiro parâmetro é o valor padrão/inicial do campo. Já no segundo, podemos passar um array de validadores. O .required é para fazer o campo ser obrigatório
  })

  constructor(private service: TodoService){        // Fazendo a injeção do nosso service. Colocando uma propriedade dentro do construtor, se ela for injetável o próprio container de injeção de dependência do Angular, vai fazer essa injeção deste serviço 
  }

  ngOnInit(){   // na inicialiação do component, já carregar os dados do BD
    this.listarTodos();
  }

  listarTodos(){
    this.service.listar().subscribe(todoList => this.todos = todoList);     // todos vai receber a listagem do nosso BD da API, assim, ao executar a página, já carregará a lista
  }

  submit(){
    console.log(this.form.value)    // imprime o valor que está no campo. Aqui, vamos pegar todos os FormControl dentro do nosso form, e criar um oobjeto apartir do nome dos campos. Retorna um JSON
    const todo: Todo = { ...this.form.value } // spread operator(...). Espalha todos os valores desse objeto para o que criamos. Cria um Todo apartir dos valores do formulário 
    //this.service.salvar(todo).subscribe(savedTodo => console.log(savedTodo));   // o método salvar retornará um observable e o observable tem um método que é subscribe, em que ele tem um observer em que faz com que podemos tratar o retorno da nossa requisição 
    // por isso quando dermos um salvar no objeto e um subscribe no observable, vai retornar o todo que foi salvo e retornado lá da API. 
    this.service.salvar(todo)   // chamando o service com o método salvar
      .subscribe(savedTodo => {
        this.todos.push(savedTodo);  // Pegar o Todo salvo e colocar no array/lista
        this.form.reset();    // resetando o formulário e limpando o campo de adicionar Todos quando clicar no add
      })
  }

  delete(todo: Todo){
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodos()      // método next que recebe a resposta (response).  Quando deletarmos o Todo, queremos tirar ele da lista. 2 maneiras: pegar o array e exlcuir o elemento da lista ou podemos listar os Todos novamente, já atualizados.
    })
  }

  done(todo: Todo){
    this.service.marcarComoConcluido(todo.id).subscribe({
      next: (response) => {   // a response do método é o que a API está retornando 
        todo.done = response.done
        todo.doneDate = response.doneDate
      }
    })
  }
    // quando trabalhamos com APIs, temos que trabalhar com as camadas de services para fazer o acesso
}
