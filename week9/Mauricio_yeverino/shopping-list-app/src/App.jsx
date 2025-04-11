import { useState } from 'react';
import './App.css'
import ShoppingList from './ShoppingList';


function App() {
   const [shoppingList, setShoppingList] = useState([]);
   const [budget, setBudget] = useState(100);


   const addItem = (event) => {
       event.preventDefault();
       let form = event.target;
       let formData = new FormData(form)
       let formDataObj = Object.fromEntries(formData.entries())
       formDataObj.purchased = false;
       formDataObj.cost = parseFloat(formDataObj.cost || 0);
       if(Number.isNaN(formDataObj.cost)){
        formDataObj.cost = 0
       }

       if(formDataObj.cost > budget){
        formDataObj.cost = 0
        formDataObj.name = "You can't afford it, you're broke lmao"
       }
       setShoppingList([...shoppingList, formDataObj])
       setBudget((prevBudget) => (prevBudget - formDataObj.cost))
       form.reset();
   }


   const removeItem = (event) => {
       const name = event.target.value;
       shoppingList.map((item) =>{
          if (item.name == name){
              const price = item.cost;
              setBudget((prevBudget) => (prevBudget + price))
          }
            return item;
       })
       setShoppingList(shoppingList.filter(item => item.name !== name));
   };


   return (
       <>
           <h1>Shopping List Manager</h1>
           <div className='card'>
               <form onSubmit={addItem} className='flex-apart'>
                   <input type="text" name="name" placeholder='Add item to list...' />
                   <input type="text" name="cost" placeholder='Add price' />
                   <button className='btn purple' type='submit'>Add</button>
               </form>
           </div>


           <ShoppingList
               shoppingList={shoppingList}
               removeItem={removeItem}
               budget={budget}
           />
       </>
   );
}


export default App;