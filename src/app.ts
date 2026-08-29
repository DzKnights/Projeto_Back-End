import express from "express";
import { randomUUID } from "node:crypto";
import supabrase from "./suprabase.js";

const app = express();

app.use(express.json());

const pizzasCategoryId = randomUUID();
const drinksCategoryId = randomUUID();
//Produtos 
const products = [
  {
    id: randomUUID(),
    CategoryId: pizzasCategoryId,
    nome: "Pizzas Tradicionais",
    description:
      "Pizzas clássicas com sabores tradicionais, preparadas com ingredientes selecionados.",
  },

  {
    id: randomUUID(),
    CategoryId: drinksCategoryId,
    nome: "Bebidas",
    description:
      "Refrigerantes, sucos e outras bebidas para acompanhar sua pizza.",
  },
];

const categories = [
  {
    id: pizzasCategoryId,
    nome: "Pizzas",
    description: "Pizzas salgadas e doces com diversos sabores.",
  },
  {
    id: drinksCategoryId,
    nome: "Bebidas",
    description:
      "Refrigerantes, sucos, águas e outras opções para acompanhar.",
  },
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Restaurante",
    version: "1.0.0",
  });
});

app.get("/categories", (req, res) => {
  res.status(200).json({ categories });
});
//Get usado para pegar os dados do servidor
app.get("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada."
    })
  }
  res.status(200).json({ category });
});

//PUT usado para alterar
app.put("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada."
    })
  }

  category.nome = req.body.nome;
  category.description = req.body.description;

  res.status(200).json({ category });
});

//Deletar
app.delete("/categories/:id", (req, res) => {
  const category = categories.find((category) => {
    return category.id == req.params.id;
  });

  if (!category) {
    return res.status(404).json({
      message: "Categoria não encontrada."
    })
  }

  const index =categories.indexOf(category);
  categories.splice(index, 1);

  res.status(200).json({ 
    message: "Categoria removida com sucesso."
   });
});

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado."
    })
  }
  res.status(200).json(product);
});

// do Procduct / PUT/ DELETE
  app.put("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado."
    })
  }

  product.nome = req.body.nome;
  product.description = req.body.description;

  res.status(200).json({ product });
});

//Deletar
app.delete("/products/:id", (req, res) => {
  const product = products.find((product) => {
    return product.id == req.params.id;
  });

  if (!product) {
    return res.status(404).json({
      message: "Produto não encontrado."
    })
  }

  const index = products.indexOf(product);
  products.splice(index, 1);

  res.status(200).json({ 
    message: "Produto removido com sucesso."
   });
});

app.post("/categories", (req, res) => {
  const category = {
    id: randomUUID(),
    ...req.body,
  }

  categories.push(category);

  res.status(201).json({ category });
});

app.post("/products", (req, res) => {
  const product = {
    id: randomUUID(),
    ...req.body,
  };

  products.push(product);

  res.status(201).json({ product });
});

app.get("/products", (req, res) => {
  res.status(200).json({ products });
});

//===========
//SupaBase
//===========
app.get("test-supabase", async (req, res) =>{
  const {data,error} = await supabrase
  .from("categorias")
  .select("*");

  if(error){

    console.log("Erro ao consultar SupaBase: ", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao consultar o banco de dados",
      error: error.message,
    })
  }

  res.status(200).json({
    success: true,
    message: "Conexão com SupaBase realizada com sucesso!",
    data,
  })

});

export default app;