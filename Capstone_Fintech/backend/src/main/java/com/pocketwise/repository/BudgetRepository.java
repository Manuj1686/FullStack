package com.pocketwise.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.pocketwise.model.Budget;

public interface BudgetRepository extends MongoRepository<Budget, String> {}
