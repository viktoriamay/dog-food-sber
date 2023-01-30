import './Logo.css';
import logoSrc from './logo.svg'
import { Link } from 'react-router-dom';

function Logo({className, href, ...props}) {
  return (
    <Link to={'/'} className={className ? className : "logo"} {...props}>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    </Link>
  )
}

export default Logo;