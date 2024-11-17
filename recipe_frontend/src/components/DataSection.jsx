import '../css/DataSection.css'
import RecipeDetails from "./RecipeDetail.jsx"
import React, { useEffect, useState } from "react";


//importing all recipe
import AllRecipe from "./AllRecipe.jsx"
export default function DataSection({homeSearch}){
  const [showData,setShowData] = useState(true);


    return(
        <div className='datasection'>
            
<AllRecipe homeSearch={homeSearch}/>
        </div>
    )
}