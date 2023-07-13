package com.baothien.server.controllers;

import com.baothien.server.models.UserDTO;
import com.baothien.server.repositories.UserRepository;
import com.baothien.server.services.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.AuthenticationException;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDTO userDTO) {
        boolean createUser = userService.createUser(userDTO);
        if (!createUser) {
            return ResponseEntity.badRequest().body("Email is exists!");
        }
        return ResponseEntity.ok("Signup successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userReq) {
        String emailReq = userReq.getEmail();
        String passwordReq = userReq.getPassword();
        try {
            userService.checkAuthen(emailReq, passwordReq);
            return ResponseEntity.ok().body("Login Successfully!");
        } catch (ResponseStatusException ex) {
            throw ex;
        }
    }
}
