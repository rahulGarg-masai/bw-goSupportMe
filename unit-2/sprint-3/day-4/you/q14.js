function evaluateEmployees(employees) {
    return employees
        .filter(emp => emp.tasksCompleted > 5)
        .map(emp => {
            const performance = emp.rating > 4.5 ? "Excellent" :
                                emp.rating >= 3 && emp.rating <= 4.5 ? "Good" :
                                "Needs Improvement";
            return { name: emp.name, performance };
        })
        .sort((a, b) => {
            const levels = { "Excellent": 1, "Good": 2, "Needs Improvement": 3 };
            return levels[a.performance] - levels[b.performance] || a.name.localeCompare(b.name);
        });
}

const employees = [
    { name: "Alice", tasksCompleted: 8, rating: 4.7 },
    { name: "Bob", tasksCompleted: 4, rating: 4.0 },
    { name: "Charlie", tasksCompleted: 6, rating: 3.5 },
    { name: "David", tasksCompleted: 10, rating: 4.9 },
    { name: "Eve", tasksCompleted: 7, rating: 2.8 }
];

console.log(evaluateEmployees(employees));
