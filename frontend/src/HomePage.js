// frontend/src/HomePage
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';

function HomePage() {
  return (
  <div className='main_class'>
    <div className='inner_class'>
      <form>
        <h3 className='title'>ברוכים הבאים!</h3>
    <div className='text-center'>
      <Link to="/registerPage" className='btn btn-primary mt-3 mr-2'> הכנס עובד חדש </Link>
    </div>
    <div className='text-center'>
      <Link to="/taskPage" className='btn btn-primary mt-3 mr-2'> שלח מייל חדש </Link>
    </div>
      </form>
    </div>
  </div>
  )
};

export default HomePage;