import { Header } from '../components/Header';
import './NotFoundPage.css';

const NotFoundPage = ({ cart }) => {
  return (
    <>
      <Header cart={cart} />
      <div className="error-page-w">
        <h2>404</h2>
        <h3>Page Not Found</h3>
      </div>
    </>
  );
};

export default NotFoundPage;
