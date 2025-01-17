import "../css/header.css";
import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const handleClickBtn = (e) => {
        console.log(e.target.id);
        switch(e.target.id){
            case "Info":
                navigate("/Info");
                break;
            case "Shop":
                navigate("/Shop");
                break;
            case "Gallary":
                navigate("/Gallary");
                break;
            case "Logo":
                navigate("/Shop");
                break;
            case "Account":
                navigate("/LogIn");
                break;
            case "Cart":
                navigate("/Cart");
                break;
            case "Saerch":
                navigate("/Search");
                break;
            default:
                break;
        }
    }
    return (
        <header>
            <div id="leftHeaderMenu">
                <ul>
                    <li id="Info" onClick={handleClickBtn}>Info</li>
                    <li id="Shop" onClick={handleClickBtn}>Shop</li>
                    <li id="Gallary" onClick={handleClickBtn}>Gallary</li>
                </ul>
            </div>
            <div id="logo">
                <img src="img/logo.png" alt="Logo" id="Logo" onClick={handleClickBtn}/>
            </div>
            <div id="rightHeaderMenu">
                <ul>
                    <li id="Account" onClick={handleClickBtn}>Account</li>
                    <li id="Cart" onClick={handleClickBtn}>Cart</li>
                    <li id="Search" onClick={handleClickBtn}>Search</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;