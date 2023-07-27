import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { mobile } from '../responsive';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
        height : 50px;
        background-color : #B39CD0; 
        ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
        padding : 10px 20px;
        display : flex;
        align-items : center;
        justify-content : space-between;
        ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
        flex : 1;
        display : flex;
        align-items : center;
`
const SearchContainer = styled.div`
        border : 1px solid gray;
        display : flex;
        align-items : center;
        margin-left : 25px;
        padding : 5px;
`

const Input = styled.input`
       border : none;
       background-color : #B39CD0; 
       ${mobile({ width: "50px" })}
`

const Center = styled.div`
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : center;
`
const Logo = styled.h1`
        font-weight : bold;
        ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
        flex : 1;
        display : flex;
        align-items : center;
        justify-content : flex-end;
        ${mobile({ flex: 2, justifyContent: "center" })}
`

const MenuItem = styled.div`
        font-size : 17px;
        cursor : pointer;
        margin-left : 25px;
        ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {
        const quantity = useSelector(state=>state.cart.quantity);
  return (
    <Container>
        <Wrapper>
            <Left>
                <SearchContainer>
                    <Input placeholder="Search" />
                    <SearchIcon style={{ color: "purple", fontSize: 16 }}/>
                </SearchContainer>
            </Left>
            <Center>
                <Logo>Cool</Logo>
                <FlutterDashIcon/>
            </Center>
            <Right>
            <Link to="/register"><MenuItem>Register</MenuItem></Link>
            <Link to="/login"><MenuItem>Sign In</MenuItem></Link>
                <Link to="/cart">
                 <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartIcon />
                        </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
