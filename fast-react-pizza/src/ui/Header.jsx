import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="border-b border-stone-200 bg-yellow-500 px-4 py-3">
      <Link to="/" className="uppercase tracking-widest">
        Fact React Pizza Co.
      </Link>
      <Link to="/menu">Menu</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
