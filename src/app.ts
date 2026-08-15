import express from "express";
import { version } from "node:os";

const app = express();

app.get("/", (req, res) =>{

    res.status(200).json({
        message:"API Restaurante",
        version: "1.0.0"
    });
});

app.get("/categorias", (req, res) =>{
    res.status(200).json({categorias});
});

app.get("/produtos", (req, res) =>{
    res.status(200).json({produtos});
});

export default app;

const produtos = [
  {
    "id": 1,
    "nome": "Pizzas Tradicionais",
    "descripson": "Pizzas clássicas com sabores tradicionais, preparadas com ingredientes selecionados."
  },
  {
    "id": 2,
    "nome": "Pizzas Especiais",
    "descripson": "Pizzas especiais com combinações exclusivas e ingredientes premium."
  },
  {
    "id": 3,
    "nome": "Bebidas",
    "descripson": "Refrigerantes, sucos e outras bebidas para acompanhar sua pizza."
  }
]

const categorias = [
  {
    "id": 1,
    "nome": "Pizzas",
    "descripson": "Pizzas salgadas e doces com diversos sabores."
  },
  {
    "id": 2,
    "nome": "Bebidas",
    "descripson": "Refrigerantes, sucos, águas e outras opções para acompanhar."
  },
  {
    "id": 3,
    "nome": "Sobremesas",
    "descripson": "Deliciosas opções doces para finalizar sua refeição."
  }
]