export default function HeaderStat({label,value,sub,positive}){
  return (
    <div className={'px-3 py-2 rounded-xl border '+(positive?'border-green-500 text-green-600':'border-red-500 text-red-600')}>
      <div className='text-xs opacity-70'>{label}</div>
      <div className='text-lg font-semibold'>{value}</div>
      <div className='text-xs opacity-70'>{sub}</div>
    </div>
  )
}
