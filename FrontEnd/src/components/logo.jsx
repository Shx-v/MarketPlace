import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 13h4v4H3v-4zm6-8h4v4h-4V5zm6 8h4v4h-4v-4zm6-8h4v4h-4V5zM2 3c0-1.104.896-2 2-2h16c1.104 0 2 .896 2 2v16c0 1.104-.896 2-2 2H4c-1.104 0-2-.896-2-2V3zm2 0v16h16V3H4z"
        fill={fillColor}
      />
    </svg>
  );
};
