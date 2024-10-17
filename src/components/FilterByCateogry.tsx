import React from 'react'
import { categories } from '../data/categories'
import { useBudget } from '../hooks/useBudget'

export default function FilterByCateogry() {

    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
    }

  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
      <form action="">
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
            <label htmlFor="category">Filtrar Gastos</label>
            <select onChange={handleChange} className='bg-slate-100 p-3 flex-1 rounded' id='category'>
                <option value="">-- Todas las categorias --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
      </form>
    </div>
  )
}
