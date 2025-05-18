import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateIdea } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Basic health check endpoint
  app.get("/api/health", (_req, res) => {
    const apiKeyConfigured = !!process.env.OPENAI_API_KEY;
    res.json({ 
      status: "ok", 
      message: "Server is running",
      apiKeyConfigured
    });
  });
  
  // Endpoint para geração de ideias usando IA local
  app.post("/api/generate-idea", async (req: Request, res: Response) => {
    try {
      // Verificar se a chave da API está configurada
      if (!process.env.OPENAI_API_KEY) {
        return res.status(403).json({ 
          error: "Chave da API OpenAI não configurada. Por favor, configure a variável de ambiente OPENAI_API_KEY." 
        });
      }
      
      const { promptCategory, promptType, customInput, language } = req.body;
      
      if (!promptCategory && !customInput) {
        return res.status(400).json({ 
          error: "É necessário fornecer uma categoria de prompt ou um texto personalizado" 
        });
      }
      
      const result = await generateIdea({
        promptCategory,
        promptType,
        customInput,
        language: language || "pt"
      });
      
      res.json({ result });
    } catch (error) {
      console.error("Erro ao processar solicitação de geração de ideia:", error);
      res.status(500).json({ 
        error: "Ocorreu um erro ao gerar a ideia. Por favor, tente novamente mais tarde." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
