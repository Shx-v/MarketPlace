import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import { TopNav } from './top-nav';
import { useMobileNav } from './use-mobile-nav';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100%',
}));

export const Layout = (props) => {
  const { children } = props;
  const mobileNav = useMobileNav();

  return (
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      <LayoutRoot>{children}</LayoutRoot>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
