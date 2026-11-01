package com.pocketwise.model;

import java.util.HashMap;
import java.util.Map;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "budgets")
public class Budget {
    @Id
    private String id = "default";
    private double monthlyBudget = 10000;
    private Map<String, Double> categories = new HashMap<>();

    public Budget() {
        categories.put("Food", 3000.0); categories.put("Travel", 1500.0);
        categories.put("Shopping", 2000.0); categories.put("College", 1500.0);
        categories.put("Entertainment", 1000.0); categories.put("Other", 1000.0);
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public double getMonthlyBudget() { return monthlyBudget; }
    public void setMonthlyBudget(double monthlyBudget) { this.monthlyBudget = monthlyBudget; }
    public Map<String, Double> getCategories() { return categories; }
    public void setCategories(Map<String, Double> categories) { this.categories = categories; }
}
