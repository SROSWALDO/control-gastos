import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {
  const [budget, setBudget] = useState(0);

  const { dispatch } = useBudget()

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)

  };

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0

  },[budget])

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'add-budget', payload: {budget} })

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label className="text-4xl text-blue-600 font-bold text-center">
          Definir Presupuesto
        </label>
        <input
          type="number"
          name="budget"
          id="budget"
          onChange={handleChange}
          value={budget}
          className="w-full bg-white border border-gray-300 rounded p-2"
          placeholder="Define tu presupuesto"
        />
      </div>

      <input
        type="submit"
        value="Definir Presupuesto"
        disabled={isValid}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase w-full p-2 cursor-pointer disabled:opacity-50"
      />
    </form>
  );
}
