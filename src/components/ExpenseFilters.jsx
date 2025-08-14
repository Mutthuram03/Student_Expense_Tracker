export default function ExpenseFilters({filters,setFilters,clearAll}){
  const set=(k,v)=>setFilters({...filters,[k]:v})
  return (
    <div className='space-y-3'>
      <div className='text-lg font-semibold'>Filters</div>
      <select className='select' value={filters.category} onChange={e=>set('category',e.target.value)}>
        <option value=''>All Categories</option>
        <option>Food</option><option>Transport</option><option>Bills</option><option>Books</option><option>Entertainment</option><option>Groceries</option><option>Health</option><option>Other</option>
      </select>
      <input className='input' type='date' value={filters.start} onChange={e=>set('start',e.target.value)} />
      <input className='input' type='date' value={filters.end} onChange={e=>set('end',e.target.value)} />
      <input className='input' type='text' placeholder='Search note' value={filters.note} onChange={e=>set('note',e.target.value)} />
      <div className='flex gap-2'>
        <button className='btn w-full' onClick={()=>setFilters({category:'',start:'',end:'',note:''})}>Clear Filters</button>
        <button className='btn btn-danger w-full' onClick={clearAll}>Clear All</button>
      </div>
    </div>
  )
}
