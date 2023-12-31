import { Avatar, Box, Button, Divider, Fab, Grid, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import MainCard from "../../components/MainCard";
import Banner from "../../components/Card/Banner";
import { BANNER_PLACEHOLDER, CARD_IMAGE_PATH } from "../../utils/global";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { DownloadOutlined, EnvironmentOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, ShareAltOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCardPreviewDetails } from "../../network/service/cardService";
import { useNavigate, useParams } from "react-router-dom";
import { checkCookies, downloadFile, generateVcard } from "../../utils/utils";
import ShareDialog from "../../components/dialogs/ShareDialog";
import CardsDialog from "../../components/dialogs/CardsDialog";
import { useSelector } from "react-redux";

const Bizcard = ()=>{

    const { cardId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCards, setOpenCards] = useState(false);

    const isLoggedIn = checkCookies();

    const cards = useSelector((state)=>state.app.cards);

    const isOwnCard = cards && (cards?.some((item)=>item._id===cardId));  

    console.log(cardData);

    useEffect(()=>{
        const getCardDetails= async()=>{
            const data = await getCardPreviewDetails(cardId)
            setCardData(data);
            setLoading(false);
        }

        getCardDetails();
    }, [])

    const saveCard =()=>{
        const vcfData = generateVcard(cardData);
        downloadFile(vcfData);
    }

    const goTocreate=()=>{
        navigate('/register');
    }

    return (
        <Box
            sx={{
                height: "100vh",
                position: "relative",
                display: "flex", 
                justifyContent: "center"
            }}
        >

            <CardsDialog open={openCards} cardData={cardData} handleCancel={()=>setOpenCards(false)}/>
            <ShareDialog open={open} cardId={cardData?._id} handleCancel={()=>setOpen(false)}/>
            
            { loading && <Skeleton variant="rectangular" sx={{maxWidth: "440px", width: "100%", height: "100vh"}} /> }

            {
                !isOwnCard && !loading && <Stack direction={"row"} sx={{position: "fixed", bottom: 16, display: "flex", zIndex: 1000, maxWidth: "440px", width: "100%", px: 2}} spacing={3}>

                    <Fab variant="extended" color="primary" sx={{width: "100%", background: "#000"}} onClick={()=>setOpen(true)}>
                    <ShareAltOutlined style={{marginRight: "16px", fontSize: "20px"}}/>
                    <Typography variant="body1">Share</Typography>
                    </Fab>
                    {
                        isLoggedIn
                            ? <Fab variant="extended" color="primary" sx={{width: "100%", background: "#000"}} onClick={()=>setOpenCards(true)}>
                                <UserOutlined style={{marginRight: "16px", fontSize: "20px"}}/>
                                <Typography variant="body1">Connect</Typography>
                            </Fab>
                            : <Fab variant="extended" color="primary" sx={{width: "100%", background: "#000"}} onClick={saveCard}>
                                <DownloadOutlined style={{marginRight: "16px", fontSize: "20px"}}/>
                                <Typography variant="body1">Save</Typography>
                            </Fab>
                    }

                </Stack>
            }

            {
                !loading && <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    px: 2,
                    pt: 2,
                    pb: 14,
                    overflow: "auto",
                    height: "fit-content"
                }}
                >

                <MainCard
                    headerPadding={0}
                    sx={{
                        maxWidth: "440px",
                        width: "100%",
                    }}
                    title={
                        <div style={{ position: 'relative' }}>
                            <Banner image={`${CARD_IMAGE_PATH}${cardData._id}%2Fbanner.jpg?alt=media`} />
                            <Avatar
                            src={`${CARD_IMAGE_PATH}${cardData._id}%2Fprofile.jpg?alt=media`}
                            sx={{
                                border: '4px solid white',
                                width: 84,
                                height: 84,
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translate(-50%, 50%)'
                            }}
                            />
                        </div>
                    }
                >
                    
                    <Stack display={'flex'} alignItems={'center'} sx={{mt: 4}}>
                        <Typography variant="h4">{cardData?.name?.firstName} {cardData?.name?.middleName} {cardData?.name?.lastName}</Typography>
                        <Typography variant="body1">{cardData?.company?.title}</Typography>
                    </Stack>

                    <Typography variant="body2" sx={{ textAlign: 'center', color: 'grey', px: 4, mt: 1 }}>
                    {cardData?.bio}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{m: 0.5}}>

                        <Grid item md={6} xs={12}>
                        {
                            cardData?.email && (
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <MailOutlined />
                                <Typography>{cardData?.email}</Typography>
                                </Stack>
                            )
                        }
                        </Grid>

                        <Grid item md={6} xs={12}>
                        {
                            cardData?.phoneNumber && (
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <PhoneOutlined />
                                <Typography>{cardData?.phoneNumber}</Typography>
                                </Stack>
                            )
                        }
                        </Grid>

                        <Grid item md={6} xs={12}>
                        {
                            cardData?.location && (
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <EnvironmentOutlined />
                                <Typography>{cardData?.location}</Typography>
                                </Stack>
                            )
                        }
                        </Grid>

                        <Grid item md={6} xs={12}>
                        {
                            cardData?.website && (
                                <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <GlobalOutlined />
                                <Typography>{cardData?.website}</Typography>
                                </Stack>
                            )
                        }
                        </Grid>

                    </Grid>

                    <Divider sx={{my: 2}}/>

                    {
                        cardData?.company?.companyName && (
                            <ListItem sx={{ px: '12px', alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: '32px', marginTop: '8px', marginRight: '8px' }}>
                                <Avatar src={cardData?.logo}>
                                <HiBuildingOffice2 />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                <Stack>
                                    <Typography variant="h5">{cardData?.company?.companyName}</Typography>
                                    <Typography variant="caption">{cardData?.company?.department}</Typography>
                                </Stack>
                            </ListItemText>
                            </ListItem>
                        )
                    }

                    <Typography variant="body1" sx={{ textAlign: "justify", px: 2, mt: 1 }}>
                    {cardData?.company?.companyDescription}
                    </Typography>

                    <Divider sx={{my: 3}}><Typography variant="caption">Follow me on</Typography></Divider>

                    <Grid container sx={{justifyContent: "center", m: 0.5}}>

                    {
                        cardData?.fields?.map((item)=>(
                            <Grid key={item.icon} item md={2} xs={3}>
                                <Box sx={{justifyContent: "center", display: "flex"}}>
                                    <img style={{width: "48px", height: "48px"}} src={`https://firebasestorage.googleapis.com/v0/b/bizcard-web.appspot.com/o/${item.icon}?alt=media`} />
                                </Box>
                            </Grid>
                        ))
                    }

                    </Grid>

                    { !isLoggedIn &&  <Stack alignItems={"center"} sx={{mt: 8}}>
                        <Typography variant="labelLight" sx={{color: "#FF8C00", fontWeight: 600}}> Want to create your Digital card? </Typography>
                        <Button variant="outlined" sx={{boxShadow: 4, width: "320px", padding: "8px", my: 2}} onClick={goTocreate}>Create Your Own Profile</Button>
                        <Typography variant="labelLight" > Join Bizcard Now ! </Typography>
                    </Stack> }

                </MainCard>
            </Box>
            }
        </Box>
    )
}

export default Bizcard;