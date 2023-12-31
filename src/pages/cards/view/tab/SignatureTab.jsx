import { CopyOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import { Box, Button, Divider, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo";

const SignatureTab = ({cardData})=>{

    const theme = useTheme();

    const [name, setName] = useState(`${cardData?.name?.firstName??""} ${cardData?.name?.lastName??""}`);
    const [jobTitle, setJobTitle] = useState(cardData?.designation??"");
    const [companyName, setCompanyName] = useState(cardData?.company?.companyName??"");
    const [phoneNumber, setPhoneNumber] = useState(cardData?.phoneNumber??"");
    const [location, setLocation] = useState(cardData?.address??"");
    const [desclaimer, setDesclaimer] = useState('');

    return (
        <Grid container spacing={3} >
            <Grid item xs={7}>  

            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="full-name">Full Name</InputLabel>
                            <OutlinedInput
                                id="full-name"
                                type="text"
                                name="full Name"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(event)=>setName(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="job-title">Job Title</InputLabel>
                            <OutlinedInput
                                id="job-title"
                                type="text"
                                name="Job Title"
                                placeholder="Enter job title"
                                value={jobTitle}
                                onChange={(event)=>setJobTitle(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-name">Company</InputLabel>
                            <OutlinedInput
                                id="company-name"
                                type="text"
                                name="Company Name"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(event)=>setCompanyName(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                            <OutlinedInput
                                id="phone-number"
                                type="text"
                                name="Phone Number"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(event)=>setPhoneNumber(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="address">Location</InputLabel>
                            <OutlinedInput
                                id="address"
                                type="text"
                                name="Address"
                                placeholder="Enter address"
                                value={location}
                                onChange={(event)=>setLocation(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="desclaimer">Desclaimer</InputLabel>
                            <OutlinedInput
                                id="desclaimer"
                                type="text"
                                name="Desclaimer"
                                placeholder="Enter desclaimer"
                                value={desclaimer}
                                onChange={(event)=>setDesclaimer(event.target.value)}
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>

            </Grid>
            <Grid item xs={5} >
                <Box 
                    sx={{
                        p: 2
                    }}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"} 
                >
                    <Typography variant="body1" sx={{color: "grey"}}>Signature preview</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            border: `1px solid ${theme.palette.grey[200]}`,
                            p: 1,
                            marginTop: "16px",
                            marginBottom: "32px"
                        }}
                    >
                        <Grid container>
                            <Grid item xs={8}>
                                <Box>
                                    <Typography variant="h5">{name}</Typography>
                                    <Stack>
                                    <Typography variant="caption">{jobTitle}</Typography>
                                    <Typography variant="caption">{companyName}</Typography>
                                    <Typography variant="caption">{phoneNumber}</Typography>
                                    <Typography variant="caption">{location}</Typography>
                                    </Stack>

                                    <div style={{height: "30px"}}/>

                                    <Typography sx={{fontStyle: "italic"}} variant="caption">{desclaimer}</Typography>
                                </Box>

                            </Grid>
                            <Grid item xs={4} >

                                <Box
                                    sx={{
                                        width: "100%",
                                        alignItems: "end",
                                        justifyContent: "end"
                                    }}
                                >
                                    <Stack 
                                        alignItems={"center"}
                                        spacing={2}
                                    >
                                        <QRCode
                                            quietZone={2}
                                            size={100}
                                            value={`${window.origin}/app/p/card/${cardData._id}`}
                                            logoWidth={100 * 0.25}
                                            logoHeight={100 * 0.25}
                                            qrStyle= {'dots'}
                                        />
                                        <Typography variant="caption" sx={{color: "grey"}}>Connect With Me</Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>

                    </Box>
                    <Button
                        onClick={()=>{}}
                        variant="outlined"
                        startIcon={<CopyOutlined/>}
                    >
                        Copy Signature
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default SignatureTab;