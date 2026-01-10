import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend(show => !show)
    setSelectedFriend(null)
  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend(curr => (curr?.id === friend.id ? null : friend))
    setShowAddFriend(false)
  }

  function handleSplitBill(value) {
    console.log(selectedFriend.balance + value)

    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
  }

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList
          friends={friends}
          onSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          friends={friends}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

function FriendList({ friends, onSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends &&
        friends.map(friend => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelectedFriend={onSelectedFriend}
            selectedFriend={selectedFriend}
          />
        ))}
    </ul>
  )
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectedFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')

  const id = crypto.randomUUID()

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }

    onAddFriend(newFriend)

    setName('')
    setImage('https://i.pravatar.cc/48')
  }
  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>👤 Friend Name</label>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input
        type='text'
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('')
  const [expense, setExpense] = useState('')
  const [whoPays, setWhoPays] = useState('user')

  function handleSubmitBill(e) {
    e.preventDefault()
    if (!bill || !expense) return

    const difference = bill / 2 - (bill - expense)
    onSplitBill(Number(difference))
  }
  return (
    <form className='form-split-bill' onSubmit={handleSubmitBill}>
      <h2>Split bill with {selectedFriend.name}</h2>

      <label>🧾 Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />
      <label>🫵 Your expense</label>
      <input
        type='text'
        value={expense}
        onChange={e =>
          setExpense(
            Number(e.target.value) > bill ? expense : Number(e.target.value)
          )
        }
      />
      <label>👥 {selectedFriend.name}'s expense</label>
      <input disabled type='text' value={bill - expense} />
      <label>💰 Who's paying the bill?</label>
      <select value={whoPays} onChange={e => setWhoPays(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className='button'>
      {children}
    </button>
  )
}

export default App
