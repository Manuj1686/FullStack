package com.pocketwise.repository;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.pocketwise.model.AppUser;
public interface UserRepository extends MongoRepository<AppUser,String>{ Optional<AppUser> findByEmailIgnoreCase(String email); boolean existsByEmailIgnoreCase(String email); }
