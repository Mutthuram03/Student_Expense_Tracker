import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

function toYM(s){return s.slice(0,7)}

export default function ExpenseCharts({items}){
  const byCategory = items.reduce((m,x)=>{m[x.category]=(m[x.category]||0)+x.amount; return m},{}) 
  const byMonthRaw = items.reduce((m,x)=>{const k=toYM(x.date); m[k]=(m[k]||0)+x.amount; return m},{}) 
  const months = Object.keys(byMonthRaw).sort()
  const monthTotals = months.map(k=>byMonthRaw[k])

  return (
    <div className='grid md:grid-cols-2 gap-4'>
      <div>
        <div className='text-lg font-semibold mb-2'>By Category</div>
        <Pie data={{labels:Object.keys(byCategory),datasets:[{data:Object.values(byCategory),backgroundColor:['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#84cc16','#f97316']} ]}} />
      </div>
      <div>
        <div className='text-lg font-semibold mb-2'>By Month</div>
        <Bar data={{labels:months,datasets:[{data:monthTotals,backgroundColor:'#3b82f6'}]}} options={{scales:{y:{beginAtZero:true}}}}/>
      </div>
    </div>
  )
}
