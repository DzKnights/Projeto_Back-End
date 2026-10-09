import type {Request, Response} from "express";
import  CategoryRepository  from "../repository/CategoryRepository.js";

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
        
                res.status(200).json(category);
            } catch (error) {
                console.error("Erro ao buscar categoria: ", error);
        
                res.status(404).json({
                    message: "Erro ao buscar categoria.",
                });
            }
}

async function create(req:Request, res: Response) {
     try {
            const category = await CategoryRepository.create(req.body);
    
            res.status(200).json(category);
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
            const category = await CategoryRepository.update(req.params.id, req.body);
    
            res.status(200).json(category);
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