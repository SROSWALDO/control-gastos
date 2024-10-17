import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)

  const { dispatch, state, disponible } = useBudget()

  useEffect(() => {
    if(state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }

  },[state.editingId])


  const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name] : isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value : Value) => {
    setExpense({
      ...expense,
      date: value
    })

  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // validar
    if(Object.values(expense).includes('')) {
      setError("Todos los campos son obligatorios")
      return
    }

    //! validar que no me pase
    if(expense.amount - previousAmount > disponible) {
      setError('Ese gasto se sale del presupuesto')
      return
    }

    //? Agregar o actualizar el gasto
    if(state.editingId) {
      dispatch({ type: 'updated-expense', payload: {expense: { id: state.editingId, ...expense }} })
    } else {
      dispatch({type: 'add-expense', payload: { expense }})
    }

    

    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setPreviousAmount(0)

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 py-2  border-blue-500">
        {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Anade el Nombre del gasto"
          className="bg-slate-200 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Anade la cantidad del gasto: ej.300"
          className="bg-slate-200 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select onChange={handleChange} value={expense.category} name="category" id="category" className="bg-slate-100 p-2">
          <option value="">-- Seleccione --</option>
          {categories.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker value={expense.date} onChange={handleChangeDate}
        className="bg-slate-100 p-2 border-0"
        />
      </div>

      <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={state.editingId ? "Guardar Cambios" : "Nuevo Gasto"} />

    </form>
  );
}
