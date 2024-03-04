import {
  CandidateIcon,
  DashboardIcon,
  DoorIcon,
  RoleIcon,
  SettingIcon,
  InfoIcon,
  ChatIcon,
} from '@/components/common/svgIcons/Icons';
import {
  BodyLMedium,
  BodyMMedium,
} from '@/components/common/typeScale/StyledTypeScale';
import { type ReactElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import SideNavBarDropdown from './SideNavBarDropdown';
import {
  DropWrapper,
  NavButton,
  NavButtonDiscord,
  Spacer,
  StyledSideNavBarTitle,
  StyledSideNavLinksWrap,
  StyledStack,
} from './StyledSideNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { resetUserState } from '@/features/authentication/authenticationSlice';
import { resetCurrentWorkspace } from '@/features/workspace/userWorkspaceSlice';
import ProfileCard from './profieCard/ProfileCard';
import discordImage from '@/assets/svg/Discord.svg';
import { Divider, Stack } from '@mui/material';
export interface INavButtonLink {
  to: string;
  icon: JSX.Element;
  text: string;
  onClick?: () => void;
}

const navButtonLinks: INavButtonLink[] = [
  {
    text: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    text: 'Templates',
    to: '/templates',
    icon: <RoleIcon />,
  },
  {
    text: 'Interviews',
    to: '/interviews',
    icon: <CandidateIcon />,
  },
  {
    text: 'Questions',
    to: '/questionbank',
    icon: <ChatIcon />,
  },
  {
    text: 'Notifications',
    to: '/Notifications',
    icon: <InfoIcon />,
  },
];

const navConfigLinks: INavButtonLink[] = [
  {
    text: 'Settings',
    to: '/settings',
    icon: <SettingIcon />,
  },
  {
    text: 'Logout',
    to: '#',
    icon: <DoorIcon />,
  },
];

const SideNavBar = (): ReactElement => {
  const { user } = useSelector((state: RootState) => state.user);
  let location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [, , removeCookie] = useCookies(['refresh_token', 'access_token']);
  const navigate = useNavigate();
  const args = {
    optionArr: user.companies.map((company) => ({
      id: company.id,
      name: company.name,
      value: company.name,
    })),
    dropdownName: 'Workspace',
    dropdownIconVisible: true,
  };

  const handleNavConfigClick = (text: string) => {
    if (text === 'Logout') {
      localStorage.removeItem('AuthStatus');
      removeCookie('access_token');
      removeCookie('refresh_token');
      dispatch(resetUserState());
      dispatch(resetCurrentWorkspace());
      navigate('/login');
    }
  };

  return (
    <StyledStack
      className="p-top-4"
      direction="column"
      alignItems="flex-start"
      spacing={2}
    >
      <StyledSideNavLinksWrap>
        <DropWrapper>
          <SideNavBarDropdown {...args} />
        </DropWrapper>
      </StyledSideNavLinksWrap>

      <StyledSideNavLinksWrap>
        <StyledSideNavBarTitle style={{ opacity: '0.5' }}>
          Pages
        </StyledSideNavBarTitle>
        {navButtonLinks.map((navButtonLink: INavButtonLink, index: number) => (
          <NavButton
            direction="row"
            key={index}
            className={
              (location.pathname === '/' &&
                navButtonLink.to === '/dashboard') ||
              location.pathname.startsWith(navButtonLink.to)
                ? 'active'
                : ''
            }
          >
            <Link to={navButtonLink.to} className="link">
              {navButtonLink.icon}
              <BodyMMedium className=" text-sm leading-tight font-medium ">
                {navButtonLink.text}
              </BodyMMedium>
            </Link>
          </NavButton>
        ))}
      </StyledSideNavLinksWrap>

      <StyledSideNavLinksWrap>
        <StyledSideNavBarTitle style={{ opacity: '0.5' }}>
          Config
        </StyledSideNavBarTitle>
        {navConfigLinks.map((navConfigLink: INavButtonLink, index: number) => (
          <NavButton
            direction="row"
            key={index}
            className={location.pathname === navConfigLink.to ? 'active' : ''}
          >
            <Link
              to={navConfigLink.to}
              onClick={() => handleNavConfigClick(navConfigLink.text)}
              className="link"
            >
              {navConfigLink.icon}
              <BodyMMedium>{navConfigLink.text}</BodyMMedium>
            </Link>
          </NavButton>
        ))}
      </StyledSideNavLinksWrap>
      <Spacer />
      <a
        href="https://discord.gg/u8F6SQ7V"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <NavButtonDiscord style={{ paddingLeft: '0px' }}>
          <Stack
            direction={'row'}
            alignItems={'flex-start'}
            sx={{ textAlign: 'flex-end', marginLeft: '8px' }}
            spacing={1}
          >
            <img
              src={discordImage}
              alt="logo"
              style={{
                height: '24px',
                width: '24px',
                borderRadius: '6px',
                marginRight: '2px',
                marginTop: '0px',
              }}
            ></img>
            <BodyMMedium>Join Discord </BodyMMedium>
          </Stack>
        </NavButtonDiscord>
      </a>
      <Divider variant="middle" style={{ marginLeft: '0px', width: '103%' }} />
      <ProfileCard />
    </StyledStack>
  );
};

export default SideNavBar;
