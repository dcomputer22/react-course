import { Header } from '../components/Header';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="error-page-w">
        <h2>404</h2>
        <h3>Page Not Found</h3>
      </div>
    </>
  );
};

export default NotFoundPage;
