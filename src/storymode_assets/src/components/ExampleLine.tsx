import * as React from "react";
import {Modal, Button, ListGroup, Image} from "react-bootstrap";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {hasInternetIdentityAtom} from "../state/atoms";

const ExampleLine: React.FC = (props, context) => {
    const [showState, setShowState] = useState(false);
    const hasInternetIdentity = useRecoilValue(hasInternetIdentityAtom);


    function showInternetIdentityTutorial() {
        setShowState(true);
    }
    function handleClose() {
        setShowState(false);
    }

    return (
        <>
            <ListGroup.Item disabled={hasInternetIdentity} className={hasInternetIdentity ? "text-success" : ""} action onClick={showInternetIdentityTutorial}>Make your first internet identity - 100</ListGroup.Item>
            <Modal show={showState} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tutorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ol>
                        <li>
                            Click on navigation link Internet Identity
                            <Image width={"300px"} src={"nav-bar-img.png"}/>
                        </li>
                        <li>
                            Click on Create an Internet Identity Anchor
                            <Image src={"internet-identity-img.png"}/>
                        </li>
                        <li>
                            Give your device a name
                        </li>
                        <li>
                            Save the identity anchor, this is your username
                        </li>
                        <li>
                            Save the seed phrase somewhere safe, this is your private wallet address
                        </li>
                        <li>Profit!!!</li>
                    </ol>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExampleLine;