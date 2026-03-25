import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import LinkButton from '../../ui/LinkButton'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { getCart, clearCart } from './cartSlice'
import { getUsername } from '../user/userSlice'

function Cart() {
  const username = useSelector(getUsername)
  const cart = useSelector(getCart)
  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-300 border-b">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button type="primary" to="/order/new">
          Order Pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
