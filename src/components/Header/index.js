import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineMenuFold} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import './index.css'

const tabItems = [
  {id: 'home', displayText: 'Home'},
  {id: 'vaccination', displayText: 'Vaccination'},
  {id: 'about', displayText: 'About'},
]
const Header = props => {
  const [isClicked, setIsClicked] = useState(false)
  const onClickHomeIcon = () => {
    setIsClicked(true)
  }

  const onClickCancelIcon = () => {
    setIsClicked(false)
  }

  const {activeTabId} = props

  return (
    <>
      <nav className="navbar">
        <div className="mobile-view">
          <Link to="/" className="link-item">
            <div className="mobile-logo">
              <h1 className="covid-name">COVID19</h1>
              <h1 className="india-name">INDIA</h1>
            </div>
          </Link>
          <AiOutlineMenuFold className="home-icon" onClick={onClickHomeIcon} />
        </div>

        <div className="desktop-view">
          <Link to="/" className="link-item">
            <div className="desktop-logo">
              <p className="covid-name">
                COVID19<span className="india-name">INDIA</span>
              </p>
            </div>
          </Link>
          <ul className="icons-2">
            <Link
              to="/"
              className={
                activeTabId === tabItems[0].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>Home</li>
            </Link>
            <Link
              to="/vaccination"
              className={
                activeTabId === tabItems[1].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>Vaccination</li>
            </Link>
            <Link
              to="/about"
              className={
                activeTabId === tabItems[2].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>About</li>
            </Link>
          </ul>
        </div>
      </nav>
      {isClicked ? (
        <div className="navbar-below-mobile">
          <div className="mobile-below">
            <Link
              to="/"
              className={
                activeTabId === tabItems[0].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>Home</li>
            </Link>
            <Link
              to="/vaccination"
              className={
                activeTabId === tabItems[1].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>Vaccination</li>
            </Link>
            <Link
              to="/about"
              className={
                activeTabId === tabItems[2].id
                  ? 'link-item active-class-name'
                  : 'link-item'
              }
            >
              <li>About</li>
            </Link>
          </div>
          <ImCancelCircle className="cancel-icon" onClick={onClickCancelIcon} />
        </div>
      ) : null}
    </>
  )
}
export default withRouter(Header)
