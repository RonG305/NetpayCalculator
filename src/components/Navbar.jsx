import { menuItems } from "../assets/menuItems"

const Navbar = () => {
  return (
      <div>
         
          <ul className=" flex items-center justify-between bg-slate-300 px-4 py-6">
          {menuItems.map((link, index) => (
              <li key={index}>{ link.title}</li>
              
            ))}
             
          </ul>
    </div>
  )
}

export default Navbar
