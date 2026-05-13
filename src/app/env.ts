const env = {
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "",
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "",
    apikey: process.env.APPWRITE_API_KEY || "",
    projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME || "",
  },
};

export default env;