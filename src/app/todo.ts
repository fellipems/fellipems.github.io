// Objeto/classe Todo representando o nosso objeto do tipo Todo, igual o que temos na nossa API back-end
export class Todo{
    id!: number;
    description!: string;
    done!: boolean;
    createdDate!: string; // string pois vamos receber ela como string JSON
 // string pois vamos receber ela como string JSON
    doneDate!: string;
}