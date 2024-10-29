import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3600/api";

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in the environment variables');
}


interface NFTProfileData {
  // Define the structure of your NFT profile data here
  // For example:
  name: string;
  description: string;
  imageUrl: string;
  // Add other relevant fields
}

export async function createProfile(profileData: any): Promise<string> {
  try {
    const response = await axios.post(API_URL +'/walrus/upload', profileData);
    
    return response.data
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
}

export async function getProfile(): Promise<NFTProfileData> {
  try {
    const response = await axios.get(API_URL);
    
    return response.data;
  } catch (error) {
    console.error('Error during API request:', error);
    throw error;
  }
}

