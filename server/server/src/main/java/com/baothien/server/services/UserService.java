package com.baothien.server.services;

import com.baothien.server.models.UserDTO;
import com.baothien.server.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean createUser(UserDTO userDTO) {
        try {
            boolean isExistEmail = userRepository.existsByEmail(userDTO.getEmail());
            if (isExistEmail) {
                return false;
            }
            String hasedPassword = passwordEncoder.encode(userDTO.getPassword());
            userDTO.setPassword(hasedPassword);
            userRepository.save(userDTO);
        } catch(Exception e) {
            System.out.println("Error at UserService: " + e.toString());
        }
        return true;
    }

    public void checkAuthen(String email, String password) {
        UserDTO loginUser = userRepository.findByEmail(email);
        if (loginUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect Email!");
        } else {
            boolean checkPassword = passwordEncoder.matches(password, loginUser.getPassword());
            if (!checkPassword) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect Password!");
            }
        }
    }
}
