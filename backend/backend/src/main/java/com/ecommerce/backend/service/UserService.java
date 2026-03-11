package com.ecommerce.backend.service;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // --- KAYIT OLMA (REGISTER) ---
    public User registerUser(User user) {
        // Bu numara zaten var mı?
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new RuntimeException("Bu telefon numarası zaten kayıtlı!");
        }
        // Yoksa kaydet
        return userRepository.save(user);
    }

    // --- GİRİŞ YAPMA (LOGIN) ---
    public User loginUser(String phoneNumber, String password) {
        // 1. Numarayı bul
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);

        // 2. Kullanıcı varsa VE şifresi uyuşuyorsa geri döndür
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }

        // Hatalıysa null dön (veya hata fırlatabiliriz)
        return null;
    }
}