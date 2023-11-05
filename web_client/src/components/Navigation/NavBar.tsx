import { ReactElement}  from 'react';
import Navbar from 'react-bootstrap/Navbar';


interface IProps {
}

const NavBar = (props: IProps): ReactElement => {
    return (
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand href="/admin">Admin</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">Mark Otto</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;