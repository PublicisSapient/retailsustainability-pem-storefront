// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { get } from 'http';
import styles from './app.module.scss';
import ListingWrapper from './pages/listingWrapper';
import ProductDetailWrapper from './pages/productDetailWrapper';
import { Route, Routes, useParams } from 'react-router-dom';

export function App() {
  const params = useParams();

  const getPage = () => {
    if (params.path === 'shop' || params.path === 'search') {
      return <ListingWrapper />;
    } else {
      return <ProductDetailWrapper />;
    }
  };
  return <>{getPage()}</>;
}

export default App;
