import { useState } from 'react'

function todayISO(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)}

export default function ExpenseForm({onAdd}){
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState('Food')
  const [date,setDate]=useState(todayISO())
  const [note,setNote]=useState('')

  const submit=e=>{e.preventDefault(); if(!amount||!category||!date) return; onAdd({amount:parseFloat(amount),category,date,note}); setAmount(''); setCategory('Food'); setDate(todayISO()); setNote('')}

  return (
    <form onSubmit={submit} className='space-y-3'>
      <div className='text-lg font-semibold'>Add Expense</div>
      <input className='input' type='number' placeholder='Amount ₹' value={amount} onChange={e=>setAmount(e.target.value)} />
      <select className='select' value={category} onChange={e=>setCategory(e.target.value)}>
        <option>Food</option><option>Transport</option><option>Bills</option><option>Books</option><option>Entertainment</option><option>Groceries</option><option>Health</option><option>Other</option>
      </select>
      <input className='input' type='date' value={date} onChange={e=>setDate(e.target.value)} />
      <input className='input' type='text' placeholder='Note' value={note} onChange={e=>setNote(e.target.value)} />
      <button className='btn btn-primary w-full' type='submit'>Add</button>
    </form>
  )
}
