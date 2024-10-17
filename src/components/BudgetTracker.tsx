
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"


export default function BudgetTracker() {

  const { state, totalExpenses, disponible, dispatch } = useBudget()

  const percentaje = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar value={percentaje} styles={buildStyles({
              pathColor: percentaje === 100 ? '#dc2626' : '#3b82f6',
              trailColor: '#F5F5F5',
              textSize: 8,
              textColor: percentaje === 100 ? '#dc2626' : '#3b82f6'
            })}
            text={`${percentaje}% Gastado`}
             />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button onClick={() => dispatch({ type: 'reset-app' })} type="button" className="bg-pink-600 w-full p-2 font-bold uppercase text-white">Resetear App</button>

            <AmountDisplay label="Presupuesto" amount={state.budget} />

            <AmountDisplay label="Disponible" amount={disponible} />

            <AmountDisplay label="Gastado" amount={totalExpenses} />

        </div>
      
    </div>
  )
}
