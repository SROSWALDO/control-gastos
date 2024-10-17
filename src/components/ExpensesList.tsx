import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpensesList() {

    const { state } = useBudget()

  return (
    <div className="mt-10">
        {state.expenses.length === 0 ?
        <p className="text-gray-600-2xl font-bold">No hay Gastos</p> : (
            <>
            <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
            {state.expenses.map(expense => (
                <ExpenseDetail key={expense.id} expense={expense} />
            ))}
            </>
        )
        }
      
    </div>
  )
}
