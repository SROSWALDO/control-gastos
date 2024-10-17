import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContent"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    return context
}