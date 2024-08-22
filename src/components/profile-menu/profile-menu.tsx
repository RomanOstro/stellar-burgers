import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutQuery } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutQuery()).then(() => navigate('/'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
