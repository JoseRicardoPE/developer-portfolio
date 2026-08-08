import { getProfile } from '../services/profileService.js';

export async function getProfileController(req, res) {
    try {
        const profile = await getProfile();
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error retrieving profile',
            error: error.message
         });
    }
}