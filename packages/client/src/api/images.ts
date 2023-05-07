import axios from 'axios';

export const deleteImage = (imageName: string) =>
    axios.delete(`api/images/remove/${imageName}`);
