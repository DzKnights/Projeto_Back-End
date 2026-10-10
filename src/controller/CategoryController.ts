import type {Request, Response} from "express";
import  CategoryRepository  from "../repository/CategoryRepository.js";
import { Category } from "../models/Category.js";

async function getAll (req: Request, res: Response){
     try {
            const categories = await CategoryRepository.findAll();
    
            res.status(200).json(categories);
        } catch (error) {
            console.error("Erro ao buscar categorias: ", error);
    
            res.status(500).json({
                message: "Erro ao buscar categorias.",
            });
        }
}

async function getByKeyword(req: Request<{keyword: string}>, res: Response){
   const {keyword} = req.params;
    
   if(keyword || typeof keyword != "string"){
    res.status(400).json({
        message: "Palavra-Chave não informada."
        })
    }
    try {
        const categories = await CategoryRepository.searchByKeyword(req.params.keyword);

        res.status(200).json(categories);
    } catch (error) {
        console.error("Erro ao pesquisar por categorias: ", error);

        res.status(500).json({
            message: "Erro ao pesquisar por categorias.",
        });
    }
}

async function getById( req: Request< { id: string }>, res:Response) {
        const{ id } = req.params;

        if(!id){
            res.status(404).json ({
                message: "ID da Categoria não informado."
            })
        }
        try {
                const category = await CategoryRepository.findById(id);
        
                res.status(200).json({
            id: category.getId(),
            name: category.getName(),
            description: category.getDescription(),
            icon: category.getIcon(),
            display_order: category.getDisplayOrder(),
            active: category.isActive(),
        });
            } catch (error) {
                console.error("Erro ao buscar categoria: ", error);
        
                res.status(404).json({
                    message: "Erro ao buscar categoria.",
                });
            }
}

async function create(req:Request, res: Response) {

    const { name, display_order, description, icon } = req.body;

     try {
            const category = new Category(name, display_order, description, icon);
            const createdCategory = await CategoryRepository.create(category);
    
            res.status(200).json(createdCategory);
        } catch (error) {
            console.error("Erro ao criar categoria: ", error);
    
            res.status(500).json({
                message: "Erro ao criar categoria.",
            });
        }
}

async function update(req: Request <{id: string}>, res:Response){
    const {id} = req.params;
    
    if(!id){
        res.status(404).json({
            message:"ID da Categoria não informado."
        })

    }
    try {
            const category = await CategoryRepository.findById(req.params.id);

            //Criar validações para os campos que podem ser alterados, caso não sejam informados, manter os valores atuais.
            const UpdatedCategory = await CategoryRepository.update(req.params.id, req.body);
    
            res.status(200).json(UpdatedCategory);
        } catch (error) {
            console.error("Erro ao alterar categoria: ", error);
    
            res.status(500).json({
                message: "Erro ao alterar categoria.",
            });
        }
}

async function remove(req:Request<{id: string}>, res: Response) {
    const {id} = req.params;

    if(!id){
        res.status(404).json({
            message:"ID da Categoria não informado."
        })
    }
    try {
            const category = await CategoryRepository.findById(req.params.id);
            await CategoryRepository.remove(req.params.id);
    
            res.status(200).json({
                message: "Categoria removida com sucesso."
            });
        } catch (error) {
            console.error("Erro ao remover categoria: ", error);
    
            res.status(404).json({
                message: "Erro ao remover categoria.",
            });
        }
}

    export default {
        getAll,
        getById,
        getByKeyword,
        create,
        update,
        remove,
    }