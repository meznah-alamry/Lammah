import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Row, Col, Image, Button, Container, Modal , Form} from "react-bootstrap";
import { GearFill } from 'react-bootstrap-icons';
import OneCardOfApointment from '../components/OneCardOfApointment'




export default function MyPage(props) {
    
    const  {_id} = props.auth.currentUser;

    const [userInformation, setUserInformation] = useState({});
    const [editProfile, setEditProfile] = useState({});
    const [apointments, setApointments] = useState([])





    //to show edit Modal
    const [show, setShow] = useState(false);


    //to show edit Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //take userinformation
    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/my-page/${_id}`)

            .then((res) => {
                setUserInformation(res.data.user_info)
                setEditProfile(res.data.user_info)
            //   console.log('res ', res.data.appointments[0].facility.images)
                setApointments(res.data.appointments)
            })


    }, [])



    //take change 
    const onChangeInput = (e) => {
        e.preventDefault();

        setEditProfile((previousProfile) => ({ ...previousProfile, [e.target.name]: e.target.value }))

    };

    //change user informaation 
    const onSubmit = () => {

        axios.put(`http://localhost:5000/api/user/${_id}`, editProfile)
        .then(res => console.log('from backend i recieved ', res))

        setShow(false);

    }

    //show all user aponintments
    const allApointment = apointments.map((apointment, index) => {
        return <OneCardOfApointment
            apointmentsDate={apointment.date}
            status={apointment.status}
            apointmentId={apointment._id}
           facilityName={apointment.facility.name }
           facilityImage = {apointment.facility.images}
        />
    })



    return (
        <>

            <Container className="pt-5"  >
                <Row>
                    <Col xs={4} xl={3} md={4}>
                        <Image src="" width="100%" />
                    </Col>
                    <Col xs={4} xl={6} md={4}>
                        <h4 style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }}> Name :  {userInformation.name}  </h4>
                        <h4 style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }}> Email :  {userInformation.email} </h4>
                        <h4 style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }}> Phone :  {userInformation.phone} </h4>

                    </Col>
                    <Col className="pt-5" >
                        <Button onClick={handleShow} variant="white">
                            <GearFill color="" size={45} />
                        </Button>
                    </Col>
                </Row>
                <hr />
                <Row className="justify-content-md-center">
                    <h1 style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }}> All Apointments </h1>
                </Row>
                <Row>
                {allApointment}

                </Row>
            </Container>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title  style={{ fontSize:"23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}>Edit Your Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Col}>
                    <h4 style={{ fontSize:"23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Name : </h4>
                        <Form.Control name="name"
                           onChange={(e) => onChangeInput(e)} 
                           defaultValue={userInformation.name}
                           type="text" />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <h4 style={{ fontSize:"23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Email : </h4>
                        <Form.Control 
                        name="email" 
                        onChange={(e) => onChangeInput(e)} 
                        defaultValue={userInformation.email}
                        type="text" />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <h4 style={{fontSize:"23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Phone : </h4>
                        <Form.Control name="phone" 
                        onChange={(e) => onChangeInput(e)} 
                        defaultValue={userInformation.phone}
                        type="text" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={(e) => onSubmit(e)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
