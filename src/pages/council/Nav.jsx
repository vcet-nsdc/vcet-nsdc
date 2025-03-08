import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Events', to: '/events' },
    { label: 'Team', to: '/team' },
    { label: 'Contact', to: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContainer>
        {/* Logo Image */}
        <LogoLink to="/">
          <LogoImage
            src="/img/logo.webp"  // Update this path to your actual logo path
            alt="VCET NSDC Logo"
          />
        </LogoLink>

        {/* Desktop Navigation - Always visible on larger screens */}
        <DesktopNavMenu>
          {navItems.map((item) => (
            <NavItem key={item.label}>
              <NavLink to={item.to}>
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </DesktopNavMenu>

        {/* Mobile Menu Toggle */}
        <MobileMenuToggle onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuToggle>

        {/* Mobile Sliding Menu */}
        <MobileNavMenu isOpen={isOpen}>
          {navItems.map((item) => (
            <MobileNavItem key={item.label}>
              <MobileNavLink
                to={item.to}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </MobileNavLink>
            </MobileNavItem>
          ))}
        </MobileNavMenu>
      </NavContainer>
    </Nav>
  );
};

// Styled Components
const Nav = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const LogoLink = styled(Link)`
  z-index: 110;
  position: relative;
`;

const LogoImage = styled.img`
  max-height: 50px;  // Adjust height as needed
  max-width: 150px;  // Adjust width as needed
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 40px;  // Smaller size on mobile
    max-width: 120px;
  }
`;

const DesktopNavMenu = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #9056f0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #9056f0;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuToggle = styled.button`
  color: white;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 120;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavMenu = styled.div`
  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    transition: right 0.3s ease-in-out;
    padding-top: 4rem;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavItem = styled.div`
  margin: 1rem 0;
`;

const MobileNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #9056f0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #9056f0;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default Navbar;
