import * as React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect} from "react";
import {useAuthActions} from "../state/auth-auctions";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authenticatedStateAtom, hasInternetIdentityAtom} from "../state/atoms";
import {backendStateActions} from "../state/backend-state";


const StoryNav: React.FC = () => {
    const authActions = useAuthActions();
    const authenticatedState = useRecoilValue(authenticatedStateAtom);

    async function login() {
        await authActions.login();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">ICP StoryMode</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Quests</Nav.Link>
                        <Nav.Link href="#pricing">Leaderboard</Nav.Link>
                        <Nav.Link href="#pricing">Rewards</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} onClick={login} href="#identity" className={authenticatedState ? "text-success" : "text-danger"}>
                            Internet Identity
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default StoryNav