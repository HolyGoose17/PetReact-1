import logo from './logo.svg';
import './App.css';

export const Layout = (props) => {
  const {title} = props
  return (
  <div>
    <ul>
      <li>{title}</li>
      <li>Логин</li>
      <li>Пароль</li>
    </ul>
  </div>
  )
}

export default Layout;
