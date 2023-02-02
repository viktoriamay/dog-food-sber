import './Logo.css';
import logoSrc from './logo.svg'

function Logo({className, href, ...props}) {
  return (
    <a href='/' className={className ? className : "logo"} {...props} >
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    </a>
  )
}

export default Logo;