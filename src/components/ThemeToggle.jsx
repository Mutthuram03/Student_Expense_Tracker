export default function ThemeToggle({theme,setTheme}){
  return (
    <button className='btn' onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
      {theme==='dark'?'Light':'Dark'}
    </button>
  )
}
