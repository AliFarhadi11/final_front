import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

// SiteRoad 
export default function SiteRoad({ links }) {
  return (
    < >
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" >
          <StyledBreadcrumb  sx={{cursor: 'pointer'}}
            label= {<FormattedMessage id = 'General.home' />}
            onDelete={null} 
            icon={<HomeIcon fontSize="small" />}
          />
        </Link>
        {links.map((item,indexs) => (
          <Link href={item.link} key={indexs} >
            <StyledBreadcrumb sx={{cursor: 'pointer'}}
              label={item.title} onDelete={null}
              />
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
}
