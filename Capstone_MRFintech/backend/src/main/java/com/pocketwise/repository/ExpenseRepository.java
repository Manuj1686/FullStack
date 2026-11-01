package com.pocketwise.repository;
import java.util.List; import java.time.LocalDate; import org.springframework.data.mongodb.repository.MongoRepository; import com.pocketwise.model.Expense;
public interface ExpenseRepository extends MongoRepository<Expense,String>{ List<Expense> findByOwnerEmailOrderByDateDesc(String ownerEmail); List<Expense> findByOwnerEmailAndDateBetweenOrderByDateAsc(String ownerEmail, LocalDate start, LocalDate end); }
