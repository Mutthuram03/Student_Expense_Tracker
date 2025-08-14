import { useEffect, useMemo, useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseFilters from './components/ExpenseFilters.jsx'
import ExpenseTable from './components/ExpenseTable.jsx'
import ExpenseCharts from './components/ExpenseCharts.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import HeaderStat from './components/HeaderStat.jsx'

function ym(d){return d.slice(0,7)}
function todayISO(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}

export default function App(){
  const [expenses,setExpenses]=useState(()=>JSON.parse(localStorage.getItem('expenses_v3')||'[]'))
  const [budgets,setBudgets]=useState(()=>JSON.parse(localStorage.getItem('budgets_v1')||'{}'))
  const [filters,setFilters]=useState({category:'',start:'',end:'',note:''})
  const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});

  const currentMonth=useMemo(()=>new Date().toISOString().slice(0,7),[])
  const budgetCurrent=budgets[currentMonth]||0
  const spentCurrent=useMemo(()=>expenses.filter(e=>ym(e.date)===currentMonth).reduce((s,e)=>s+Number(e.amount||0),0),[expenses,currentMonth])
  const remainingCurrent=budgetCurrent - spentCurrent

  const addExpense=e=>setExpenses([...expenses,{...e,id:Date.now()}])
  const updateExpense=(id,data)=>setExpenses(expenses.map(x=>x.id===id?{...data,id}:x))
  const deleteExpense=id=>setExpenses(expenses.filter(x=>x.id!==id))
  const clearAll=()=>{if(confirm('Clear all expenses?'))setExpenses([])}

  const applyFilters=list=>list.filter(x=>{
    if(filters.category && x.category!==filters.category) return false
    if(filters.start && x.date<filters.start) return false
    if(filters.end && x.date>filters.end) return false
    if(filters.note && !(x.note||'').toLowerCase().includes(filters.note.toLowerCase())) return false
    return true
  })

  const filtered=applyFilters(expenses)

  const setBudgetForCurrent=val=>setBudgets({...budgets,[currentMonth]:Number(val)||0})

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
      <header className='sticky top-0 z-20 header-glass bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <div className='h-9 w-9 rounded-xl bg-blue-600'></div>
            <h1 className='text-xl font-bold'>Student Expense Tracker</h1>
          </div>
          <div className='flex items-center gap-3'>
            <HeaderStat label={'This Month'} value={`₹${remainingCurrent.toFixed(2)} left`} sub={`of ₹${budgetCurrent.toFixed(2)}`} positive={remainingCurrent>=0} />
            <input type='number' className='input w-40' value={budgetCurrent} onChange={e=>setBudgetForCurrent(e.target.value)} placeholder='Budget ₹' />
            <ThemeToggle theme={theme} setTheme={setTheme}/>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-4'>
        <div className='space-y-4 lg:col-span-1'>
          <div className='card p-4'>
            <ExpenseForm onAdd={addExpense}/>
          </div>
          <div className='card p-4'>
            <ExpenseFilters filters={filters} setFilters={setFilters} clearAll={clearAll}/>
          </div>
        </div>
        <div className='space-y-4 lg:col-span-2'>
          <div className='card p-0 overflow-hidden'>
            <ExpenseTable items={filtered} onDelete={deleteExpense} onUpdate={updateExpense}/>
          </div>
          <div className='card p-4'>
            <ExpenseCharts items={filtered}/>
          </div>
        </div>
      </main>
      <footer className='max-w-7xl mx-auto px-4 pb-6 text-sm text-gray-500 dark:text-gray-400'>
        Built with React, Vite, Tailwind, Chart.js
      </footer>
    </div>
  )
}
