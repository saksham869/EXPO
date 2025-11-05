package com.jobportal.api;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.mongo.MongoDBAtlasVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class RAGConfig {

    @Value("${app.rag.similarity-threshold:0.7}")
    private double similarityThreshold;
    
    @Value("${app.rag.max-results:5}")
    private int maxResults;

    @Bean
    public VectorStore vectorStore(MongoTemplate mongoTemplate, EmbeddingModel embeddingModel) {
        return new MongoDBAtlasVectorStore(
            mongoTemplate,
            embeddingModel,
            maxResults,
            similarityThreshold,
            "vector_store",
            "vector_index"
        );
    }
}