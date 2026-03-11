package com.ecommerce.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Tüm URL'lere izin ver (api/products vs.)
                .allowedOrigins("http://localhost:5173", "http://localhost:5174") // React'in çalıştığı portlar
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen işlemler
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}