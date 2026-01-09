export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className='stats'>
        <p>You have no items to pack.</p>
      </footer>
    )
  const numItems = items.length
  const packedItems = items.filter(item => item.packed).length
  const packedProgress = Math.round((packedItems / numItems) * 100)
  return (
    <footer className='stats'>
      <em>
        {packedProgress < 100
          ? `You have ${numItems} item(s) in your list and you've packed ${packedItems} (${
              packedProgress ? packedProgress : '0'
            })%`
          : `All ${numItems} have been packed! You're ready for your trip! ✈️`}
      </em>
    </footer>
  )
}
