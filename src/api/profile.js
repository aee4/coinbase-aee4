import api from "./api";

export const normalizeProfile = (data) => data?.user || data?.data?.user || data?.data || data || null;

export const getProfile = async () => {
  try {
    const response = await api.get("/profile");
    return normalizeProfile(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      const fallbackResponse = await api.get("/users/profile");
      return normalizeProfile(fallbackResponse.data);
    }

    throw error;
  }
};
