//import
import {Role, Usuario} from './usuario';

const user = new Usuario(1, 'User1', 'user1@dcomp.ufs.br',Role.Admin);


console.log("Hello, TypeScript!");


//VARIABLES
let title: string = "Welcome to TypeScript 6.0.3";
let description: string = "This project uses ESNext module system and Bundler resolution strategy.";
let locations: string[] = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
let date: Date = new Date();
let capacity: number = 100;

console.log(`Title: ${title}`);
console.log(`Description: ${description}`);
console.log(`Locations: ${locations.join(", ")}`);
console.log(`Date: ${date.toDateString()}`);
console.log(`Capacity: ${capacity}`);


//TUPLAS
let evento: [string, number, boolean];
evento = ["Conference", 2024, true];
console.log(`Evento: ${evento[0]}, Year: ${evento[1]}, Is Active: ${evento[2]}`);

console.log(evento[0]);

let evento2: [string, string, string[], Date, number];
evento2 = ["Festa", "halloween", ["avenida", "rua", "praça"], new Date(), 200];
console.log(`
    Title: ${evento2[0]}, 
    Description: ${evento2[1]}, 
    Locations: ${evento2[2].join(", ")}, 
    Date: ${evento2[3].toDateString()}, 
    Capacity: ${evento2[4]}`);

//OBJECTS
type EventoObj = {
    title: string;
    description: string;
    locations: string[];
    date: Date;
    capacity: number;
};

let evento3: EventoObj = {
    title: "forró",
    description: "Festa junina",
    locations: ["avenida", "rua", "praça"],
    date: new Date(),
    capacity: 300,
};

console.log(`Evento3: 
    Title: ${evento3.title}, 
    Description: ${evento3.description}, 
    Locations: ${evento3.locations.join(", ")}, 
    Date: ${evento3.date.toDateString()}, 
    Capacity: ${evento3.capacity}`);


//Funções
/**
 * Calcula o número de vagas restantes em um evento.
 * @param capacidade Capacidade total do evento.
 * @param confirmados Número de inscritos no evento.
 * @returns O número de vagas restantes.
 */
function calcularVagasRestantes(capacidade: number, confirmados:number=0): number {
    return capacidade - confirmados;
}
console.log(`Vagas restantes: ${calcularVagasRestantes(100, 30)}`);

function exibirResumoEvento(titulo: string, local: string): void{
    console.log(`O evento ${titulo} acontecerá em ${local}`);
}
exibirResumoEvento("Festa de Aniversário", "Praça Central");

/**
 * Exibe o resumo do evento no console.
 * @param evento Evento do tipo EventoObj contendo informações sobre o evento.
 */
function exibirResumoEvento2(evento: EventoObj): void{
    console.log(`
        titulo: ${evento.title} 
        descrição: ${evento.description}
        local: ${evento.locations.join(", ")} 
        data: ${evento.date.toDateString()} 
        capacidade: ${evento.capacity}`);
}
exibirResumoEvento2(evento3);

//arrow functions
/*function calcularVagasRestantes(capacidade: number, confirmados:number=0): number {
    return capacidade - confirmados;
}*/

let calcularVagasRestantesArrow = (capacidade: number, confirmados: number=0): number => {
    return capacidade - confirmados;
}
console.log(calcularVagasRestantesArrow(100, 30));

type minhaFuncao = (numero1: number, numero2: number) => number;
function nomeFuncao(f: minhaFuncao){
    console.log(f.name);
    console.log(f(10, 5));
}
nomeFuncao(calcularVagasRestantesArrow);

//CONDICIONAIS
if (evento3.title === "forró") {
    console.log("Dançe a vontade!");
} else if (title === "Festa de Aniversário") {  
    console.log("Parabéns!");
} else {
    console.log("Aproveite o evento!");
}

//LOOPS
let i: number = 1;
while(i <= 10){
    console.log(`Divulgando no grupo ${i}`);
    i++;
}

for(let i = 1; i <= 10; i++){
    console.log(`Divulgando no grupo ${i}`);
}

//ARRAYS
let capacidades: number[] = [100, 200, 30, 40];
for (let i = 0; i < capacidades.length; i++) {
    if (capacidades[i] >= 40) {
        console.log(`Sala ${i + 1}: capacidade de ${capacidades[i]} pessoas`);
    }
}

console.log(user);