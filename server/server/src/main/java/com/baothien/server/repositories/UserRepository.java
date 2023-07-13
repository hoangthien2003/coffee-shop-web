package com.baothien.server.repositories;

import com.baothien.server.models.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<UserDTO, UUID> {
    boolean existsByEmail(String email);
    UserDTO findByEmail(String email);
}
