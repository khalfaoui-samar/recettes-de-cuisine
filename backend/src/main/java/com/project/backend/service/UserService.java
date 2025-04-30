package com.project.backend.service;

import com.project.backend.entites.User;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User signupUser(User user) {
        return userRepository.save(user); // Enregistre l'utilisateur dans la base de données
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public User addUser(User user) {
        return userRepository.save(user);
    }
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Map<LocalDate, Long> getSignupsPerDay() {
        return userRepository.findAll().stream()
            .collect(Collectors.groupingBy(User::getCreatedAt, Collectors.counting()));
    }
}