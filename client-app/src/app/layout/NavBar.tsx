import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";



export default function NavBar() {

    return(
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as={NavLink} exact to="/">
                <img src="./assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
            </Menu.Item>  
            <Menu.Item name='Activities'as={NavLink} to='/activities'/>  
            <Menu.Item name='Errors'as={NavLink} to='/errors'/>  
            <Menu.Item>
                <Button
                    positive 
                    content="Create Activity"
                    as={NavLink} to='/createActivity' />
            </Menu.Item>  
        </Container>
    </Menu>
    )
}