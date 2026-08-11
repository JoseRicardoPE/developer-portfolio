import Profile from "../models/profile.model.js";

export async function getProfile() {
  return await Profile.findOne();
}

export async function createProfile(profileData) {
  const profile = await Profile.findOne();
  if (profile) {
    return null;
  }
  return await Profile.create(profileData);
}

export async function updateProfile(profileData) {
  return await Profile.findOneAndUpdate({}, profileData, {
    returnDocument: "after",
    runValidators: true,
  });
}

export async function deleteProfile() {
  return await Profile.findOneAndDelete();
}
