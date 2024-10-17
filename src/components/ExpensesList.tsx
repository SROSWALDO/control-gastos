import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpensesList() {

    const { state } = useBudget()

    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
        {filteredExpenses.length === 0 ?
        <p className="text-gray-600-2xl font-bold">No hay Gastos</p> : (
            <>
            <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
            {filteredExpenses.map(expense => (
                <ExpenseDetail key={expense.id} expense={expense} />
            ))}
            </>
        )
        }
      
    </div>
  )
}
