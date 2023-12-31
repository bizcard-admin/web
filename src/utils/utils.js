import Cookies from "js-cookie";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from "../config/firebase";
import { formatDistanceToNow } from "date-fns";
import vCardJs from 'vcards-js';
import { CARD_IMAGE_PATH } from "./global";

export function generateRandomId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export function groupList(data, keyName) {
    const groupMap = new Map();

    data.forEach(item => {
        const keyValue = item[keyName]; // Use the provided keyName to access the property
        if (!groupMap.has(keyValue)) {
            groupMap.set(keyValue, [item]);
        } else {
            groupMap.get(keyValue).push(item);
        }
    });

    return groupMap;
};

export function checkCookies(){
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    if (accessToken && refreshToken) {
        return true; 
    } else {
        return false; 
    }
}

export async function uploadImage(folderName, fileName, objectData) {
    const blob = handleBase64Image(objectData);
    const storageRef = ref(storage, `${folderName}/${fileName}`);
    await uploadBytes(storageRef, blob);
}

export const handleBase64Image = (base64String) => {
    // Remove the "data:image/jpeg;base64," prefix
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    // Convert to a binary format
    const binaryString = atob(base64WithoutPrefix);

    // Create a Uint8Array from the binary string
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob object from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    return blob;
};

export const formatDateDistance = (dateString) => {
    const date = new Date(dateString);
    const distance = formatDistanceToNow(date, { addSuffix: true });
    return `${distance}`;
};

export function formCardLink(cardId){
    const location = window.location.origin;
    return `${location}/app/p/card/${cardId}`
}

export function generateVcard(cardData) {
    
    const card = vCardJs();

    if(cardData?.name?.firstName){
        card.firstName = cardData?.name?.firstName;
    } 
    if(cardData?.name?.middleName){
        card.middleName = cardData?.name?.middleName;
    } 
    if(cardData?.name?.lastName){
        card.lastName = cardData?.name?.lastName;
    } 
    if(cardData?.name?.prefix){
        card.namePrefix = cardData?.name?.prefix;
    } 

    if(cardData?.company?.companyName){
        card.organization = cardData?.company?.companyName;
    } 
    if(cardData?.company?.jobTitle){
        card.title = cardData?.company?.jobTitle;
    } 
    if(cardData?.company?.companyWebsite){
        card.workUrl = cardData?.company?.companyWebsite;
    } 

    if(cardData?.picture){
        card.photo.attachFromUrl(getImage(cardData._id, 'picture'));
    }
    if(cardData?.logo){
        card.logo.attachFromUrl(getImage(cardData._id, 'logo'));
    }

    if(cardData?.phoneNumber){
        card.cellPhone = cardData?.phoneNumber;
    } 
    if(cardData?.email){
        card.email = cardData?.email;
    } 
    
    //TODO: add address info also

    const vcfData = card.toString();

    return vcfData;
}

export function downloadFile(data){

    const blob = new Blob([data], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contact.vcf');
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export function formatDate(dateString){

    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return formattedDate;
}

export function getImage(id, type){
    return `${CARD_IMAGE_PATH}${id}%2F${type}.jpg?alt=media`;
}