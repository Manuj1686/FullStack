package com.pocketwise.controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.pocketwise.model.Expense;
import com.pocketwise.model.Budget;
import com.pocketwise.repository.ExpenseRepository;
import com.pocketwise.repository.BudgetRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final ExpenseRepository expenses;
    private final BudgetRepository budgets;
    public DashboardController(ExpenseRepository expenses, BudgetRepository budgets) {
        this.expenses = expenses; this.budgets = budgets;
    }

    @GetMapping
    public Map<String, Object> dashboard(@RequestParam(required = false) String month, Authentication auth) {
        YearMonth ym = month == null ? YearMonth.now() : YearMonth.parse(month);
        List<Expense> monthExpenses = expenses.findByOwnerEmailAndDateBetweenOrderByDateAsc(auth.getName(), ym.atDay(1), ym.atEndOfMonth());
        double total = monthExpenses.stream().mapToDouble(e -> e.getAmount() == null ? 0 : e.getAmount()).sum();
        Map<String, Double> categoryTotals = monthExpenses.stream().collect(Collectors.groupingBy(
            Expense::getCategory, Collectors.summingDouble(e -> e.getAmount() == null ? 0 : e.getAmount())));
        Budget budget = budgets.findById(auth.getName()).orElseGet(Budget::new);
        int elapsed = Math.max(1, Math.min(LocalDate.now().getDayOfMonth(), ym.lengthOfMonth()));
        double forecast = total / elapsed * ym.lengthOfMonth();
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("month", ym.toString());
        result.put("monthlyBudget", budget.getMonthlyBudget());
        result.put("totalSpent", total);
        result.put("remaining", budget.getMonthlyBudget() - total);
        result.put("categoryTotals", categoryTotals);
        result.put("forecast", Math.round(forecast * 100.0) / 100.0);
        result.put("overBudgetForecast", forecast > budget.getMonthlyBudget());
        result.put("transactionCount", monthExpenses.size());
        return result;
    }
}
