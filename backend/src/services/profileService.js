import Profile from '../models/profile.model.js';

export async function getProfile() {
    return await Profile.findOne();
}