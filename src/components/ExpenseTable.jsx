import { useMemo, useState } from 'react'

export default function ExpenseTable({items,onDelete,onUpdate}){
  const [editId,setEditId]=useState(null)
  const [form,setForm]=useState({amount:'',category:'Food',date:'',note:''})

  const startEdit=item=>{setEditId(item.id); setForm({...item})}
  const cancelEdit=()=>{setEditId(null)}
  const saveEdit=()=>{onUpdate(editId,{...form,amount:parseFloat(form.amount)}); setEditId(null)}

  const sorted=useMemo(()=>[...items].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id),[items])

  const toCurrency=v=>Number(v).toFixed(2)

  const toCsv=rows=>{
    const lines=[['Date','Category','Amount','Note'].join(',')]
    rows.forEach(x=>lines.push([x.date,x.category,toCurrency(x.amount),x.note||''].map(s=>`"${String(s).replaceAll('"','""')}"`).join(',')))
    return lines.join('\n')
  }
  const download=(name,content)=>{const blob=new Blob([content],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)}

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between mb-3'>
        <div className='text-lg font-semibold'>All Expenses</div>
        <div className='flex items-center gap-2'>
          <span className='badge'>{sorted.length} items</span>
          <span className='badge'>₹{toCurrency(sorted.reduce((s,x)=>s+x.amount,0))}</span>
          <button className='btn' onClick={()=>download('expenses.csv',toCsv(sorted))}>Export CSV</button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr><th>Date</th><th>Category</th><th>Amount (₹)</th><th>Note</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {sorted.map(x=> editId===x.id ? (
            <tr key={x.id}>
              <td><input className='input' value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></td>
              <td>
                <select className='select' value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  <option>Food</option><option>Transport</option><option>Bills</option><option>Books</option><option>Entertainment</option><option>Groceries</option><option>Health</option><option>Other</option>
                </select>
              </td>
              <td><input className='input' type='number' value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></td>
              <td><input className='input' value={form.note||''} onChange={e=>setForm({...form,note:e.target.value})}/></td>
              <td className='space-x-2'><button className='btn btn-primary' onClick={saveEdit}>Save</button><button className='btn' onClick={cancelEdit}>Cancel</button></td>
            </tr>
          ):(
            <tr key={x.id}>
              <td>{x.date}</td><td>{x.category}</td><td>₹{toCurrency(x.amount)}</td><td>{x.note||'-'}</td>
              <td className='space-x-2'><button className='btn' onClick={()=>startEdit(x)}>Edit</button><button className='btn btn-danger' onClick={()=>onDelete(x.id)}>Delete</button></td>
            </tr>
          ))}
          {sorted.length===0 && <tr><td colSpan='5' className='text-center py-6 text-gray-500 dark:text-gray-400'>No expenses</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
