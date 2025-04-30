package com.project.backend.restcontroller;

import com.project.backend.entites.User;
import com.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users") // Route de base pour ce contrôleur
@CrossOrigin(origins = "*")
public class UserRestcontroller {
    @Autowired
    private UserService userService;

    @PostMapping("/signup") // Route pour l'inscription
    public ResponseEntity<User> signupUser(@RequestBody User user) {
        User signupedUser = userService.signupUser(user);
        return ResponseEntity.ok(signupedUser);
    }

    @PostMapping("/login") // Route pour la connexion
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        user.setMemberSince(LocalDate.now());
        user.setCreatedAt(LocalDate.now());
        return userService.addUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/signups-per-day")
    public List<Map<String, Object>> getSignupsPerDay() {
        return userService.getSignupsPerDay().entrySet().stream()
            .map(e -> Map.<String, Object>of("date", (Object) e.getKey(), "count", e.getValue()))
            .collect(Collectors.toList());
    }
}