import { useNavigate } from "react-router-dom";
import { HeaderContainer, Link, Links, Title } from "./styles";

const Header = () => {

    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <Title onClick={() => navigate('/colheitas')}>Pomar</Title>
            <Links>
                <Link onClick={() => navigate('/colheitas')}>Colheitas</Link>
                <Link onClick={() => navigate('/arvores')}>Árvores</Link>
                <Link onClick={() => navigate('/grupos')}>Grupos</Link>
                <Link onClick={() => navigate('/especies')}>Espécies</Link>
            </Links>
        </HeaderContainer>
    )
}

export default Header;