import { Category, Dashboard, LibraryBooks, Paid } from '@mui/icons-material';
import { Box, ButtonBase, Divider, IconButton, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const Sidebar = () => {

    const Navigation = [
        {
            kind: 'header',
            title: 'Menu',
        },
        {
            kind: 'section',
            link: '/dashboard',
            title: 'Dashboard',
            icon: <Dashboard sx={{ color: '#fff' }} />,
        },
        {
            kind: 'section',
            link: '/transactions',
            title: 'Mes Transactions',
            icon: <Paid sx={{ color: '#fff' }} />,
        },
        {
            kind: 'section',
            link: '/categories',
            title: 'Mes Catégories',
            icon: <Category sx={{ color: '#fff' }} />,
        },
        {
            kind: 'header',
            title: 'Settings',
        },
        {
            kind: 'section',
            link: '/informations',
            title: 'Mes Informations',
            icon: <LibraryBooks sx={{ color: '#fff' }} />,
        },
    ];


    const item = (link, title, icon) => {
        return (
            <ButtonBase
                key={title}
                href={link}
                sx={{
                    mt: 1, display: 'flex', justifyContent: 'flex-start', borderRadius: 2, p: 1,
                    ":hover": { backgroundColor: blue[800] }
                }}
            >
                <IconButton size="small" >
                    {icon}
                </IconButton>
                <Typography variant="subtitle2">{title}</Typography>
            </ButtonBase>
        );
    }

     const activeItem = (link, title, icon) => {
        return (
            <ButtonBase
                key={title}
                href={link}
                sx={{ mt: 1, display: 'flex', justifyContent: 'flex-start', borderRadius: 2, p: 1,
                    ":hover": { backgroundColor: blue[800] }, backgroundColor: blue[800]
                }}
            >
                <IconButton size="small" >
                    {icon}
                </IconButton>
                <Typography variant="subtitle2">{title}</Typography>
            </ButtonBase>
        );
    }

    const header = (title) => {
        return (
            <Box key={title}>
                <Divider orientation="horizontal" variant="fullWidth" flexItem sx={{ mt: 2 }} />
                <Typography variant='body3' sx={{ color: grey[300] }}>
                    {title}
                </Typography>
            </Box>
        );
    }


    const ContainerSide = () => {

        return (
            <Box
                position="fixed"
                display="flex"
                flexDirection='column'
                sx={{ px: 1, pt: 10, height: '3000px', background: '#1976d2', color: 'white' }}
            >
                {Navigation.map((element, index) => {
                    if (element.kind == 'header') {
                        return (
                            header(element.title)
                        );
                    } else {
                        return document.location.pathname == element.link ? 
                            activeItem(element.link, element.title, element.icon) : 
                            item(element.link, element.title, element.icon);
                    }
                })}
            </Box>
        )
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '16%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ContainerSide />
        </Box>
    )
}

export default Sidebar;