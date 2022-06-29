import * as React from "react";
import StoryNav from "./StoryNav";
import {Col, Container, Row} from "react-bootstrap";
import QuestLog from "./QuestLog";
import {useEffect} from "react";
import {backendStateActions} from "../state/backend-state";

const App: React.FC = () => {
    const backendStateActionsFnc = backendStateActions();

    useEffect(()=> {
        backendStateActionsFnc.isIdentityAuthenticated().then()
    }, [])

    return (
        <>
        <StoryNav></StoryNav>
        <Container>
            <Row>
                <Col>
                    <QuestLog></QuestLog>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default App