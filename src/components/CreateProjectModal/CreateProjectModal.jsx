// import React, { useState, useEffect} from 'react';
// import { Modal, Box, Typography, TextField, Button, InputAdornment,  CircularProgress  } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { textStylesBodyL2, textStylesBody2, buttonStylesModalCancel, buttonStylesModal } from '../Styles/styles';
// import Chip from '@mui/material/Chip';
// import Autocomplete from '@mui/material/Autocomplete';
// import ImageCropper from '../ImageCropper/ImageCropper';
// import up from '../../assets/icons/up.svg';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProject, fetchProjects } from '../../reduxToolkit/projectsRedux';
// import {fetchSkills, getAllSkills} from '../../reduxToolkit/skillsRedux';
// import { IMAGES_URL } from "../../config";



// const CreateProjectModal = (prop) => {
    
//     const token = useSelector(state => state.auth.token);
//     const userId = useSelector(state => state.auth.user?.id);
//     const dataSkills = useSelector(getAllSkills);
//     const dataSkillsOptions = dataSkills?.data || [];
//     const [description, setDescription] = useState('');
//     const [title, setTitle] = useState('');
//     const [selectedSkills, setSelectedSkills] = useState([]);
//     const [isFocused, setIsFocused] = useState(false);
//     const [croppedImage, setCroppedImage] = useState('');
//     const [imgSrc, setImgSrc] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [isLoading, setIsLoading] = useState(false);

//     const handleDescriptionChange = (event) => {
//         const { value } = event.target;
//         if (value.length <= 1000) {
//             setDescription(value);
//         }
//     };

//     const handleTitleChange = (event) => {
//         setTitle(event.target.value);
//     };

//     const formatButtonText = (text) => {
//         return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//     };

//     const isFormValid = Boolean(title && description && selectedSkills.length > 0 && croppedImage);

//     useEffect(() => {
//         dispatch(fetchSkills());
//       }, [dispatch]);

//     const handleCancel = () => {
//         setDescription('');
//         setTitle('');
//         setSelectedSkills([]);
//         setCroppedImage(null);
//         prop.close();
//     };

//     const handleSkillsChange = (event, newValue) => {

//         setSelectedSkills(newValue);
//     };

//     const handleCropComplete = (croppedImageUrl) => {
//         setCroppedImage(croppedImageUrl);
//     };

//     const getFile = (dataurl, filename) => {
   
//         var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[arr.length - 1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
//         while(n--){
//             u8arr[n] = bstr.charCodeAt(n);
//         }
//         return new File([u8arr], filename, {type:mime});    
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsLoading(true); 
    
//         const projectData = {
//             title: event.target.title.value,
//             description: event.target.description.value,
//             project_status: 'Active',
//         };
//         const skills = selectedSkills.map(skill => skill.id);
//         const coverImage = getFile(croppedImage, "avatar"); 
    
//         try {
//             const response = await dispatch(createProject({ projectData, coverImage, skills, token, userId }));
//             await dispatch(fetchProjects());
//             const projectId = response.payload.data?.id;
//             localStorage.setItem('newId', projectId);
//             navigate('/pageMyProject');
//             handleCancel();
//         } catch (error) {
//             console.error('Failed to create project:', error);
//         } finally {
//             setIsLoading(false); 
//         }
//     };

//     const handleReplace = () => {
//         setCroppedImage(null);
//         setImgSrc('');
//     };

//     return (
//         <Modal open={prop.show} onClose={prop.close} sx={{ backgroundColor: 'rgba(65, 66, 65, 0.85)' }}>
//             <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 900, bgcolor: '#fff', borderRadius: '16px', boxShadow: 24, p: 4 }}>
//                 <form onSubmit={handleSubmit}>
//                     <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
//                         {croppedImage ? (
//                             <Box sx={{ flexShrink: 0, margin: '40px 100px 0 40px', textAlign: 'center' }}>
//                                 <Typography variant="body1" sx={{...textStylesBodyL2, textAlign: 'left' }}>Project Cover</Typography>
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '40px', }}>
//                                     <img src={croppedImage} alt="Cropped" style={{ margin: '8px 0',  width: 230, height: 230, borderRadius:'50%', border:'5px solid #fff', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} />
//                                     <Button variant="text" onClick={handleReplace} sx={{ ...buttonStylesModalCancel, color: '#814AEB', display: 'flex', alignItems: 'center', }}>
//                                         <Box component="img" src={up} alt="Upload Icon" sx={{ width: 20, marginRight: 1 }} />
//                                         Replace
//                                     </Button>
//                                 </Box>
//                             </Box>

//                         ) : (
//                             <Box sx={{ flexShrink: 0, margin: '40px 100px 0 40px' }}>
//                                 <Typography variant="body1" sx={{ marginBottom: 1, ...textStylesBodyL2, textAlign: 'left' }}>Project Cover</Typography>
//                                 <ImageCropper onCropComplete={handleCropComplete} />
//                             </Box>
//                         )}

//                         <Box sx={{ flexGrow: 1, margin: '40px 0 40px 0' }}>
//                             <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Project Title</Typography>
//                             <TextField
//                                 placeholder="Give your project a title"
//                                 variant="outlined"
//                                 fullWidth
//                                 sx={{ ...textStylesBody2, marginBottom: 2, color: '#667085' }}
//                                 required
//                                 name="title"
//                                 value={title}
//                                 onChange={handleTitleChange}
//                             />
//                             <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Description Of Project</Typography>
//                             <TextField
//                                 placeholder="Enter a description..."
//                                 variant="outlined"
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 sx={{ ...textStylesBody2, marginBottom: 1, color: '#667085', }}
//                                 required
//                                 value={description}
//                                 onChange={handleDescriptionChange}
//                                 inputProps={{ maxLength: 1000 }}
//                                 name="description"
//                             />
//                             <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
//                                 <Typography variant="caption" sx={{ ...textStylesBody2, color: '#667085', fontSize: '14px' }}>
//                                     {description.length}/1000
//                                 </Typography>
//                             </Box>
//                             <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>Skills</Typography>
//                             <Autocomplete
//                                 multiple
//                                 id="skills-select"
//                                 options={dataSkillsOptions || []}
//                                 getOptionLabel={(option) => option.skillName || ''}
//                                 value={selectedSkills}
//                                 onFocus={() => setIsFocused(true)}
//                                 onBlur={() => setIsFocused(false)}
//                                 onChange={handleSkillsChange}
//                                 renderTags={(value, getTagProps) =>
//                                     value.map((option, index) => {
//                                         const tagProps = getTagProps({ index });
//                                         return (
//                                             <Chip
//                                                 key={option.id || index} 
//                                                 label={option.skillName}
//                                                 onDelete={getTagProps({ index }).onDelete}
//                                                 className={getTagProps({ index }).className}
//                                                 sx={{
//                                                     fontFamily: 'Open Sans, sans-serif ',
//                                                     fontSize: '14px',
//                                                     backgroundColor: '#E2D5FF',
//                                                     '& .MuiChip-deleteIcon': {
//                                                         color: '#F97066',
//                                                     },
//                                                 }}
//                                             />
//                                         );
//                                     })
//                                 }
//                                 renderOption={(props, option) => {
//                                     const { key, ...restProps } = props;
//                                     return (
//                                         <li {...restProps}  key={option.id || option.skillName} style={{ display: 'flex', alignItems: 'center' }}>
//                                             <img src={`${IMAGES_URL}${option.icon.url}`} alt={option.icon} style={{ marginRight: '8px', width: '24px', height: '24px' }} />
//                                             {option.skillName}
//                                         </li>
//                                     );
//                                 }}
//                                 renderInput={(params) => (
//                                     <TextField
//                                         {...params}
//                                         variant="outlined"
//                                         placeholder={!isFocused && selectedSkills.length === 0 ? "Search skills" : ""}
//                                         InputProps={{
//                                             ...params.InputProps,
//                                             startAdornment: (
//                                                 <>
//                                                     <InputAdornment position="start">
//                                                         <SearchIcon />
//                                                     </InputAdornment>
//                                                     {params.InputProps.startAdornment}
//                                                 </>
//                                             ),
//                                         }}
//                                     />
//                                 )}
//                             />
//                         </Box>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
//                         <Button variant="text" type="button" onClick={handleCancel} sx={{ marginRight: 2, ...buttonStylesModalCancel }}>
//                             Cancel
//                         </Button>
//                         <Button variant="contained" type="submit" disabled={!isFormValid || isLoading} sx={{ ...buttonStylesModal }}>
//                             {isLoading ? <CircularProgress size={20} sx={{ color: '#814AEB' }} /> : formatButtonText("Create a project")}
//                         </Button>
//                     </Box>
//                 </form>
//             </Box>
//         </Modal>
//     );
// };

// export default CreateProjectModal;

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { textStylesBodyL2, textStylesBody2, buttonStylesModalCancel, buttonStylesModal } from '../../pages/Styles/styles';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import ImageCropper from '../ImageCropper/ImageCropper';
import up from '../../assets/icons/up.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProject,fetchProjects } from '../../store/Slice/projectSlice';
import { fetchSkills, getAllSkills } from '../../store/Slice/skillsSlice';
import { IMAGES_URL } from '../../config';

const CreateProjectModal = (prop) => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.id);
  const dataSkills = useSelector(getAllSkills);
  const dataSkillsOptions = dataSkills?.skills || []; // Обновлено с data на skills
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [croppedImage, setCroppedImage] = useState('');
  const [ ,setImgSrc] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1000) {
      setDescription(value);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const formatButtonText = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const isFormValid = Boolean(title && description && selectedSkills.length > 0 && croppedImage);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleCancel = () => {
    setDescription('');
    setTitle('');
    setSelectedSkills([]);
    setCroppedImage(null);
    prop.close();
  };

  const handleSkillsChange = (event, newValue) => {
    setSelectedSkills(newValue);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
  };

  const getFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const projectData = {
      title: event.target.title.value,
      description: event.target.description.value,
      project_status: 'Active',
    };
    const skills = selectedSkills.map((skill) => skill.id);
    const coverImage = getFile(croppedImage, 'avatar');

    try {
      const response = await dispatch(createProject({ projectData, coverImage, skills, token, userId }));
      await dispatch(fetchProjects());
      const projectId = response.payload.data?.id;
      if (projectId) {
        localStorage.setItem('newId', projectId);
        navigate('/pageMyProject');
      }
      handleCancel();
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplace = () => {
    setCroppedImage(null);
    setImgSrc('');
  };

  return (
    <Modal open={prop.show} onClose={prop.close} sx={{ backgroundColor: 'rgba(65, 66, 65, 0.85)' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          bgcolor: '#fff',
          borderRadius: '16px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
            {croppedImage ? (
              <Box sx={{ flexShrink: 0, margin: '40px 100px 0 40px', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left' }}>
                  Project Cover
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '40px' }}>
                  <img
                    src={croppedImage}
                    alt="Cropped"
                    style={{
                      margin: '8px 0',
                      width: 230,
                      height: 230,
                      borderRadius: '50%',
                      border: '5px solid #fff',
                      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    }}
                  />
                  <Button
                    variant="text"
                    onClick={handleReplace}
                    sx={{
                      ...buttonStylesModalCancel,
                      color: '#814AEB',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box component="img" src={up} alt="Upload Icon" sx={{ width: 20, marginRight: 1 }} />
                    Replace
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ flexShrink: 0, margin: '40px 100px 0 40px' }}>
                <Typography variant="body1" sx={{ marginBottom: 1, ...textStylesBodyL2, textAlign: 'left' }}>
                  Project Cover
                </Typography>
                <ImageCropper onCropComplete={handleCropComplete} />
              </Box>
            )}

            <Box sx={{ flexGrow: 1, margin: '40px 0 40px 0' }}>
              <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>
                Project Title
              </Typography>
              <TextField
                placeholder="Give your project a title"
                variant="outlined"
                fullWidth
                sx={{ ...textStylesBody2, marginBottom: 2, color: '#667085' }}
                required
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
              <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>
                Description Of Project
              </Typography>
              <TextField
                placeholder="Enter a description..."
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{ ...textStylesBody2, marginBottom: 1, color: '#667085' }}
                required
                value={description}
                onChange={handleDescriptionChange}
                inputProps={{ maxLength: 1000 }}
                name="description"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
                <Typography variant="caption" sx={{ ...textStylesBody2, color: '#667085', fontSize: '14px' }}>
                  {description.length}/1000
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ ...textStylesBodyL2, textAlign: 'left', marginBottom: 1 }}>
                Skills
              </Typography>
              <Autocomplete
                multiple
                id="skills-select"
                options={dataSkillsOptions || []}
                getOptionLabel={(option) => option.attributes?.skillName || ''}
                value={selectedSkills}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleSkillsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    return (
                      <Chip
                        key={option.id || index}
                        label={option.attributes?.skillName || ''}
                        onDelete={tagProps.onDelete}
                        className={tagProps.className}
                        sx={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '14px',
                          backgroundColor: '#E2D5FF',
                          '& .MuiChip-deleteIcon': {
                            color: '#F97066',
                          },
                        }}
                      />
                    );
                  })
                }
                renderOption={(props, option) => {
                  const { key, ...restProps } = props;
                  return (
                    <li {...restProps} key={option.id || option.attributes?.skillName} style={{ display: 'flex', alignItems: 'center' }}>
                      {option.attributes?.icon?.data && (
                        <img
                          src={`${IMAGES_URL}${option.attributes.icon.data.attributes.url}`}
                          alt={option.attributes.icon.data.attributes.name}
                          style={{ marginRight: '8px', width: '24px', height: '24px' }}
                        />
                      )}
                      {option.attributes?.skillName || ''}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={!isFocused && selectedSkills.length === 0 ? 'Search skills' : ''}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 1 }}>
            <Button variant="text" type="button" onClick={handleCancel} sx={{ marginRight: 2, ...buttonStylesModalCancel }}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={!isFormValid || isLoading} sx={{ ...buttonStylesModal }}>
              {isLoading ? <CircularProgress size={20} sx={{ color: '#814AEB' }} /> : formatButtonText('Create a project')}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;
