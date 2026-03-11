package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Kayıt Ol: POST http://localhost:8080/api/users/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Giriş Yap: POST http://localhost:8080/api/users/login
    // React'ten { "phoneNumber": "...", "password": "..." } gelecek
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.loginUser(loginRequest.getPhoneNumber(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user); // Başarılı, kullanıcıyı dön
        } else {
            return ResponseEntity.status(401).body("Telefon veya şifre hatalı!");
        }
    }
}