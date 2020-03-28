import React from "react";
import styled from "styled-components";

const Title = styled.h1``;

const Header = ({ children }) => (
  <header>
    <Title>{children}</Title>
  </header>
);
export default Header;
