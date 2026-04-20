import { Link } from 'react-router';

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/login">Go to Login</Link>
    </>
  );
};
