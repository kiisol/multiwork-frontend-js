import React, {useState} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography,} from "@mui/material";
import HomeIcon from '../assets/icons/Home.svg';
import InProcessIcon from '../assets/icons/InProcess.svg';
import CompletedIcon from '../assets/icons/Completed.svg';
import ActiveIcon from '../assets/icons/Active.svg';
import logo from '../assets/images/Logo.svg';
import { buttonStylesSideBar, textStylesBodyL2, buttonStyles} from '../pages/Styles/styles';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useSelector } from "react-redux";
import  CreateProjectModal  from "./CreateProjectModal/CreateProjectModal";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const menuItems = [
        { icon: HomeIcon, label: "Home", path: "/home/WithRegistration", disabled: !user },
        { type: "divider", label: "Projects" },
        { icon: ActiveIcon, label: "Active", path: "/pageActiveAllProjects" },
        { icon: InProcessIcon, label: "In Process", path: "/pageInProccesAllProjects" },
        { icon: CompletedIcon, label: "Completed", path: "/pageCompletedAllProjects" },
    ];

    const location = useLocation();

    const handleCreateAProject = () => {
        navigate('/PageMyProject');
        };

    return (
        <Box sx={{  height: '1040px', padding: '16px', zIndex: 1000, position: 'relative', backgroundColor: '#F9F6FF', 
                    display: 'flex',flexDirection: 'column',}}>
            <CreateProjectModal  onClick={handleCreateAProject} show={open} close={() => handleClose()}/>
                <Box sx={{ width: '222px', height: '1080px' }}>
                    {/* Логотип */}
                    <Box sx={{ mb: 4, display:'block', justifyContent: 'center' }}>
                        <Box component="img" src={logo} alt="logo" sx={{ width:'190px', height: '36px' }} />
                    </Box>
            {user &&(
                <Button variant="contained" onClick={() => handleOpen()} endIcon={<AddIcon />} sx={{...buttonStyles, borderRadius: '8px', 
                    padding: '8px 8px', width: '100%', height: '52px',marginBottom: '24px', background: '#814AEB', color: '#FFF', }}> 
                    Create a project 
                </Button>
            )}
               {/* Пункты меню */}
               <List component="nav">
                {menuItems.map((item, index) => {
                    if (item.type === "divider") {
                        return (
                            <Typography key={index} sx={{ ...textStylesBodyL2, textAlign: 'left', color: '#5D5D5D', mx: 1, mb: 3, mt: 3 }}>
                                {item.label}
                            </Typography>
                        );
                    }

                    const isActive = location.pathname === item.path; 

                    return (
                        <ListItem
                            sx={{
                                ...buttonStylesSideBar,
                                backgroundColor: isActive ? '#E2D5FF' : 'transparent', 
                            }}
                            key={item.path}
                            component={item.disabled ? 'div' : NavLink}
                            to={item.disabled ? undefined : item.path}
                        >
                            <ListItemIcon>
                                <Box
                                    component="img"
                                    src={item.icon}
                                    alt={item.label}
                                    sx={{ width: '24px', height: '24px'}} 
                                />
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    );
                })}
            </List>
            </Box>
        </Box>
    );
};

export default SideBar;

