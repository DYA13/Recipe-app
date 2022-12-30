import './App.css';
import { useEffect, useState } from "react";
import video from "./food.mp4";
import MyRecipesComponent from './MyRecipesComponent';



function App() {

const MY_ID = "3b347855";
const MY_KEY = "8507efa972d9c56090fad75700f92672";


const [mySearch, setMySearch] =useState('');
const [myRecipes,setMyRecipes] = useState([]);
const [wordSubmitted, setWordSubmitted] =useState('avocado');


useEffect(() => {
getData();
}, [wordSubmitted])

async function getData() {
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
  const data = await response.json();

  setMyRecipes(data.hits);
}

 const myRecipeSearch = (e) => {
  
    setMySearch(e.target.value)
 }
 const finalSearch=(e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
 }



  return (
    <div className="App">
  
 <div className='container'>
 <video autoPlay muted loop>
  <source src={video}  type="video/mp4" />
 </video>

 <h1>Find a Recipe</h1>
 </div>


 <div className='container'>
<form onSubmit={finalSearch}>
    <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}>
    </input>
</form>
 </div>



 <div className='container'>
    <button>
        <img src='https://img.icons8.com/emoji/512/cooking-pot-emoji.png'  className='icon' alt='icon'/>
    </button>
 </div>


 {myRecipes.map((element,id) => (
    <MyRecipesComponent key={id}
    label={element.recipe.label} 
    image={element.recipe.image} 
    calories={element.recipe.calories}
     ingredients={element.recipe.ingredientLines}   
    />
 
 ))}

 </div>
  );
}

export default App;
