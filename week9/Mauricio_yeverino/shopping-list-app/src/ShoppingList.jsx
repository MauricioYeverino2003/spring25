const shoppingList = ({ shoppingList, removeItem, budget}) => {

  return (
    <>
        { <h2>Remaining Budget: ${budget.toFixed(2)}</h2> }
        {shoppingList.map((val, index) => (
            <div
                className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
                key={index}
            >
                <span>{`$ ${val.cost.toFixed(2)} `}</span>
                <span>{val.name}</span>
                <span>
                    <button className='btn' onClick={removeItem} value={val.name}>x</button>
                </span>
            </div>
        ))}
    </>
  )
}

export default shoppingList