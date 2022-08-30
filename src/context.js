import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('a');
const [cocktails, setCocktails] = useState([]);

const fetchDrinks = useCallback (async()=>{
  try {
    setLoading(true)
    const response = await fetch(`${url}${searchTerm}`)
    //here we are setting the 'setSearchterm' beside the url because it will always change according to what we type in the input and whatever valuw it is will be attatched to the url to show us that particular ciocktail we're searching for
    const data =await response.json()
    console.log(data);
    const {drinks} = data;
    if (drinks){
      const newCocktails = drinks.map((item)=>{
        const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass,} = item
        return{
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        }
      })
      setCocktails(newCocktails)
    }
    else {
      setCocktails([])
    }
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}, [searchTerm])
//we're setting loading to true again becuase we will use it multiple times (everytime something is typed in thee input)

useEffect(()=>{
  fetchDrinks()
}, [searchTerm, fetchDrinks])


  return <AppContext.Provider 
  value = {{
    loading,
    cocktails,
    setSearchTerm,
  }} 
  >
    {children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }



//WHY WE USED THE USECALLBACK

//I got an error message saying that i didn't add fetchDrinks to my dependency. But I know that ifc I do that, I'll get an infinite loop because the fetchdrinks function the way it was set up gets created everytime. Also inside nof the function, the cocktails statevalue is changed everytime hence the infinite loop.
//so we use the usecall back to tell the program that the fetchDrinks should be created from the scratch only when the search term changes. If it doesnt chanmge, do not create it from the scratch. We can now add the searchTerm to the dependency array.