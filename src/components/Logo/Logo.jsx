import './Logo.scss';
import logoSrc from './logo.svg';
import { useNavigate } from 'react-router-dom';

function Logo({ className, href, ...props }) {
  const navigate = useNavigate();
  return (
    <div
      className={className ? className : 'logo'}
      {...props}
      onClick={() => navigate('/')}>
      <img src={logoSrc} alt="Логотип компании" className="logo__pic" />
    </div>
  );
}

export default Logo;