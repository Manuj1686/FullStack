package com.pocketwise.model;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Document(collection = "expenses")
public class Expense {
    @Id
    private String id;
    private String ownerEmail;
    @NotBlank
    private String description;
    @NotBlank
    private String category;
    @NotNull
    @Positive
    private Double amount;
    @NotNull
    private LocalDate date;

    public Expense() {}
    public Expense(String description, String category, Double amount, LocalDate date) {
        this.description = description; this.category = category; this.amount = amount; this.date = date;
    }
    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
